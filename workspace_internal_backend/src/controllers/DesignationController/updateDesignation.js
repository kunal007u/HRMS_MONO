const {
  Designation,
  Role,
  constants,
  responseMessage,
  statusCode,
  errorResponseFunc,
  successResponseFunc,
  logger,
} = require("./designationPackageCentral");

const updateDesignation = async (req, res) => {
  try {
    const role = req.roleId;
    const designationId = req.params.id;
    const designationName = req.body.name;

    const roleName = await Role.findOne({ where: { id: role } });
    if (roleName.name !== constants.ADMIN || roleName.name !== constants.HR) {
      logger.warn(
        errorResponseFunc(
          "Only Super Admin or HR can update Designation.",
          responseMessage.badRequest,
          statusCode.badRequest,
          constants.BADREQUEST
        )
      );
      return res.status(statusCode.badRequest).send(
        errorResponseFunc(
          "Only Super Admin or HR can update Designation.",
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
      await Designation.update(
        { name: designationName },
        { where: { id: designationId } }
      );

      return res.status(statusCode.success).send(
        successResponseFunc(
          "Designation updated successfully.",
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

module.exports = updateDesignation;
