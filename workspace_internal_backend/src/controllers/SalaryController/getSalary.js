const {
  Salary,
  logger,
  errorResponseFunc,
  statusCode,
  constants,
  successResponseFunc,
  responseMessage,
  Employees,
  MonthlySalary,
  moment,
  Sequelize,
  Op,
} = require("./salaryPackageCentral");

const getSalaryDetails = async (req, res) => {
  try {
    let search = req.query.search;
    let where = {
      isActive: constants.ACTIVE,
    }
    if (search) {
      where = {
        isActive: constants.ACTIVE,
        [Sequelize.Op.and]: Sequelize.where(
          Sequelize.fn(
            "LOWER",
            Sequelize.literal(
              'CONCAT("employee"."firstName", \' \',"employee"."lastName")'
            )
          ),
          {
            [Op.like]: "%" + search.toLowerCase() + "%",
          }
        ),
      }

    }
    const salaries = await Salary.findAll({
      include: {
        model: Employees,
        attributes: ["firstName", "lastName", "email", "id", "employee_code"],
      },
      where: where,
      order: [[{ model: Employees }, 'employee_code', 'ASC']],
    });
    return res
      .status(statusCode.success)
      .send(
        successResponseFunc(
          "Here is the salary data.",
          statusCode.success,
          constants.SUCCESS,
          salaries
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

const getSalaryById = async (req, res) => {
  try {
    const salaryId = req.params.id;
    if (!salaryId) {
      return res
        .status(statusCode.notFound)
        .send(
          errorResponseFunc(
            "salaryId is required",
            responseMessage.notFound,
            statusCode.notFound,
            constants.NOTFOUND
          )
        );
    }

    const salary = await Salary.findOne({
      where: {
        id: salaryId,
      },
      include: {
        model: Employees,
        attributes: ["firstName", "lastName", "email", "id"],
      },
    });
    if (!salary) {
      return res
        .status(statusCode.notFound)
        .send(
          errorResponseFunc(
            "salary Not Found",
            responseMessage.notFound,
            statusCode.notFound,
            constants.NOTFOUND
          )
        );
    }
    return res
      .status(statusCode.success)
      .send(
        successResponseFunc(
          "Successfully get salary",
          statusCode.success,
          constants.SUCCESS,
          salary
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

const getAllEmployeeMonthlySalary = async (req, res) => {
  try {
    let { month, year, search } = req.query;
    if (!month || !year) {
      const previousMonth = moment().subtract(1, "month");
      month = previousMonth.format("MM");
      year = previousMonth.format("YYYY");
    }

    let whereClause = {
      year: year,
      month: moment(month, "M").format("MM")
    };
    let employeeWhereClause = {};
    if (search) {
      employeeWhereClause = {
        [Op.or]: [
          Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("firstName")), {
            [Op.like]: `%${search.toLowerCase()}%`,
          }),
          Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("lastName")), {
            [Op.like]: `%${search.toLowerCase()}%`,
          }),
          Sequelize.where(
            Sequelize.fn(
              "LOWER",
              Sequelize.literal('CONCAT("firstName", \' \', "lastName")')
            ),
            {
              [Op.like]: `%${search.toLowerCase()}%`,
            }
          ),
        ],
      };
    }
    const getAllEmployeeSalary = await MonthlySalary.findAll({
      where: whereClause,
      include: {
        model: Employees,
        attributes: ["id", "firstName", "lastName", "email", "employee_code"],
        where: employeeWhereClause,
      },
      order: [[{ model: Employees }, 'employee_code', 'ASC']],
    });
    return res
      .status(statusCode.success)
      .send(
        successResponseFunc(
          "Here is All Employee's Monthly Salary Data.",
          statusCode.success,
          constants.SUCCESS,
          getAllEmployeeSalary
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

const getAllSalaryByEmployeeId = async (req, res) => {
  try {
    let { year } = req.query;
    if (!year) {
      year = moment().format("YYYY");
    }
    const employeeId = req.loggersId;
    if (!employeeId) {
      return res
        .status(statusCode.notFound)
        .send(
          errorResponseFunc(
            "employeeId is required",
            responseMessage.notFound,
            statusCode.notFound,
            constants.NOTFOUND
          )
        );
    }

    const employeeSalary = await MonthlySalary.findAll({
      where: {
        employeeId: employeeId,
        year: year,
      },
    });
    employeeSalary?.forEach(element => {
      element.dataValues.month = moment(element.dataValues.month, "MM").format("MMMM");
    });
    
    return res
      .status(statusCode.success)
      .send(
        successResponseFunc(
          "Here is the Employee's Salary Data.",
          statusCode.success,
          constants.SUCCESS,
          employeeSalary
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
  getSalaryDetails,
  getSalaryById,
  getAllEmployeeMonthlySalary,
  getAllSalaryByEmployeeId,
};
