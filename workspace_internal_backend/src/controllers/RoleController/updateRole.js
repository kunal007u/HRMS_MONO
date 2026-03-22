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
  Op,
} = require("./rolePackageCentral");

const updateRole = async (req, res) => {
  try {
    const roleId = req.body.id || null;
    const roleName = req.body.name;
    const activeStatus = req.body.isActive;
    const permissions = req.body.permissions;

    const existingRole = await Role.findOne({
      where: { name: roleName, id: { [Op.ne]: roleId } },
    });
    if (existingRole) {
      logger.warn(
        errorResponseFunc(
          "Role with the same name already exists.",
          responseMessage.exists,
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
      return res.status(statusCode.notFound).send(
        errorResponseFunc(
          "Role with the same name already exists.",
          responseMessage.notFound,
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
    }

    const role = await Role.findByPk(roleId);
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
    const { name, isActive } = role;
    if (name !== roleName && isActive !== activeStatus) {
      await Role.update(
        { name: roleName, isActive: activeStatus },
        { where: { id: roleId }, returning: true }
      );
    }

    const permissionData = await Permission.findAll({
      where: { roleId: roleId },
      attributes: [
        "roleId",
        "routeId",
        "canCreate",
        "canRead",
        "canUpdate",
        "canDelete",
      ],
    });

    if (!permissionData) {
      logger.warn(
        errorResponseFunc(
          "Permissions data does not exist.",
          responseMessage.notFound,
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
      return res.status(statusCode.notFound).send(
        errorResponseFunc(
          "Permissions data does not exist.",
          responseMessage.notFound,
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
    }

    const updateData = permissionData
      .map((permission) => {
        const matchedPermission = permissions.find(
          (permissionData) => permissionData.routeId === permission.routeId
        );

        if (matchedPermission) {
          return {
            routeId: permission.routeId,
            roleId,
            canCreate: matchedPermission.canCreate,
            canRead: matchedPermission.canRead,
            canUpdate: matchedPermission.canUpdate,
            canDelete: matchedPermission.canDelete,
            updatedAt: new Date(),
          };
        }
        return null;
      })
      .filter(Boolean); 
    
    await Permission.bulkCreate(updateData, {
      updateOnDuplicate: [
        "canCreate",
        "canRead",
        "canUpdate",
        "canDelete",
        "routeId",
        "roleId",
        "updatedAt",
      ],
    });

    return res.status(statusCode.success).send(
      successResponseFunc(
        "Successfully updated role.",
        statusCode.success,
        constants.SUCCESS,
        updateData
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

module.exports = updateRole;