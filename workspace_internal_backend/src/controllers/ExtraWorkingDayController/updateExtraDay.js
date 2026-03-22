const {
  statusCode,
  successResponseFunc,
  constants,
  logger,
  errorResponseFunc,
  ExtraWorkingDays,
} = require("./extraDayPackageCentral");

const updateExtraDay = async (req, res) => {
  try {
    const id = req.params.id;
    let { extraDayDate, shiftedFromDate, reason } = req.body;

    if (!shiftedFromDate || shiftedFromDate === "") {
      shiftedFromDate = null;
    }

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

    await ExtraWorkingDays.update(
      {
        extraDayDate,
        shiftedFromDate,
        reason,
      },
      {
        where: { id },
      }
    );
    return res
      .status(statusCode.success)
      .send(
        successResponseFunc(
          "Extra day updated successfully.",
          statusCode.success,
          constants.SUCCESS
        )
      );
  } catch (err) {
    logger.error(`Error in updateExtraDay controller: ${err}`);
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

module.exports = { updateExtraDay };
