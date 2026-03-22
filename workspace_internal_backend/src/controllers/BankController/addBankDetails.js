const {
  constants,
  statusCode,
  errorResponseFunc,
  successResponseFunc,
  models,
  logger,
} = require("../../utils/utilsIndex");

const addBankDetails = async (req, res) => {
  try {
    if (Object.keys(req.body).length == 0) {
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
          "There is n request body",
          "No request body",
          statusCode.badRequest,
          constants.BADREQUEST
        )
      );
    }
    const employeeId = req.query.employeeId ? req.query.employeeId : req.loggersId;
    const { bankName, accountNo, IFSC, branchName } = req.body;

    const employeeBank = await models.BankDetails.findOne({
      where: { employeeId },
    });
    if (employeeBank) {
      await employeeBank.update(req.body);
      return res.status(statusCode.success).send(
        successResponseFunc(
          `Bank details updated successfully`,
          statusCode.success,
          constants.SUCCESS
        )
      );
    }

    if (!bankName || !accountNo || !IFSC || !branchName) {
      logger.warn(
        errorResponseFunc(
          "Please fill all the fields.",
          "Empty fields.",
          statusCode.badRequest,
          constants.BADREQUEST
        )
      );
      return res.status(statusCode.badRequest).send(
        errorResponseFunc(
          "Please fill all the fields.",
          "Empty fields.",
          statusCode.badRequest,
          constants.BADREQUEST
        )
      );
    }
    const addBank = await models.BankDetails.create({
      employeeId,
      bankName,
      accountNo,
      IFSC,
      isActive: constants.ACTIVE,
      branchName
    });
    return res.status(statusCode.created).send(
      successResponseFunc(
        `Bank Details added successfully.`,
        statusCode.created,
        constants.CREATED,
        addBank
      )
    );
  } catch (err) {
    logger.error(
      errorResponseFunc(
        "Error while adding bankDetails.",
        err.toString(),
        statusCode.internalServerError,
        constants.ERROR
      )
    );
    return res.status(statusCode.internalServerError).send(
      errorResponseFunc(
        "Error while adding bankDetails..",
        err.toString(),
        statusCode.internalServerError,
        constants.ERROR
      )
    );
  }
};

module.exports = addBankDetails;
