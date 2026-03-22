const {
  Designation,
  constants,
  statusCode,
  errorResponseFunc,
  successResponseFunc,
  logger,
} = require("./designationPackageCentral");

const getAllDesignation = async (req, res) => {
  try {
    const designation = await Designation.findAll({
      where: { isActive: constants.ACTIVE },
    });
    return res.status(statusCode.success).send(
      successResponseFunc(
        "Here is the designation data.",
        statusCode.success,
        constants.SUCCESS,
        designation
      )
    );
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

module.exports = { getAllDesignation };
