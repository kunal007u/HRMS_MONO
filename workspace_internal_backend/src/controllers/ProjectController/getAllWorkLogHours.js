
const { statusCode, constants, logger, errorResponseFunc, successResponseFunc, responseMessage, Projects, WorkLogs, formatHoursToHHMM } = require('./projectPackageCentral')
const { Op } = require("sequelize");
const moment = require('moment')


const getAllWorkLogHours = async (req, res) => {
    let { month, year } = req.query;
    let startDate, endDate;
    
    if (month && month.length === 1) {
        month = month.padStart(2, '0');
    };

    if (month && year) {
        startDate = moment(`${year}-${month}-01`).startOf('month').format('YYYY-MM-DD');
        endDate = moment(startDate).endOf('month').format('YYYY-MM-DD');
    } else if (year) {
        startDate = moment(`${year}-01-01`).startOf('year').format('YYYY-MM-DD');
        endDate = moment(startDate).endOf('year').format('YYYY-MM-DD');
    } else if (month) {
        const currentYear = moment().year();
        startDate = moment(`${currentYear}-${month}-01`).startOf('month').format('YYYY-MM-DD');
        endDate = moment(startDate).endOf('month').format('YYYY-MM-DD');
    } else {
        const currentMonth = moment().format('MM');
        const currentYear = moment().year();
        startDate = moment(`${currentYear}-${currentMonth}-01`).startOf('month').format('YYYY-MM-DD');
        endDate = moment(startDate).endOf('month').format('YYYY-MM-DD');
    }

    const projectList = await Projects.findAll({
        attributes: ['projectName', 'id']
    });

    let results = [];
    let weeklyRanges = [];
    let currentWeekStart = moment(startDate).startOf('isoWeek'); 
    let currentWeekEnd = moment(currentWeekStart).add(4, 'days'); 

    while (currentWeekStart.isBefore(endDate)) {
        if (currentWeekStart.month() === moment(startDate).month() || currentWeekEnd.month() === moment(startDate).month()) {
            weeklyRanges.push({
                start: currentWeekStart.format('YYYY-MM-DD'),
                end: currentWeekEnd.format('YYYY-MM-DD')
            });
        }
        currentWeekStart.add(1, 'week');
        currentWeekEnd = moment(currentWeekStart).add(4, 'days');
    }

    for (const project of projectList) {
        let projectData = {
            projectName: project.projectName,
            totalHours: 0
        };

        for (let i = 0; i < weeklyRanges.length; i++) {
            const range = weeklyRanges[i];
            const workLogs = await WorkLogs.findAll({
                where: {
                    projectId: project.id,
                    date: {
                        [Op.between]: [range.start, range.end]
                    }
                },
                attributes: ['workHour']
            });
            let totalHoursForWeek = 0;
            workLogs.forEach(workLog => {
                let workHour = workLog.workHour;
                if (workHour.indexOf(':') === -1) {
                    workHour += ':00'; 
                }

                const [hours, minutes] = workHour.split(':').map(Number);
                if (isNaN(hours) || isNaN(minutes)) {
                    console.error(`Invalid hours or minutes for log: ${JSON.stringify(workLog)}`);
                    return;
                }

                totalHoursForWeek += hours + (minutes / 60);
            });

            projectData[`week${i + 1}`] = formatHoursToHHMM(totalHoursForWeek);
            projectData.totalHours += totalHoursForWeek;
        }

        projectData.totalHours = formatHoursToHHMM(projectData.totalHours);
        results.push(projectData);
    }

    return res.status(statusCode.success).send(
        successResponseFunc(
            "Successfully Fetched Monthly WorkLog Hours",
            statusCode.success,
            constants.SUCCESS,
            results
        )
    );
};


module.exports = { getAllWorkLogHours }