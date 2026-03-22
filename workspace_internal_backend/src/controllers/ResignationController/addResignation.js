const {
  statusCode,
  constants,
  responseMessage,
  errorResponseFunc,
  successResponseFunc,
  logger,
  Resignation,
} = require("./ResignationPackageCentral");

const createResignation = async (req, res) => {
  try {
    const description = req.body.description;
    const employeeId = req.loggersId;
    if (!description) {
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
      await Resignation.create({
        description: description,
        employeeId: employeeId,
      });

      return res
        .status(statusCode.created)
        .send(
          successResponseFunc(
            "Resignation created successfully.",
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

module.exports = { createResignation };
