const {
  statusCode,
  constants,
  responseMessage,
  errorResponseFunc,
  successResponseFunc,
  logger,
  Holiday
} = require("./holidayPackageCentral");

const deleteHoliday = async (req, res) => {
  try {
    const holidayId = req.params.id;
    const holidayData = await Holiday.findByPk(holidayId);
    if (!holidayData) {
      logger.warn(
        errorResponseFunc(
          "Holiday not found.",
          responseMessage.notFound,
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
      return res.status(statusCode.notFound).send(
        errorResponseFunc(
          "Holiday not found.",
          responseMessage.notFound,
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
    } else {
      await holidayData.destroy();

      return res.status(statusCode.success).send(
        successResponseFunc(
          "Holiday deleted successfully.",
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

module.exports = {deleteHoliday};