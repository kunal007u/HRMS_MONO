const { statusCode, constants, EmployeeLogDetails, logger, successResponseFunc, errorResponseFunc, Employees, WorkLogs, Sequelize } = require('./employeeLogPackageCentral');
const moment = require('moment');
const { Op } = require("sequelize");

const employeeMonthlyAttendance = async (req, res) => {
    const allEmployees = await Employees.findAll({
        attributes: ['id', 'employee_code']
    })

    let result = []
    for (let employee of allEmployees) {
        let data = await getEmployeeLogDetails(employee.employee_code, employee.id)
        result.push(data)

    }

    return res.status(200).json({ result })


    async function getEmployeeLogDetails(employee_code) {

        try {
            const employee = await Employees.findOne({ where: { employee_code } });

            if (!employee) {
                return res.status(404).json({ error: 'Employee not found' });
            }

            let startDate, endDate;
            const currentMonth = moment().format('MM');
            const currentYear = moment().year();
            startDate = moment(`${currentYear}-${currentMonth}-01`).startOf('month').format('YYYY-MM-DD');
            endDate = moment(startDate).endOf('month').format('YYYY-MM-DD');


            const whereClause = {
                employee_code,
                log_date: {
                    [Op.between]: [startDate, endDate]
                }
            };

            const { count, rows: logs } = await EmployeeLogDetails.findAndCountAll({
                attributes: ['log_date', 'log_time', 'direction'],
                where: whereClause,
                order: [['log_date', 'DESC'], ['log_time', 'ASC']]
            });
            if (!logs.length) {
                return ({ employee_code, data: { presentDays: 0, halfDays: 0, absentDays: 0 } });
            }

            const groupedLogs = logs.reduce((acc, log) => {
                const { log_date, log_time, direction } = log;
                if (!acc[log_date]) {
                    acc[log_date] = { first_in: null, last_out: null, inOut: [] };
                }

                if (direction === 'in') {
                    if (!acc[log_date].first_in || log_time < acc[log_date].first_in) {
                        acc[log_date].first_in = log_time;
                    }
                } else if (direction === 'out') {
                    if (!acc[log_date].last_out || log_time > acc[log_date].last_out) {
                        acc[log_date].last_out = log_time;
                    }
                }

                acc[log_date].inOut.push({ direction, time: log_time });

                return acc;
            }, {});

            let present = 0, absent = 0, halfDay = 0;

            Object.entries(groupedLogs).forEach(([log_date, { first_in, last_out, inOut }]) => {
                const sortedInOut = inOut.sort((a, b) => {
                    const timeA = moment(a.time, 'HH:mm:ss');
                    const timeB = moment(b.time, 'HH:mm:ss');
                    return timeA.isBefore(timeB) ? -1 : 1;
                });

                let dailyTotalInTime = 0;
                for (let i = 0; i < sortedInOut.length; i++) {
                    const currentEntry = sortedInOut[i];

                    if (currentEntry.direction === 'in') {
                        let outTime = null;
                        for (let j = i + 1; j < sortedInOut.length; j++) {
                            if (sortedInOut[j].direction === 'out') {
                                outTime = sortedInOut[j].time;
                                break;
                            }
                        }

                        const inTime = currentEntry.time;
                        const inMoment = moment(inTime, 'HH:mm:ss');
                        const outMoment = outTime ? moment(outTime, 'HH:mm:ss') : null;

                        if (outMoment && outMoment.isValid()) {
                            const duration = moment.duration(outMoment.diff(inMoment)).asHours();
                            if (duration > 0) {
                                dailyTotalInTime += duration;
                            }
                        }
                    }
                }

                if (dailyTotalInTime > 7) {
                    present++;
                } else if (dailyTotalInTime >= 4.5) {
                    halfDay++;
                } else {
                    absent++;
                }
            });

            return ({ employee_code, data: { presentDays: present, halfDays: halfDay, absentDays: absent, } });
        } catch (error) {
            return res.status(500).send({message:'Internal Server Error',error:error.message});
        }
    };

}


module.exports = { employeeMonthlyAttendance }