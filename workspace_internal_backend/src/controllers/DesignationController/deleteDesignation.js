const {
  Designation,
  Role,
  Employees,
  constants,
  responseMessage,
  statusCode,
  errorResponseFunc,
  successResponseFunc,
  logger,
} = require("./designationPackageCentral");

const deleteDesignation = async (req, res) => {
  try {
    const role = req.roleName;
    const designationId = req.params.id;
    if (role === constants.EMPLOYEE) {
      logger.warn(
        errorResponseFunc(
          "Only Super Admin or HR can delete Designation.",
          responseMessage.badRequest,
          statusCode.badRequest,
          constants.BADREQUEST
        )
      );
      return res.status(statusCode.badRequest).send(
        errorResponseFunc(
          "Only Super Admin or HR can delete Designation.",
          responseMessage.badRequest,
          statusCode.badRequest,
          constants.BADREQUEST
        )
      );
    }

    const designation = await Designation.findByPk(designationId);
    if (!designation) {
      logger.warn(
        errorResponseFunc(
          "Designation not found.",
          responseMessage.notFound,
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
      return res.status(statusCode.notFound).send(
        errorResponseFunc(
          "Designation not found.",
          responseMessage.notFound,
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
    } else {
      await Employees.update(
        { designationId: null },
        { where: { designationId: designationId } }
      );
      await designation.destroy();
      logger.info(
        successResponseFunc(
          "Designation deleted successfully.",
          statusCode.success,
          constants.SUCCESS
        )
      );
      return res.status(statusCode.success).send(
        successResponseFunc(
          "Designation deleted successfully.",
          statusCode.success,
          constants.SUCCESS
        )
      );
    }
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

module.exports = deleteDesignation;
