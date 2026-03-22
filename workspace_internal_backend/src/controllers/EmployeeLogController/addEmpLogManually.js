const {
  logger,
  errorResponseFunc,
  statusCode,
  constants,
  EmployeeLogDetails,
  moment,
  successResponseFunc,
  Employees,
} = require("./employeeLogPackageCentral");

const addEmpLogManually = async (req, res) => {
  try {
    const payload = {
      employeeCode: req.body.employeeCode,
      date: req.body.date,
      timeData: req.body.timeData,
      direction: "out",
    };

    if (!payload.employeeCode || !payload.date || !payload.timeData || !payload.timeData.length) {
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

    const employee = await Employees.findOne({
      where: {
        employee_code: payload.employeeCode,
      },
    });

    if (!employee) {
      logger.error(
        errorResponseFunc(
          "Employee not found.",
          "Employee not found.",
          statusCode.notFound,
          constants.ERROR
        )
      );
      return res
        .status(statusCode.notFound)
        .send(
          errorResponseFunc(
            "Employee not found.",
            "Employee not found.",
            statusCode.notFound,
            constants.ERROR
          )
        );
    };

    payload.timeData.sort((a, b) => {
      return moment(a.time, ["h:mm A"]).valueOf() - moment(b.time, ["h:mm A"]).valueOf();
    });

    for(const timeEntry of payload.timeData) {
      let formattedTime = moment(timeEntry.time, ["h:mm A"]).format("HH:mm:ss");
      await EmployeeLogDetails.create({
        employee_code: payload.employeeCode,
        log_date: payload.date,
        log_time: formattedTime,
        direction: payload.direction,
      });
    };

    return res
      .status(statusCode.success)
      .send(
        successResponseFunc(
          "Employee log added successfully.",
          statusCode.success,
          constants.SUCCESS,
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

module.exports = addEmpLogManually;
