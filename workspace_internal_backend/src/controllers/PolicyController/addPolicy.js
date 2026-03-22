const {
  statusCode,
  constants,
  responseMessage,
  errorResponseFunc,
  successResponseFunc,
  logger,
  Policy,
  uploadFile,
} = require("./PolicyPackageCentral");

const createPolicy = async (req, res) => {
  try {
    const { files = [] } = req;
    const name = req.body.name;
    const description = req.body.description;

    if (!name || !description) {
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
      await Policy.create({
        name: name,
        description: description,
        policyFile:
          files.length > 0
            ? (await uploadFile(files[0])).Location.split("/").pop()
            : null,
        });

      return res
        .status(statusCode.created)
        .send(
          successResponseFunc(
            "Policy created successfully.",
            statusCode.created,
            constants.CREATED
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

module.exports = { createPolicy };
