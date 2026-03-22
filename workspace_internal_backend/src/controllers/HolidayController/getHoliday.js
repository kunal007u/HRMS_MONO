const {
  statusCode,
  constants,
  errorResponseFunc,
  successResponseFunc,
  logger,
  Holiday
} = require("./holidayPackageCentral");

const getAllHoliday = (req, res) => {
  try {
    Holiday.findAll({ attributes:["id","title","date","day"] })
      .then((data) => {
        return res.status(statusCode.success).send(
          successResponseFunc(
            "Here is the Holiday's data.",
            statusCode.success,
            constants.SUCCESS,
            data
          )
        );
      })
      .catch((err) => {
        logger.error(
          errorResponseFunc(
            "Encountered error after checking if this exists.",
            err.toString(),
            statusCode.internalServerError,
            constants.ERROR
          )
        );
        return res.status(statusCode.internalServerError).send(
          errorResponseFunc(
            "Encountered error after checking if this exists.",
            err.toString(),
            statusCode.internalServerError,
            constants.ERROR
          )
        );
      });
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

module.exports = {
  getAllHoliday,
};
