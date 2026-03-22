const {
  WorkLogs,
  constants,
  statusCode,
  errorResponseFunc,
  successResponseFunc,
  logger,
} = require("./workLogPackageCentral");

const createWorkLog = async (req, res) => {
  try {
    const employeeId = req.loggersId;
    for (let row of req.body) {
      if (!row.date || !row.workHour || !row.description || !row.projectId) {
        return res.status(statusCode.badRequest).send(
          errorResponseFunc(
            "Please fill all the fields.",
            "Empty fields.",
            statusCode.badRequest,
            constants.BADREQUEST
          )
        );
      }
      await WorkLogs.create({
        date: row.date,
        projectId: row.projectId,
        workHour: row.workHour,
        description: row.description,
        employeeId: employeeId,
      });
    }

    return res.status(statusCode.created).send(
      successResponseFunc(
        `Worklog Added successfully.`,
        statusCode.created,
        constants.CREATED
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
    return res.status(statusCode.internalServerError).send(
      errorResponseFunc(
        "Encountered some error.",
        err.toString(),
        statusCode.internalServerError,
        constants.ERROR
      )
    );
  }
};

module.exports = createWorkLog;
