const {
  statusCode,
  constants,
  LeaveBalance,
  responseMessage,
  errorResponseFunc,
  successResponseFunc,
  logger,
} = require("./leaveBalancePackageCentral");
const timeZone = "Asia/Kolkata";

const updateLeaveBalance = async (req, res) => {
  try {
    const leaveBalanceId = req.params.leaveBalanceId;
    const balance = req.body.balance;
    const leaveBalance = await LeaveBalance.findByPk(leaveBalanceId);
    if (!leaveBalance) {
      logger.warn(
        errorResponseFunc(
          "Leave Balance not found.",
          responseMessage.notFound,
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
      return res
        .status(statusCode.notFound)
        .send(
          errorResponseFunc(
            "Leave Balance not found.",
            responseMessage.notFound,
            statusCode.notFound,
            constants.NOTFOUND
          )
        );
    } else {
      if (balance === null) {
        logger.warn(
          errorResponseFunc(
            "There is no request body.",
            "No request body.",
            statusCode.badRequest,
            constants.BADREQUEST
          )
        );
        return res
          .status(statusCode.badRequest)
          .send(
            errorResponseFunc(
              "There is no request body.",
              "No request body.",
              statusCode.badRequest,
              constants.BADREQUEST
            )
          );
      }
      await LeaveBalance.update(
        { balance: balance },
        { where: { id: leaveBalanceId } }
      );
      return res
        .status(statusCode.success)
        .send(
          successResponseFunc(
            "Leave Balance updated successfully.",
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

module.exports = { updateLeaveBalance };
