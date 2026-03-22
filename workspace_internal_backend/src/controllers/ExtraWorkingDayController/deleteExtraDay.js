const {
  statusCode,
  successResponseFunc,
  constants,
  logger,
  errorResponseFunc,
  ExtraWorkingDays,
} = require("./extraDayPackageCentral");

const deleteExtraDay = async (req, res) => {
  try {
    const id = req.params.id;

    const existingExtraDay = await ExtraWorkingDays.findOne({
      where: { id },
    });

    if (!existingExtraDay) {
      return res
        .status(statusCode.badRequest)
        .send(
          errorResponseFunc(
            "Day does not exist.",
            null,
            statusCode.badRequest,
            constants.BADREQUEST
          )
        );
    }

    await ExtraWorkingDays.destroy({
      where: { id },
    });
    return res
      .status(statusCode.success)
      .send(
        successResponseFunc(
          "Extra day deleted successfully.",
          statusCode.success,
          constants.SUCCESS
        )
      );
  } catch (err) {
    console.log(err);
    logger.error(`Error in deleteExtraDay controller: ${err}`);
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

module.exports = { deleteExtraDay };