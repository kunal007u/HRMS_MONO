const {
  logger,
  errorResponseFunc,
  successResponseFunc,
  statusCode,
  constants,
  Permission,
  Route,
} = require("./adminPackageCentral");

const readPermission = async (req, res) => {
  try {
    logger.info("/readPermission route accessed.");

    const id = req.roleId;
    if (!id) {
      logger.warn(
        errorResponseFunc(
          "Role not found.",
          "Role not found.",
          statusCode.unauthorized,
          constants.UNAUTHORIZED
        )
      );
      return res.status(statusCode.unauthorized).send(
        errorResponseFunc(
          "Role not found.",
          "Role not found.",
          statusCode.unauthorized,
          constants.UNAUTHORIZED
        )
      );
    } else {
      const permissions = await Permission.findAll({
        where: { roleId: id, canRead: true },
        attributes: ["canRead"],
        include: {
          model: Route,
          where: { isActive: constants.ACTIVE },
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      });

      const routeMap = {};
      const routeChildMap = {};

      permissions.forEach(({ route }) => {
        const {
          id: routeId,
          parentRouteId,
          childRouteId,
          name,
          priority,
        } = route;
        const parentId = parentRouteId || "null";
        const childId = childRouteId || "null";

        routeMap[parentId] = routeMap[parentId] || [];
        routeChildMap[childId] = routeChildMap[childId] || [];

        if (childId === "null") {
          routeMap[parentId].push({
            id: routeId,
            name,
            parentRouteId,
            priority,
          });
        }
        routeChildMap[childId].push({
          id: routeId,
          name,
          parentRouteId,
          childRouteId,
          priority,
        });
      });

      const buildTree = (parentId) => {
        const childRoutes = (routeMap[parentId] || []).map(
          ({ id, name, priority }) => ({
            id,
            name,
            priority,
            ChildRoute: buildTree(id),
          })
        );

        const buildChildTree = (childId) => {
          const childRoutes = (routeChildMap[childId] || []).map(
            ({ id, name, priority }) => ({
              id,
              name,
              priority,
              SubChildRoute: buildChildTree(id),
            })
          );

          return childRoutes.length > 0 ? childRoutes : undefined;
        };
        return childRoutes.map((childRoute) => ({
          ...childRoute,
          ChildRoute: buildChildTree(childRoute.id),
        }));
      };
      const access = (routeMap["null"] || []).map(({ id, name, priority }) => ({
        id,
        name,
        priority,
        ChildRoute: buildTree(id),
      }));

      return res.status(statusCode.success).send(
        successResponseFunc(
          "Permission fetched.",
          statusCode.success,
          constants.SUCCESS,
          access
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

module.exports = readPermission;
