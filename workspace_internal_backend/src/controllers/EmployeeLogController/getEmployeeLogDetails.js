const {
  statusCode,
  constants,
  EmployeeLogDetails,
  logger,
  successResponseFunc,
  errorResponseFunc,
  Employees,
  WorkLogs,
  Sequelize,
  formatHoursToHHMM,
  formatTimeTo12Hour,
  Holiday,
  LeaveRequest
} = require("./employeeLogPackageCentral");
const moment = require("moment");
const { Op } = require("sequelize");

const getWorkLogHoursSum = async (employeeId, date) => {
  try {
    let startDate = moment(date).startOf("day").format("YYYY-MM-DD HH:mm:ss");
    let endDate = moment(date).endOf("day").format("YYYY-MM-DD HH:mm:ss");
    const workLogs = await WorkLogs.findAll({
      where: {
        employeeId: employeeId,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: ["id", "workHour", "employeeId"],
    });

    if (workLogs.length) {
      const totalMinutes = workLogs.reduce((sum, log) => {
        const [hours, minutes] = log.workHour.split(":").map(Number);
        return sum + hours * 60 + minutes;
      }, 0);

      const totalHoursDecimal = totalMinutes / 60;
      return totalHoursDecimal;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error fetching total work hours:", error);
  }
};

const getEmployeeLogDetails = async (req, res) => {
    const { employee_code, month, year } = req.query;

    if (!employee_code) {
        return res.status(400).json({ error: 'employee_code is required' });
    }

    try {
        const employee = await Employees.findOne({ where: { employee_code } });

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        let startDate, endDate, formattedMonth;

        if (month && year) {
            formattedMonth  = month.toString().padStart(2, "0");
            startDate = moment(`${year}-${formattedMonth}-01`).startOf('month').format('YYYY-MM-DD');
            endDate = moment(startDate).endOf('month').format('YYYY-MM-DD');
        } else if (year) {
            startDate = moment(`${year}-01-01`).startOf('year').format('YYYY-MM-DD');
            endDate = moment(startDate).endOf('year').format('YYYY-MM-DD');
        } else if (month) {
            formattedMonth  = month.toString().padStart(2, "0");
            const currentYear = moment().year();
            startDate = moment(`${currentYear}-${formattedMonth}-01`).startOf('month').format('YYYY-MM-DD');
            endDate = moment(startDate).endOf('month').format('YYYY-MM-DD');
        } else {
            const currentMonth = moment().format('MM');
            const currentYear = moment().year();
            startDate = moment(`${currentYear}-${currentMonth}-01`).startOf('month').format('YYYY-MM-DD');
            endDate = moment(startDate).endOf('month').format('YYYY-MM-DD');
        }

        const whereClause = {
            employee_code,
            log_date: {
                [Op.between]: [startDate, endDate]
            }
        };

        const { count, rows: logs } = await EmployeeLogDetails.findAndCountAll({
            attributes: { exclude: ['createdAt', 'updatedAt', 'id'] },
            where: whereClause,
            order: [['log_date', 'DESC'], ['log_time', 'ASC']]
        });

        if (!logs.length) {
            return res.status(200).json({ data: { dailyLog: [], monthData: {} } });
        }

        const groupedLogs = logs.reduce((acc, log) => {
            const { log_date, log_time, direction } = log;

            if (!acc[log_date]) {
                acc[log_date] = { first_in: null, last_out: null, inOut: [], totalInTime: 0, totalOutTime: 0 };
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

        let result = await Promise.all(Object.entries(groupedLogs).map(async ([log_date, { first_in, last_out, inOut, totalInTime, totalOutTime }]) => {
            const sortedInOut = inOut.sort((a, b) => {
                const timeA = moment(a.time, 'HH:mm:ss');
                const timeB = moment(b.time, 'HH:mm:ss');
                return timeA.isBefore(timeB) ? -1 : 1;
            });

            let inOutPairs = [];
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

                    let difference = null;
                    if (outMoment && outMoment.isValid()) {
                        const duration = moment.duration(outMoment.diff(inMoment)).asHours();
                        difference = formatHoursToHHMM(duration);
                        if (duration > 0) {
                            dailyTotalInTime += duration;
                        } else {
                            totalOutTime += duration;
                        }
                    }

                    inOutPairs.push({ in: inTime, out: outTime, difference });
                }
            }

            let effectiveLastOut = last_out;
            if (!effectiveLastOut && inOutPairs.length > 0) {
                const lastOutEntry = inOutPairs[inOutPairs.length - 1];
                effectiveLastOut = lastOutEntry.out;
            }

            const dailyTotalOutTime = totalOutTime - dailyTotalInTime;
            let status = dailyTotalInTime > constants.FULLDAY ? 'Present' : (dailyTotalInTime >= constants.HALFDAY ? 'Half Day' : 'Absent');
            const today = moment().format("YYYY-MM-DD");
            if (log_date === today) {
                status = 'Present';
            }

            const workLogHoursSum = await getWorkLogHoursSum(employee.id, log_date);

            return {
                date: log_date,
                first_in: formatTimeTo12Hour(first_in),
                last_out: formatTimeTo12Hour(effectiveLastOut),
                inOut: inOutPairs.map(entry => ({
                    ...entry,
                    in: formatTimeTo12Hour(entry.in),
                    out: entry.out ? formatTimeTo12Hour(entry.out) : null,
                })),
                totalInTime: dailyTotalInTime,
                totalOutTime: dailyTotalOutTime,
                status: status,
                workLogHours: workLogHoursSum,
                TLWLDifference: dailyTotalInTime - workLogHoursSum
            };
        }));

        let present = 0, absent = 0, halfDay = 0;
        result.forEach(entry => {
            if (entry.inOut.length > 0) {
                let firstIn = entry.inOut[0].in;
                let lastOut = entry.inOut[entry.inOut.length - 1].out;

                if (lastOut === null) {
                    for (let i = entry.inOut.length - 2; i >= 0; i--) {
                        if (entry.inOut[i].out !== null) {
                            lastOut = entry.inOut[i].out;
                            break;
                        }
                    }
                }

                const firstInMoment = moment(firstIn, 'h:mm a');
                let lastOutMoment = null;
                let duration = null;
                if (lastOut) {
                    lastOutMoment = moment(lastOut, 'h:mm a');
                    duration = moment.duration(lastOutMoment.diff(firstInMoment));
                    entry.totalOutTime = Math.abs(duration.asHours() - entry.totalInTime)
                } else {
                    entry.totalOutTime = 0;
                }

                entry.first_in = firstIn;
                entry.last_out = lastOut;
            }
        });

        const totalInTimeOfMonth = result.reduce((acc, entry) => acc + entry.totalInTime, 0);
        const totalOutTimeOfMonth = result.reduce((acc, entry) => acc + entry.totalOutTime, 0);
        const totalLogHourOfMonth = result.reduce((acc, entry) => {
            const workLogHours = parseFloat(entry.workLogHours);
            if (!isNaN(workLogHours)) {
                return acc + workLogHours;
            }
            return acc;
        }, 0);

        const totalDiffOfMonth = result.reduce((acc, entry) => {
            const TLWLDifference = parseFloat(entry.TLWLDifference);
            if (!isNaN(TLWLDifference)) {
                return acc + TLWLDifference;
            }
            return acc;
        }, 0);

        const averageTLWLDiffOfMonth = totalDiffOfMonth / result.length;
        let averageLogHourOfMonth = Math.ceil(totalLogHourOfMonth / result.length);
        let averageInTime = totalInTimeOfMonth / result.length;
        const totalInTimeHHMM = formatHoursToHHMM(totalInTimeOfMonth);
        const totalOutTimeHHMM = formatHoursToHHMM(totalOutTimeOfMonth);
        averageInTime = formatHoursToHHMM(averageInTime);
        async function insertLeaveDays(data) {
            const existingDates = new Set(data.map(entry => entry.date));

            function isWeekday(dateString) {
                const date = new Date(dateString);
                const dayOfWeek = date.getDay();
                return dayOfWeek !== 0 && dayOfWeek !== 6;
            }
            function createDummyData(dateString) {
                return {
                    date: dateString,
                    first_in: "",
                    last_out: "",
                    inOut: [],
                    totalInTime: "0:00",
                    totalOutTime: "0:00",
                    status: "Absent",
                    workLogHours: "0:00",
                    TLWLDifference: "0:00"
                };
            }

            let startDate = new Date(data[data.length - 1].date);
            let endDate = new Date(data[0].date);
            const datesToFill = [];
            for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                const currentDate = new Date(d);
                const dateString = currentDate.toISOString().slice(0, 10);

                if (!existingDates.has(dateString) && isWeekday(dateString)) {
                    datesToFill.push(createDummyData(dateString));
                }
            }
            let result = [...data, ...datesToFill].sort((a, b) => new Date(b.date) - new Date(a.date));
            return result;
        }

        result = await insertLeaveDays(result);

        result.forEach(entry => {
            if (entry.inOut.length > 0) {
                entry.totalOutTime = formatHoursToHHMM(entry.totalOutTime);
                entry.totalInTime = formatHoursToHHMM(entry.totalInTime);
                const workLogHours = parseFloat(entry.workLogHours);
                if (!isNaN(workLogHours)) {
                    entry.workLogHours = (formatHoursToHHMM(entry.workLogHours));
                }
                const TLWLDifference = parseInt(entry.TLWLDifference);
                if (!isNaN(TLWLDifference)) {
                    entry.TLWLDifference = (formatHoursToHHMM(entry.TLWLDifference));
                }
            }
            if (entry.status == 'Present') {
                present++;
            } else if (entry.status == 'Half Day') {
                halfDay++;
            } else if (entry.status == 'Absent') {
                absent++;
            }
        });

        let monthData = {
            totalInTime: totalInTimeHHMM,
            totalOutTime: totalOutTimeHHMM,
            averageInTime,
            averageWorkLogHours: formatHoursToHHMM(averageLogHourOfMonth),
            averageTLWLDiff: formatHoursToHHMM(averageTLWLDiffOfMonth),
            presentDays: present,
            halfDays: halfDay,
            absentDays: absent
        };

        return res.json({ data: { dailyLog: result, monthData } });
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

const getAttendanceByCode = async (req, res) => {
  try {
    const { employee_code, month, year } = req.query;
    const employee = await Employees.findOne({ where: { employee_code } });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Get the start and end date of the month
    let startDate, endDate;
    if (month && year) {
      const formattedMonth = month.toString().padStart(2, "0");
      startDate = moment(`${year}-${formattedMonth}-01`)
        .startOf("month")
        .format("YYYY-MM-DD");
      endDate = moment(startDate).endOf("month").format("YYYY-MM-DD");
    } else {
      startDate = moment().startOf("month").format("YYYY-MM-DD");
      endDate = moment().format("YYYY-MM-DD");
    }

    // Get the logs for the month
    const logs = await EmployeeLogDetails.findAll({
      where: {
        employee_code,
        log_date: {
          [Op.between]: [startDate, endDate],
        },
        isDeleted: false,
      },
      attributes: { exclude: ["createdAt", "updatedAt", "id", "direction"] },
      order: [
        ["log_date", "DESC"],
        ["log_time", "ASC"],
      ],
    });

    if (!logs.length) {
        return res.status(statusCode.success).send(
            successResponseFunc(
              "No data found.",
              statusCode.success,
              constants.SUCCESS,
              { dailyLog: [], monthData: {} }
            )
          );
    }

    // Group the logs by date
    const groupedLogs = logs.reduce((acc, log) => {
      const { log_date, log_time } = log;
      if (!acc[log_date]) {
        acc[log_date] = [];
      }
      acc[log_date].push(log_time);
      return acc;
    }, {});

    // Generate all dates between the start and end date
    const allDates = [];
    let lastDay;
    let firstDay = moment(startDate);
    let currentMonth = moment().month() + 1; // 1-12
    currentMonth = currentMonth.toString().padStart(2, "0");
    const monthString = moment(startDate).format("MM");
    if (monthString == currentMonth.toString()) {
      lastDay = moment().format("YYYY-MM-DD");
    } else {
      lastDay = endDate;
    }

    while (firstDay.isSameOrBefore(lastDay)) {
      allDates.push(firstDay.format("YYYY-MM-DD"));
      firstDay.add(1, "day");
    }

    // Get holidays from the database
    const holidays = await Holiday.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: ["date"],
    });

    const holidayDates = holidays.map((holiday) => holiday.date);

    // Check for missing dates and add them
    allDates.forEach((date) => {
      if (!groupedLogs[date]) {
        groupedLogs[date] = [];
      }
    });

    const sortedDates = Object.keys(groupedLogs).sort(
      (a, b) => new Date(b) - new Date(a)
    );

    // Structure the grouped logs with in and out times
    const structuredLogs = await Promise.all(
      sortedDates.map(async (date) => {
        let firstInTime = null;
        let lastOutTime = null;
        let totalInTime = 0;
        let totalOutTime = 0;
        const inOut = [];

        const logTimes = groupedLogs[date] || [];

        for (let i = 0; i < logTimes.length; i += 2) {
          const inTime = logTimes[i];
          const outTime = logTimes[i + 1] || null;
          const duration = outTime
            ? moment
                .duration(
                  moment(outTime, "HH:mm:ss a").diff(
                    moment(inTime, "HH:mm:ss a")
                  )
                )
                .asHours()
            : null;
          if (duration) {
            totalInTime += duration;
          }
          if (!firstInTime) {
            firstInTime = moment(inTime, "HH:mm:ss").format("hh:mm a");
          }
          if (outTime) {
            lastOutTime = moment(outTime, "HH:mm:ss").format("hh:mm a");
          }
          inOut.push({
            in: inTime ? moment(inTime, "HH:mm:ss").format("hh:mm a") : null,
            out: outTime ? moment(outTime, "HH:mm:ss").format("hh:mm a") : null,
            difference: duration ? formatHoursToHHMM(duration) : null,
          });
        }

        // Calculate totalOutTime
        for (let i = 1; i < inOut.length; i++) {
          const previousOutTime = inOut[i - 1].out;
          const currentInTime = inOut[i].in;
          if (previousOutTime && currentInTime) {
            const outDuration = moment
              .duration(
                moment(currentInTime, "HH:mm:ss a").diff(
                  moment(previousOutTime, "HH:mm:ss a")
                )
              )
              .asHours();
            totalOutTime += outDuration;
          }
        }

        // Fetch work logs for the specific date
        const workLogs = await getWorkLogHoursSum(employee.id, date);

        // Calculate the TLWL Difference
        const TLWLDifference = totalInTime - workLogs;

        // Get the status of the day
        let status;
        const currentDate = moment().format("YYYY-MM-DD");
        const isWeekend = moment(date).day() === 0 || moment(date).day() === 6;
        const isHoliday = holidayDates.includes(date);

        if (logTimes.length > 0) {
          // If there's data for the date, treat it as a normal workday
          if (date === currentDate) {
            status = constants.STATUS_PRESENT;
          } else {
            status =
              totalInTime > constants.FULLDAY
                ? constants.STATUS_PRESENT
                : totalInTime >= constants.HALFDAY
                ? constants.STATUS_HALFDAY
                : constants.STATUS_ABSENT;
          }
        } else {
          // No data for the date
          if (isWeekend) {
            status = constants.STATUS_WEEKEND;
          } else if (isHoliday) {
            status = constants.STATUS_HOLIDAY;
          } else {
            // Check for leave
            let leaveRequest = await LeaveRequest.findOne({
              where: {
                employeeId: employee.id,
                [Op.and]: [
                  { startDate: { [Op.lte]: date } },
                  { endDate: { [Op.gte]: date } },
                ],
                status: constants.APPROVED,
              },
            });
            status = leaveRequest ? constants.STATUS_LEAVE : constants.STATUS_ABSENT;
          }
        }

        return {
          date,
          first_in: firstInTime ? firstInTime : "",
          last_out: lastOutTime ? lastOutTime : "",
          inOut,
          totalInTime: formatHoursToHHMM(totalInTime),
          totalOutTime: formatHoursToHHMM(totalOutTime),
          workLogHours: formatHoursToHHMM(workLogs),
          TLWLDifference: formatHoursToHHMM(TLWLDifference),
          status,
        };
      })
    );

    // Calculate the totalInTime and totalOutTime of the month
    let totalInTimeOfMonth = 0;
    let totalOutTimeOfMonth = 0;
    let totalWorkLogHours = 0;

    structuredLogs.forEach((log) => {
      totalInTimeOfMonth += moment.duration(log.totalInTime).asHours();
      totalOutTimeOfMonth += moment.duration(log.totalOutTime).asHours();
      totalWorkLogHours += moment.duration(log.workLogHours).asHours();
    });

    // Calculate the number of present, half day and absent days
    let presentNumber = 0;
    let halfDayNumber = 0;
    let absentNumber = 0;
    let holidayNumber = 0;
    let weekendNumber = 0;

    structuredLogs.forEach((log) => {
      switch (log.status) {
        case constants.STATUS_PRESENT:
          presentNumber++;
          break;
        case constants.STATUS_HALFDAY:
          presentNumber += 0.5;
          halfDayNumber++;
          break;
        case constants.STATUS_ABSENT:
          absentNumber++;
          break;
        case constants.STATUS_LEAVE:
          absentNumber++;
          break;
        case constants.STATUS_HOLIDAY:
          holidayNumber++;
          break;
        case constants.STATUS_WEEKEND:
          weekendNumber++;
          break;
      }
    });

    const monthData = {
      totalInTime: formatHoursToHHMM(totalInTimeOfMonth),
      totalOutTime: formatHoursToHHMM(totalOutTimeOfMonth),
      averageInTime: totalInTimeOfMonth
        ? formatHoursToHHMM(
            totalInTimeOfMonth / (presentNumber)
          )
        : "0:00",
      averageWorkLogHours: totalWorkLogHours
        ? formatHoursToHHMM(totalWorkLogHours / (presentNumber))
        : "0:00",
      averageTLWLDiff:
        totalInTimeOfMonth && totalWorkLogHours
          ? formatHoursToHHMM(
              (totalInTimeOfMonth - totalWorkLogHours) /
                (presentNumber)
            )
          : "0:00",
      presentDays: presentNumber + holidayNumber,
      halfDays: halfDayNumber,
      absentDays: absentNumber,
    };

    return res.status(statusCode.success).send(
        successResponseFunc(
          "Logs fetched successfully.",
          statusCode.success,
          constants.SUCCESS,
          { dailyLog: structuredLogs, monthData }
        )
      );
  } catch (err) {
    logger.error(
      errorResponseFunc(
        "Error getting the employee attendance.",
        err.toString(),
        statusCode.internalServerError,
        constants.ERROR
      )
    );
    return res
      .status(statusCode.internalServerError)
      .send(
        errorResponseFunc(
          "Error getting the employee attendance.",
          err.toString(),
          statusCode.internalServerError,
          constants.ERROR
        )
      );
  }
};

module.exports = { getEmployeeLogDetails, getAttendanceByCode };