const {
  statusCode,
  constants,
  Assets,
  responseMessage,
  errorResponseFunc,
  successResponseFunc,
  logger,
} = require("./assetsPackageCentral");

const deleteAssets = async (req, res) => {
  try {
    const role = req.roleName;
    if(role === constants.EMPLOYEE){
      logger.warn(
        errorResponseFunc(
          "You are not authorized to delete assets.",
          responseMessage.badRequest,
          statusCode.badRequest,
          constants.BADREQUEST
        )
      );
      return res.status(statusCode.badRequest).send(
        errorResponseFunc(
          "You are not authorized to delete assets.",
          responseMessage.badRequest,
          statusCode.badRequest,
          constants.BADREQUEST
        )
      );
    }
    const assetsId = req.query.assetsId;
      if (!assetsId) {
        logger.warn(
          errorResponseFunc(
            "Please add the assetsId fields.",
            "Please add the assetsId fields.",
            statusCode.badRequest,
            constants.BADREQUEST
          )
        );
        return res.status(statusCode.badRequest).send(
          errorResponseFunc(
            "Please add the assetsId fields.",
            "Please add the assetsId fields.",
            statusCode.badRequest,
            constants.BADREQUEST
          )
        );
      } else {
        const assetsDetails = await Assets.findOne({
          where: {
            assetsId: assetsId,
          },
        });

        if (!assetsDetails) {
          logger.warn(
            errorResponseFunc(
              "This assets Details dose not exist",
              responseMessage.notFound,
              statusCode.notFound,
              constants.NOTFOUND
            )
          );
          return res.status(statusCode.notFound).send(
            errorResponseFunc(
              "This assets Details dose not exist",
              responseMessage.notFound,
              statusCode.notFound,
              constants.NOTFOUND
            )
          );
        }

        await assetsDetails.destroy();
        return res.status(statusCode.success).send(
          successResponseFunc(
            `Assets Details deleted successfully`,
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

module.exports = { deleteAssets };
