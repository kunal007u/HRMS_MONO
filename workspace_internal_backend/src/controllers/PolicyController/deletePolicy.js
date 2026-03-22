const {
  statusCode,
  constants,
  responseMessage,
  errorResponseFunc,
  successResponseFunc,
  logger,
  Policy,
  deleteFile
} = require("./PolicyPackageCentral");

const deletePolicy = async (req, res) => {
  try {
    const policyId = req.params.id;
    const policy = await Policy.findByPk(policyId);
    if (!policy) {
      logger.warn(
        errorResponseFunc(
          "policy not found.",
          responseMessage.notFound,
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
      return res.status(statusCode.notFound).send(
        errorResponseFunc(
          "policy not found.",
          responseMessage.notFound,
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
    } else {
      if (policy.policyFile) {
        await deleteFile(policy.policyFile);
      }
      await Policy.destroy({ where: { id: policyId } });

      return res.status(statusCode.success).send(
        successResponseFunc(
          "Policy deleted successfully.",
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

module.exports = {deletePolicy};