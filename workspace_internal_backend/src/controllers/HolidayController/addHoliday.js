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
const createHoliday = async (req, res) => {
  try {
    const date = req.body.date;
    const title = req.body.title;
    const day = moment(req.body.date).format('dddd');
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
      const holiday = await Holiday.create({
        day: day,
        date: date,
        title: title,
      });

      if (!holiday) {
        logger.warn(
          errorResponseFunc(
            "Holiday already exists.",
            responseMessage.exists,
            statusCode.conflict,
            constants.CONFLICT
          )
        );
        return res
          .status(statusCode.conflict)
          .send(
            errorResponseFunc(
              "Holiday already exists.",
              responseMessage.exists,
              statusCode.conflict,
              constants.CONFLICT
            )
          );
      } else {
        return res
          .status(statusCode.created)
          .send(
            successResponseFunc(
              "Holiday created successfully.",
              statusCode.created,
              constants.CREATED
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
    .status(statusCode.internalServerError).send(
      errorResponseFunc(
        "Encountered some error.",
        err.toString(),
        statusCode.internalServerError,
        constants.ERROR
      )
    );
  }
};

module.exports = {createHoliday};
