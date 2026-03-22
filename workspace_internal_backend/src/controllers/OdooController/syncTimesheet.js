const { statusCode, authenticateOdoo, fetchTimesheets, successResponseFunc, constants, moment, logger, errorResponseFunc } = require("./odooPackageCentral");

const syncTimesheet = async (req, res) => {
  try {
    const date = req.body.date;

    if(!date) {
      return res.status(statusCode.badRequest).send(
        errorResponseFunc(
          "Please provide a date.",
          null,
          statusCode.badRequest,
          constants.ERROR
        )
      );
    } else if(date && !moment(date, "YYYY-MM-DD", true).isValid()) {
      return res.status(statusCode.badRequest).send(
        errorResponseFunc(
          "Please provide a valid date in the format YYYY-MM-DD.",
          null,
          statusCode.badRequest,
          constants.BADREQUEST
        )
      );
    }
    
    const uid = await authenticateOdoo();
    const response = await fetchTimesheets(uid, date);

    if (response && response.message) {
      return res.status(statusCode.created).send(
        successResponseFunc(
          response.message,
          statusCode.created,
          constants.CREATED
        )
      );
    } else {
      return res.status(statusCode.internalServerError).send(
        errorResponseFunc(
          "Error occurred while syncing timesheets.",
          null,
          statusCode.internalServerError,
          constants.ERROR
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

module.exports = { syncTimesheet };