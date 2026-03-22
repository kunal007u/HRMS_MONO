const {
  Role,
  Permission,
  Employees,
  constants,
  statusCode,
  errorResponseFunc,
  successResponseFunc,
  responseMessage,
  logger,
} = require("./rolePackageCentral");

const deleteRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const role = await Role.findOne({ where: { id: roleId } });
    if (!role) {
      logger.warn(
        errorResponseFunc(
          "Role does not exist.",
          responseMessage.notFound,
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
      return res.status(statusCode.notFound).send(
        errorResponseFunc(
          "Role does not exist.",
          responseMessage.notFound,
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
    }

    if (role.name === constants.ADMIN) {
      logger.warn(
        errorResponseFunc(
          "Admin role cannot be deleted.",
          responseMessage.badRequest,
          statusCode.badRequest,
          constants.BADREQUEST
        )
      );
      return res.status(statusCode.badRequest).send(
        errorResponseFunc(
          "Admin role cannot be deleted.",
          responseMessage.badRequest,
          statusCode.badRequest,
          constants.BADREQUEST
        )
      );
    }

    await Permission.destroy({ where: { roleId } });
    await Employees.update(
      { roleId: null, isActive: constants.INACTIVE, deletedAt: Date.now() },
      { where: { roleId } }
    );
    await role.destroy();
    
    return res.status(statusCode.success).send(
      successResponseFunc(
        "Role deleted successfully.",
        responseMessage.success,
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
module.exports = deleteRole;
