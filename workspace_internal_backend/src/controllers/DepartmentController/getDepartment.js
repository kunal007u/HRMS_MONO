const {
  statusCode,
  constants,
  Department,
  errorResponseFunc,
  successResponseFunc,
  logger,
} = require("./departmentPackageCentral");

const getAllDepartment = (req, res) => {
  try {
    Department.findAll({ where: { isActive: constants.ACTIVE } })
      .then((data) => {
        return res.status(statusCode.success).send(
          successResponseFunc(
            "Here is the Department's data.",
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
        return res.status(statusCode.internalServerError).send(
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

module.exports = {
  getAllDepartment,
};
