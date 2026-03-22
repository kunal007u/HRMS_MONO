const {
  statusCode,
  successResponseFunc,
  constants,
  logger,
  errorResponseFunc,
  ExtraWorkingDays,
} = require("./extraDayPackageCentral");

const addExtraDay = async (req, res) => {
  try {
    let { extraDayDate, shiftedFromDate, reason } = req.body;

    if(!shiftedFromDate || shiftedFromDate === "") {
      shiftedFromDate = null;
    }

    const existingExtraDay = await ExtraWorkingDays.findOne({
      where: { extraDayDate },
    });

    if (existingExtraDay) {
      return res
        .status(statusCode.badRequest)
        .send(
          errorResponseFunc(
            "Day already exists.",
            null,
            statusCode.badRequest,
            constants.BADREQUEST
          )
        );
    }

    await ExtraWorkingDays.create({
      extraDayDate,
      shiftedFromDate,
      reason,
    });
    return res
      .status(statusCode.success)
      .send(
        successResponseFunc(
          "Extra day added successfully.",
          statusCode.success,
          constants.SUCCESS
        )
      );
  } catch (err) {
    logger.error(`Error in addExtraDay controller: ${err}`);
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

module.exports = { addExtraDay };
