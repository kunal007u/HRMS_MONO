const {
  statusCode,
  constants,
  LeaveBalance,
  errorResponseFunc,
  successResponseFunc,
  logger,
  Employees,
  Sequelize,
  Designation,
} = require("./leaveBalancePackageCentral");

const getAllLeaveBalance = (req, res) => {
  try {
    Employees.findAll({
      where: {
        employeeType: constants.PERMANENT,
      },
      include: [
        {
          model: LeaveBalance,
          attributes: [],
        },
        {
          model: Designation,
          as: "designations",
          attributes: [],
        },
      ],
      attributes: [
        [Sequelize.col("leaveBalance.id"), "id"],
        [
          Sequelize.literal(
            'CONCAT("employees"."firstName", \' \',"employees"."lastName")'
          ),
          "fullName",
        ],
        [Sequelize.col("leaveBalance.balance"), "balance"],
        [Sequelize.col("leaveBalance.employeeId"), "employeeId"],
        [Sequelize.col("leaveBalance.paidLeave"), "paidLeave"],
        [Sequelize.col("leaveBalance.paidLeave"), "paidLeave"],
        [Sequelize.col("leaveBalance.lossOfPay"), "lossOfPay"],
        [Sequelize.col("designations.name"), "designation"],
      ],
      order: [["fullName", "ASC"]],
    })
      .then((data) => {
        return res
          .status(statusCode.success)
          .send(
            successResponseFunc(
              "Here is the Leave Balance's data.",
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
  getAllLeaveBalance,
};
