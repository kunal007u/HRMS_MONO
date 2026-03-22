const {
  statusCode,
  constants,
  responseMessage,
  errorResponseFunc,
  successResponseFunc,
  logger,
  Holiday,
  moment
} = require("./holidayPackageCentral");

const updateHoliday = async (req, res) => {
  try {
    const holidayId = req.params.id;
    const date = req.body.date;
    const title = req.body.title;
    const day = moment(req.body.date).format('dddd');

    const holidayData = await Holiday.findByPk(holidayId);
    if (!date || !title) {
      logger.warn(
        errorResponseFunc(
          "Please fill all the fields.",
          "Empty fields.",
          statusCode.badRequest,
          constants.BADREQUEST
        )
      );
      return res
        .status(statusCode.badRequest)
        .send(
          errorResponseFunc(
            "Please fill all the fields.",
            "Empty fields.",
            statusCode.badRequest,
            constants.BADREQUEST
          )
        );
    } else {
      if (!holidayData) {
        logger.warn(
          errorResponseFunc(
            "Holiday not found.",
            responseMessage.notFound,
            statusCode.notFound,
            constants.NOTFOUND
          )
        );
        return res
          .status(statusCode.notFound)
          .send(
            errorResponseFunc(
              "Holiday not found.",
              responseMessage.notFound,
              statusCode.notFound,
              constants.NOTFOUND
            )
          );
      } else {
        await Holiday.update(
          { day: day, date: date, title: title },
          { where: { id: holidayId } }
        );
        return res
          .status(statusCode.success)
          .send(
            successResponseFunc(
              "Holiday updated successfully.",
              responseMessage.success,
              statusCode.success,
              constants.SUCCESS
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

module.exports = {updateHoliday};
