const {
  WorkLogs,
  constants,
  statusCode,
  errorResponseFunc,
  successResponseFunc,
  logger,
  Projects,
} = require("./workLogPackageCentral");
const moment = require("moment");
const { Op } = require("sequelize");

const getAllWorkLogs = async (req, res) => {
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
      [Op.between]: [startDate.toDate(), endDate.toDate()],
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
    const works = await WorkLogs.findAll({
      where: whereClause,
      include: [
        {
          model: Projects,
          attributes: [["projectName", "name"]],
        },
      ],
      attributes: [
        "id",
        "date",
        "employeeId",
        "projectId",
        "workHour",
        "description"
      ],
      order: [["date", "DESC"]],
    });

    const groupedWorks = works.reduce((acc, work) => {
      const date = work.date.toISOString().split("T")[0];
      if (!acc[date]) {
        acc[date] = { workLogs: [], projects: new Set() };
      }
      acc[date].workLogs.push({
        id: work.id,
        date: work.date,
        employeeId: work.employeeId,
        projectId: work.projectId,
        projectName: work.project.dataValues.name,
        workHour: work.workHour,
        description: work.description,
        projectName: work.project.dataValues?.name? work.project.dataValues?.name : null,
      });
      if (work.project) {
        acc[date].projects.add(work.project.dataValues.name);
      }
      return acc;
    }, {});

      const result = Object.keys(groupedWorks).map(date => ({
      date,
      projects: Array.from(groupedWorks[date].projects),
        workLogs: groupedWorks[date].workLogs
    }));

    return res.send(
      successResponseFunc(
        "Successfully fetched worklogs.",
        statusCode.success,
        constants.SUCCESS,
        result
      )
    );
  } catch (err) {
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
};

module.exports = getAllWorkLogs;
