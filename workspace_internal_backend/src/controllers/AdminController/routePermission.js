const {
  logger,
  errorResponseFunc,
  successResponseFunc,
  statusCode,
  constants,
  Permission,
  Route,
} = require("./adminPackageCentral");

const routePermission = async (req, res) => {
  try {
    const routeId = req.params.routeId;
    const role = req.roleId;

    if (!routeId || !role) {
      logger.warn(
        errorResponseFunc(
          "Route or Role not found.",
          "Route or Role not found.",
          statusCode.unauthorized,
          constants.UNAUTHORIZED
        )
      );
      return res.status(statusCode.unauthorized).send(
        errorResponseFunc(
          "Route or Role not found.",
          "Route or Role not found.",
          statusCode.unauthorized,
          constants.UNAUTHORIZED
        )
      );
    } else {
      const permissionData = await Permission.findOne({
        where: { roleId: role, routeId: routeId },
        attributes: ["canCreate", "canRead", "canUpdate", "canDelete"],
        include : {
            model : Route,
            where : { isActive : constants.ACTIVE },
            attributes : ["id", ["name", "routeName"]]
        }
      });

      if(!permissionData) {
        logger.warn(
          errorResponseFunc(
            "Permission not found.",
            "Permission not found.",
            statusCode.unauthorized,
            constants.UNAUTHORIZED
          )
        );
        return res.status(statusCode.unauthorized).send(
          errorResponseFunc(
            "Permission not found.",
            "Permission not found.",
            statusCode.unauthorized,
            constants.UNAUTHORIZED
          )
        );
      } else {
        return res.status(statusCode.success).send(
          successResponseFunc(
            "Permission found.",
            statusCode.success,
            constants.SUCCESS,
            permissionData
          )
        );
      }
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

module.exports = routePermission;
