const {
  statusCode,
  constants,
  Department,
  responseMessage,
  errorResponseFunc,
  successResponseFunc,
  logger,
} = require("./departmentPackageCentral");

const createDepartment = async (req, res) => {
  try {
    const dpName = req.body.name;

    const [department, created] = await Department.findOrCreate({
      where: { name: dpName },
      defaults: { name: dpName, isActive: constants.ACTIVE },
    });

    if (!created) {
      logger.warn(
        errorResponseFunc(
          "Department already exists.",
          responseMessage.exists,
          statusCode.conflict,
          constants.CONFLICT
        )
      );
      return res.status(statusCode.conflict).send(
        errorResponseFunc(
          "Department already exists.",
          responseMessage.exists,
          statusCode.conflict,
          constants.CONFLICT
        )
      );
    } else {
      return res.status(statusCode.created).send(
        successResponseFunc(
          "Department created successfully.",
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

module.exports = createDepartment;