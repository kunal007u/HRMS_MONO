const {
  Role,
  Route,
  constants,
  statusCode,
  errorResponseFunc,
  successResponseFunc,
  logger,
} = require("./rolePackageCentral");

const getRoleById = async (req, res) => {
  try {
    const roleId = req.params.id;
    const role = await Role.findOne({
      where: { id: roleId },
      attributes: ["id", "name", "isActive"],
      include: [
        {
          model: Route,
          attributes: ["id", "name"],
          through: {
            attributes: {
              exclude: [
                "createdAt",
                "deletedAt",
                "updatedAt",
                "roleId",
                "routeId",
              ],
            },
          },
        },
      ],
    });
    return res.status(statusCode.success).send(
      successResponseFunc(
        "Here is the role data.",
        statusCode.success,
        constants.SUCCESS,
        role
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

module.exports = getRoleById;
