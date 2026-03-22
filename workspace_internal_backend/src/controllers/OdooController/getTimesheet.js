const {
  statusCode,
  successResponseFunc,
  constants,
  TimeSheet,
  errorResponseFunc,
  logger,
  moment,
  sequelize,
} = require("./odooPackageCentral");

async function getTimesheet(req, res) {
  const id = req.params.id || req.loggersId;
  const month = parseInt(req.query.month);
  const year = parseInt(req.query.year);

    let whereClause = {
        employeeId: id,
    };

    if (year && month) {
        const startDate = moment({ year, month: month - 1, day: 1 }).startOf("month");
        const endDate = moment({ year, month: month - 1 }).endOf("month");
    
        whereClause.date = {
          [sequelize.Op.between]: [startDate.toDate(), endDate.toDate()],
        };
      }else{
        res.status(statusCode.badRequest).send(
          errorResponseFunc(
            "Month or Year not found",
            "Encountered some error.",
            statusCode.badRequest,
            constants.BADREQUEST
          )
        );
      }

      try {
        const timeSheets = await TimeSheet.findAll({
          where: whereClause,
          attributes: [
            "id",
            "date",
            "employeeId",
            "project",
            "description",
            "task",
            "hours",
            "projectTaskLabel"
          ],
          order: [["date", "DESC"]],
        });

        const groupedTimeSheets = timeSheets.reduce((acc, timeSheet) => {
          const date = timeSheet.date.toISOString().split("T")[0]; // Get date in format YYYY-MM-DD
          if(!acc[date]){
            acc[date] = {timeSheets: [], project: new Set()};
          }
          acc[date].timeSheets.push(timeSheet);

          if(timeSheet.project){
            acc[date].project.add(timeSheet.project);
          }
          return acc;
        }, {});

        const response = Object.keys(groupedTimeSheets).map((date) => {
          return {
            date,
            project: Array.from(groupedTimeSheets[date].project),
            workLogs: groupedTimeSheets[date].timeSheets,
          };
        });
        
        return res.send(
          successResponseFunc(
            "TimeSheet fetched successfully",
            statusCode.success,
            constants.SUCCESS,
            response
            )
        );
      } catch (err) {
        console.log(err);
        logger.error(
            errorResponseFunc(
              "Encountered some error.",
              err.toString(),
              statusCode.internalServerError,
              constants.ERROR
            )
          );
          res.send(
            errorResponseFunc(
              "Encountered some error.",
              err.toString(),
              statusCode.internalServerError,
              constants.ERROR
            )
          );
      }
}

module.exports = { getTimesheet };
