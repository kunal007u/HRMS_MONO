const {
  logger,
  errorResponseFunc,
  statusCode,
  constants,
  successResponseFunc,
  responseMessage,
  MonthlySalary,
} = require("./salaryPackageCentral");

const verifySalary = async (req, res) => {
  try {
    const status = req.body.isVerified;
    const employeeName = req.name;
    const salaryId = req.body.salaryId;
    const remarks = req.body.remarks;

    if (!salaryId || status === null) {
      return res
        .status(statusCode.badRequest)
        .send(
          errorResponseFunc(
            "Please provide salaryId or status.",
            responseMessage.badRequest,
            statusCode.badRequest,
            constants.ERROR
          )
        );
    }

    const salary = await MonthlySalary.findOne({
      where: {
        id: salaryId,
      },
    });
    if (!salary) {
      return res
        .status(statusCode.notFound)
        .send(
          errorResponseFunc(
            "Salary not found.",
            responseMessage.notFound,
            statusCode.notFound,
            constants.ERROR
          )
        );
    }

    await MonthlySalary.update(
      {
        isVerified: status,
        verifiedBy: employeeName,
        remarks: remarks,
      },
      {
        where: {
          id: salaryId,
        },
      }
    );

    return res
      .status(statusCode.success)
      .send(
        successResponseFunc(
          "Salary verified successfully.",
          responseMessage.success,
          statusCode.success,
          constants.SUCCESS
        )
      );
  } catch (err) {
    logger.error(
      errorResponseFunc(
        "Encountered some error while verifying salary.",
        err.toString(),
        statusCode.internalServerError,
        constants.ERROR
      )
    );
    return res
      .status(statusCode.internalServerError)
      .send(
        errorResponseFunc(
          "Encountered some error while verifying salary.",
          err.toString(),
          statusCode.internalServerError,
          constants.ERROR
        )
      );
  }
};

module.exports = verifySalary;
