const {
  Salary,
  logger,
  errorResponseFunc,
  statusCode,
  constants,
  successResponseFunc,
  responseMessage,
  Sequelize,
  Employees,
  MonthlySalary,
  employeeMonthlyAttendance,
  moment,
  Op,
  fetchMonthlyAttendance
} = require('./salaryPackageCentral')

const addOrUpdate = async (req, res) => {
  try {
        let { employeeId, basic, milestone, pt, pf, totalSalary, fromDate, toDate, id } = req.body

    if (!employeeId || !basic || !fromDate) {
      logger.warn(
        errorResponseFunc(
          "employeeId, basic, and fromDate is required.",
          "Empty fields.",
          statusCode.badRequest,
          constants.BADREQUEST
        )
      );
            return res.status(statusCode.badRequest).send(
          errorResponseFunc(
            "employeeId, basic, and fromDate is required.",
            "Empty fields.",
            statusCode.badRequest,
            constants.BADREQUEST
          )
        );

    }
    milestone = milestone || 0;
    let PF = pf || 0;
    let PT = pt;
    totalSalary = basic - (PF + PT);

    if (!toDate) {
      let fromDateObj = new Date(fromDate);
      toDate = new Date(fromDateObj.setFullYear(fromDateObj.getFullYear() + 1));
    }
    const existingSalary = await Salary.findOne({
      where: {
        employeeId,
        fromDate: {
                    [Sequelize.Op.eq]: new Date(fromDate)
        },
        toDate: {
                    [Sequelize.Op.eq]: new Date(toDate)
                }
            }
    });


    if (existingSalary && (!id || existingSalary.id !== id)) {
      logger.warn(
        errorResponseFunc(
          "Salary record with the same employeeId, fromDate, and toDate already exists.",
          "Duplicate record.",
          statusCode.conflict,
          constants.CONFLICT
        )
      );
            return res.status(statusCode.conflict).send(
          errorResponseFunc(
            "Salary record with the same employeeId, fromDate, and toDate already exists.",
            "Duplicate record.",
            statusCode.conflict,
            constants.CONFLICT
          )
        );
    }


    if (id) {
      const employeeSalary = await Salary.findOne({ where: { id } });
      if (!employeeSalary) {
        logger.warn(
          errorResponseFunc(
            "employeeSalary not found.",
            responseMessage.notFound,
            statusCode.notFound,
            constants.NOTFOUND
          )
        );
                return res.status(statusCode.notFound).send(
            errorResponseFunc(
              "employeeSalary not found",
              responseMessage.notFound,
              statusCode.notFound,
              constants.NOTFOUND
            )
          );
      }
            await Salary.update({
          basic,
          milestone,
          PF,
          PT,
          totalSalary,
          fromDate,
                toDate
            }, {
                where: { id }
            });
            return res.status(statusCode.created).send(
          successResponseFunc(
            "Salary updated successfully.",
            statusCode.created,
            constants.SUCCESS
          )
        );
    } else {
      const createSalary = await Salary.create({
        employeeId,
        basic,
        milestone,
        PF,
        PT,
        totalSalary,
        fromDate,
        toDate
      });
            return res.status(statusCode.success).send(
          successResponseFunc(
            "Salary Created successfully.",
            statusCode.success,
            constants.SUCCESS,
            createSalary
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


const createMonthlySalary = async (req, res) => {
  try {
      let { salary, month, year } = req.body;
      if (!month || !year) {
          const previousMonth = moment().subtract(1, 'month');
          month = previousMonth.format('MM');
          year = previousMonth.format('YYYY');
      }else{
          month = month.toString().padStart(2, '0');
      }

      const findMonthData = await MonthlySalary.findAll({ where: { month: month, year: year } });
      if (findMonthData.length) {
          logger.warn(
              errorResponseFunc(
                  `Salary for ${moment(month, "MM").format('MMMM')} ${year} has already been calculated.`,
                  "Already Calculated",
                  statusCode.badRequest,
                  constants.BADREQUEST
              )
          );
          return res.status(statusCode.badRequest).send(
              errorResponseFunc(
                  `Salary for ${moment(month, "MM").format('MMMM')} ${year} has already been calculated.`,
                  "Already Calculated",
                  statusCode.badRequest,
                  constants.BADREQUEST
              )
          );
      }

      let startDate = moment(`${year}-${month}-01`).startOf("month").format("YYYY-MM-DD");
      let endDate = moment(startDate).endOf("month").format("YYYY-MM-DD");

      let getAllEmployees = await Employees.findAll({
          where: { isActive: constants.ACTIVE },
          include: {
              model: Salary,
              attributes: ['id', 'basic', 'PF', 'PT', 'totalSalary', 'fromDate', 'toDate'],
              where: {
                  [Op.and]: [
                      { fromDate: { [Op.lte]: endDate } },
                      { toDate: { [Op.gte]: startDate } }
                  ]
              },
              order: [['toDate', 'DESC']]
          }
      });

      let result = [];
      
      for (let employee of getAllEmployees) {
          employee = await fetchMonthlyAttendance(employee, startDate, endDate);
          let basic = 0, PF = 0, PT = 0, employeeBonus = 0;
          if (employee.salaries && employee.salaries.length > 0) {
              basic = employee.salaries[0].basic || 0;
              PF = employee.salaries[0].PF || 0;
              PT = employee.salaries[0].PT || 0;
          }

          const bonusEntry = (salary && salary.length) ? salary.find(item => item.employeeId === employee.id) : 0;
          if (bonusEntry) {
              employeeBonus = bonusEntry.bonus || 0;
          }
          let presentDays = employee.presentDays;
          let totalSalaryOfMonth = 0;
          if (presentDays === 0) {
              totalSalaryOfMonth = 0;
          } else {
              const dailySalary = basic / employee.totalWorkingDays;
              totalSalaryOfMonth = (dailySalary * presentDays ) + employeeBonus - (PF + PT);
          }

          let monthSalary = await MonthlySalary.create({
              employeeId: employee.id,
              month: month,
              year: year,
              totalSalary: Math.round(totalSalaryOfMonth),
              totalWorkingDays: employee.totalWorkingDays,
              presentDays: presentDays,
              leaveDays: employee.leaveDays,
              bonus: employeeBonus
          });

          result.push(monthSalary);
      }

      return res.status(statusCode.success).send(
          successResponseFunc(
              "Salary created successfully.",
              statusCode.success,
              constants.SUCCESS,
              result
          )
      );

  } catch (err) {
      return res.status(statusCode.serverError || 500).send(
          errorResponseFunc(
              "An error occurred while calculating the monthly salary.",
              "Server Error",
              statusCode.serverError || 500,
              constants.SERVERERROR
          )
      );
  }
};

const PaidEmployeeMonthlySalary = async (req, res) => {
  try {
    const monthlySalaryId = req.params.id;
    const { salary } = req.body;
    if (!monthlySalaryId || !salary) {
      logger.warn(
        errorResponseFunc(
          "monthlySalaryId and salary is required.",
          "Empty fields.",
          statusCode.badRequest,
          constants.BADREQUEST
        )
      );
      return res
        .status(statusCode.badRequest)
        .send(
          errorResponseFunc(
            "monthlySalaryId and salary is required.",
            "Empty fields.",
            statusCode.badRequest,
            constants.BADREQUEST
          )
        );
    }

    const monthlySalary = await MonthlySalary.findByPk(monthlySalaryId);
    if (!monthlySalary) {
      logger.warn(
        errorResponseFunc(
          "monthlySalary not found.",
          responseMessage.notFound,
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
      return res
        .status(statusCode.notFound)
        .send(
          errorResponseFunc(
            "monthlySalary not found",
            responseMessage.notFound,
            statusCode.notFound,
            constants.NOTFOUND
          )
        );
    }
    const paidSalary = await monthlySalary.update({
      paidSalary: salary,
      salaryPaidAt: new Date(),
    });
    return res
      .status(statusCode.success)
      .send(
        successResponseFunc(
          "Monthly Salary Paid successfully.",
          statusCode.success,
          constants.SUCCESS,
          paidSalary
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
  addOrUpdate,
  createMonthlySalary,
  PaidEmployeeMonthlySalary,
};
