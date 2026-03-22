const {
  logger,
  errorResponseFunc,
  statusCode,
  constants,
  EmployeeLogDetails,
  moment,
  Op,
  successResponseFunc,
} = require("./employeeLogPackageCentral");

const deleteEmployeeLog = async (req, res) => {
  try {
    const payload = {
      employeeCode: req.body.employeeCode,
      date: req.body.date,
      time: req.body.time,
    };

    if (!payload.employeeCode || !payload.date || !payload.time) {
      logger.error(
        errorResponseFunc(
          "Employee code, date and time are required.",
          "Employee code, date and time are required.",
          statusCode.badRequest,
          constants.ERROR
        )
      );
      return res
        .status(statusCode.badRequest)
        .send(
          errorResponseFunc(
            "Employee code, date and time are required.",
            "Employee code, date and time are required.",
            statusCode.badRequest,
            constants.ERROR
          )
        );
    }

    let startTime = moment(payload.time, ["h:mm A"]).format("HH:mm:ss");
    let endTime = moment(startTime, "HH:mm:ss")
      .add(59, "seconds")
      .format("HH:mm:ss");

    const employeeLog = await EmployeeLogDetails.findOne({
      where: {
        employee_code: payload.employeeCode,
        log_date: payload.date,
        log_time: {
          [Op.between]: [startTime, endTime],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    });

    if (!employeeLog) {
      logger.error(
        errorResponseFunc(
          "Employee log not found.",
          "Employee log not found.",
          statusCode.notFound,
          constants.ERROR
        )
      );
      return res
        .status(statusCode.notFound)
        .send(
          errorResponseFunc(
            "Employee log not found.",
            "Employee log not found.",
            statusCode.notFound,
            constants.ERROR
          )
        );
    }

    await employeeLog.update({
      isDeleted: true,
      deletedAt: Date.now(),
    });

    return res
      .status(statusCode.success)
      .send(
        successResponseFunc(
          "Employee log deleted successfully.",
          statusCode.success,
          constants.SUCCESS
        )
      );
  } catch (err) {
    logger.error(
      errorResponseFunc(
        "Error getting the latest date.",
        err.toString(),
        statusCode.internalServerError,
        constants.ERROR
      )
    );
    return res
      .status(statusCode.internalServerError)
      .send(
        errorResponseFunc(
          "Error getting the latest date.",
          err.toString(),
          statusCode.internalServerError,
          constants.ERROR
        )
      );
  }
};

module.exports = deleteEmployeeLog;
