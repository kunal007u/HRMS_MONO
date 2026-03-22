const {
  Employees,
  Role,
  statusCode,
  constants,
  successResponseFunc,
  errorResponseFunc,
  Sequelize,
  logger,
} = require("./employeePackageCentral");

const getReportTo = async (req, res) => {
  try {
    const employeeData = await Employees.findAll({
      where: { isActive: constants.ACTIVE },
      attributes: [
        "id",
        "firstName",
        "lastName",
        [
          Sequelize.fn(
            "CONCAT",
            Sequelize.col("firstName"),
            " ",
            Sequelize.col("lastName")
          ),
          "fullName",
        ],
      ],
    });

    return res.status(statusCode.success).send(
      successResponseFunc(
        "Here is the employee data.",
        statusCode.success,
        constants.SUCCESS,
        employeeData
      )
    );
  } catch (err) {
    logger.error(
      errorResponseFunc(
        "Encountered error while syncing the admin table.",
        err.toString(),
        statusCode.internalServerError,
        constants.ERROR
      )
    );
    return res.status(statusCode.internalServerError).send(
      errorResponseFunc(
        "Encountered error while syncing the admin table.",
        err.toString(),
        statusCode.internalServerError,
        constants.ERROR
      )
    );
  }
};

module.exports = { getReportTo };
