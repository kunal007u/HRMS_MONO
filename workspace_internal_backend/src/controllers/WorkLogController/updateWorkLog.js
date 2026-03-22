const {
  WorkLogs,
  constants,
  statusCode,
  errorResponseFunc,
  successResponseFunc,
  logger,
} = require("./workLogPackageCentral");

const updateWorkLog = async (req, res) => {
  try {
    const workLogsArray = req.body;
    if (!Array.isArray(workLogsArray) || workLogsArray.length === 0) {
      return res.status(statusCode.badRequest).send(
        errorResponseFunc(
          "No work logs found in the request body.",
          "No work logs found in the request body.",
          statusCode.badRequest,
          constants.BADREQUEST
        )
      );
    }

    for (const workLogData of workLogsArray) {
      const { id, date, projectId, workHour, description } = workLogData;

      if (id) {
        const workLog = await WorkLogs.findOne({
          where: {
            id: id,
          },
        });

        if (workLog) {
          await WorkLogs.update(
            {
              date: date,
              projectId: projectId,
              workHour: workHour,
              description: description,
            },
            {
              where: {
                id: id,
              },
            }
          );
          continue;
        }
      }

      // if id is not present or work log is not found then create a new work log
      await WorkLogs.create({
        date: date,
        projectId: projectId,
        workHour: workHour,
        description: description,
        employeeId: req.loggersId,
      });
    }

    return res.status(statusCode.success).send(
      successResponseFunc(
        "Work logs updated successfully.",
        "Work logs updated successfully.",
        statusCode.success,
        constants.SUCCESS
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

module.exports = updateWorkLog;
