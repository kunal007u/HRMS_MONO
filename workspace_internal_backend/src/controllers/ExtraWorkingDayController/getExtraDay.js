const {
  statusCode,
  successResponseFunc,
  constants,
  logger,
  errorResponseFunc,
  ExtraWorkingDays,
} = require("./extraDayPackageCentral");

const getExtraDay = async (req, res) => {
  try {
    const extraDays = await ExtraWorkingDays.findAll();
    if (extraDays.length === 0) {
        return res
        .status(statusCode.success)
        .send(
          errorResponseFunc(
            "Data not found.",
            null,
            statusCode.success,
            constants.SUCCESS
          )
        );
    }

    return res
        .status(statusCode.success)
        .send(
          successResponseFunc(
            "Extra days fetched successfully.",
            statusCode.success,
            constants.SUCCESS,
            extraDays,
          )
        );
  } catch (err) {
    logger.error(`Error in getExtraDay controller: ${err}`);
    return res
      .status(statusCode.internalServerError)
      .send(
        errorResponseFunc(
          "Encountered some error.",
          err.toString(),
          statusCode.internalServerError,
          constants.ERROR
        )
      );
  }
};

module.exports = { getExtraDay };