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

const createDesignation = async (req, res) => {
  try {
    const role = req.roleId;
    const designationName = req.body.designationName;

    const roleName = await Role.findOne({ where: { id: role } });
    if (roleName.name !== constants.ADMIN && roleName.name !== constants.HR) {
      logger.warn(
        errorResponseFunc(
          "Only Super Admin or HR can create Designation.",
          responseMessage.badRequest,
          statusCode.badRequest,
          constants.BADREQUEST
        )
      );
      return res.status(statusCode.badRequest).send(
        errorResponseFunc(
          "Only Super Admin or HR can create Designation.",
          responseMessage.badRequest,
          statusCode.badRequest,
          constants.BADREQUEST
        )
      );
    } else {
      await Designation.create({
        name: designationName,
        isActive: constants.ACTIVE,
      });
      return res.status(statusCode.success).send(
        successResponseFunc(
          "Designation created successfully.",
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

module.exports = createDesignation;
