const {
  statusCode,
  constants,
  LeaveMaster,
  responseMessage,
  errorResponseFunc,
  successResponseFunc,
  logger,
} = require("./leaveMasterPackageCentral");

const updateLeaveMaster = async (req, res) => {
  try {
    const leaveMasterId = req.params.leaveMasterId;
    const month = req.body.month;
    const leaves = req.body.leaves;

    const leaveMaster = await LeaveMaster.findByPk(leaveMasterId);
    if (!leaveMaster) {
      logger.warn(
        errorResponseFunc(
          "Leave master not found.",
          responseMessage.notFound,
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
      return res.status(statusCode.notFound).send(
        errorResponseFunc(
          "Leave master not found.",
          responseMessage.notFound,
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
    } else {
      if (!month || !leaves) {
        logger.warn(
          errorResponseFunc(
            "There is no request body.",
            "No request body.",
            statusCode.badRequest,
            constants.BADREQUEST
          )
        );
        return res.status(statusCode.badRequest).send(
          errorResponseFunc(
            "There is no request body.",
            "No request body.",
            statusCode.badRequest,
            constants.BADREQUEST
          )
        );
      }
      await LeaveMaster.update(
        { month: month, leaves: leaves },
        { where: { id: leaveMasterId } }
      );
      return res.status(statusCode.success).send(
        successResponseFunc(
          "Leave master record has been updated successfully",
          responseMessage.success,
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

module.exports = { updateLeaveMaster };
