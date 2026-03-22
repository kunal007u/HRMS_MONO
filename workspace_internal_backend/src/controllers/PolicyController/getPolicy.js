const {
  statusCode,
  constants,
  errorResponseFunc,
  successResponseFunc,
  logger,
  Policy,
  AWS_URL,
  literal
} = require("./PolicyPackageCentral");

const getAllPolicy = (req, res) => {
  try {
    Policy.findAll({
      attributes: [
        "id",
        "name",
        "description",
        [literal(`'${AWS_URL + "/"}' || "policyFile"`), "policyFile"],
        "createdAt",
      ],
    })
      .then((data) => {
        return res
          .status(statusCode.success)
          .send(
            successResponseFunc(
              "Here is the Policy's data.",
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
        return res
          .status(statusCode.internalServerError)
          .send(
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

module.exports = {
  getAllPolicy,
};
