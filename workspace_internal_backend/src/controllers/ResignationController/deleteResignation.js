const {
  statusCode,
  constants,
  responseMessage,
  errorResponseFunc,
  successResponseFunc,
  logger,
  Resignation
} = require("./ResignationPackageCentral");

const deleteResignation = async (req, res) => {
  try {
    const resignationId = req.params.id;
    const resignation = await Resignation.findByPk(resignationId);
    if (!resignation) {
      logger.warn(
        errorResponseFunc(
          "Resignation not found.",
          responseMessage.notFound,
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
      return res.status(statusCode.notFound).send(
        errorResponseFunc(
          "Resignation not found.",
          responseMessage.notFound,
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
    } else {
      await resignation.destroy();

      return res.status(statusCode.success).send(
        successResponseFunc(
          "Resignation deleted successfully.",
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

module.exports = {deleteResignation};