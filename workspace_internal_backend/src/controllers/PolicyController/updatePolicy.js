const {
  statusCode,
  constants,
  responseMessage,
  errorResponseFunc,
  successResponseFunc,
  logger,
  Policy,
  deleteFile,
  uploadFile,
} = require("./PolicyPackageCentral");

const updatePolicy = async (req, res) => {
  try {
    const policyId = req.params.id;
    const { files = [] } = req;
    const policyName = req.body.name;
    const description = req.body.description;

    const policy = await Policy.findByPk(policyId);
    if (!policyName || !description) {
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
      if (!policy) {
        logger.warn(
          errorResponseFunc(
            "Policy not found.",
            responseMessage.notFound,
            statusCode.notFound,
            constants.NOTFOUND
          )
        );
        return res
          .status(statusCode.notFound)
          .send(
            errorResponseFunc(
              "Policy not found.",
              responseMessage.notFound,
              statusCode.notFound,
              constants.NOTFOUND
            )
          );
      } else {
        if (files.length > 0) {
          await deleteFile(policy.policyFile)
        }

        await Policy.update(
          {
            name: policyName,
            description: description,
            policyFile:
              files.length > 0
                ? (await uploadFile(files[0])).Location.split("/").pop()
                : null,
          },
          { where: { id: policyId } }
        );
        return res
          .status(statusCode.success)
          .send(
            successResponseFunc(
              "Policy updated successfully.",
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

module.exports = { updatePolicy };
