const {
  Employees,
  errorResponseFunc,
  statusCode,
  constants,
  successResponseFunc,
  logger,
  LeaveRequest,
} = require("./employeePackageCentral");

const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    if (!employeeId) {
      return res
        .status(statusCode.badRequest)
        .send(
          errorResponseFunc(
            "employeeId is required to delete",
            "No employeeId found",
            statusCode.badRequest,
            constants.BADREQUEST
          )
        );
    }
    const employee = await Employees.findByPk(employeeId);
    if (!employee) {
      return res
        .status(statusCode.badRequest)
        .send(
          errorResponseFunc(
            "No employee found",
            "There is no employee with this id",
            statusCode.badRequest,
            constants.BADREQUEST
          )
        );
    }
    if (employee.deletedAt != null) {
      return res
        .status(statusCode.badRequest)
        .send(
          errorResponseFunc(
            "Employee already deleted",
            "Employee already deleted",
            statusCode.badRequest,
            constants.BADREQUEST
          )
        );
    }
    await LeaveRequest.update({isActive : false}, {where : {employeeId : employeeId}});
    await employee.destroy();
    return res
      .status(statusCode.success)
      .send(
        successResponseFunc(
          "Successfully deleted",
          statusCode.success,
          constants.SUCCESS
        )
      );
  } catch (err) {
    logger.error(
      errorResponseFunc(
        "Encountered error while syncing the admin table.",
        err.toString(),
        statusCode.internalServerError,
        constants.ERROR
      )
    );
    return res
      .status(statusCode.internalServerError)
      .send(
        errorResponseFunc(
          "Encounterd some error",
          err.toString(),
          statusCode.internalServerError,
          constants.ERROR
        )
      );
  }
};

module.exports = { deleteEmployee };
