const {
  Employees,
  statusCode,
  constants,
  successResponseFunc,
  errorResponseFunc,
  logger,
} = require("./employeePackageCentral");

const logOut = async (req, res) => {
  try {
    let employee = await Employees.findOne({ where: { id: req.loggersId } });
    if (!employee) {
      return errorResponseFunc(
        "Employee not found",
        statusCode.notFound,
        constants.NOTFOUND
      );
    }else{
      await Employees.update(
        { sessionId: null },
        { where: { id: req.loggersId } }
      );
    }
    return res
      .status(statusCode.success)
      .send(
        successResponseFunc(
          "Logged out successfully.",
          statusCode.success,
          constants.SUCCESS
        )
      );
  } catch (err) {
    logger.error(
      errorResponseFunc(
        "Encountered error while syncing the employee table.",
        err.toString(),
        statusCode.internalServerError,
        constants.ERROR
      )
    );
    return res
      .status(statusCode.internalServerError)
      .send(
        errorResponseFunc(
          "Encountered error while syncing the employee table.",
          err.toString(),
          statusCode.internalServerError,
          constants.ERROR
        )
      );
  }
};

module.exports = { logOut };
