const {
  Employees,
  statusCode,
  constants,
  errorResponseFunc,
  BankDetails,
  EmergencyContacts,
  EmployeeDocuments,
  ExperienceDetails,
  Assets,
  Department,
  Designation,
  successResponseFunc,
  AWS_URL,
  bcrypt,
  Role,
  models,
  Op,
  logger,
  Sequelize,
  EmployeeLogDetails,
  LeaveRequest,
  moment,
  literal,
  fn,
  col,
  employeeMonthlyAttendance,
  fetchMonthlyAttendance,
} = require("./employeePackageCentral");


const getAllEmployeesData = async (req, res) => {
  try {
    const role = req.roleName;
    let employeeName = req.query.employeeName?.trim().replace(/^"|"$/g, "");
    let { month, year } = req.query;

    if (month && month.length === 1) {
      month = month.padStart(2, '0');
    };

    let startDate, endDate;
    if (month && year) {
      startDate = moment(`${year}-${month}-01`)
        .startOf("month")
        .format("YYYY-MM-DD");
      endDate = moment(startDate).endOf("month").format("YYYY-MM-DD");
    } else if (year) {
      startDate = moment(`${year}-01-01`).startOf("year").format("YYYY-MM-DD");
      endDate = moment(startDate).endOf("year").format("YYYY-MM-DD");
    } else if (month) {
      const currentYear = moment().year();
      startDate = moment(`${currentYear}-${month}-01`)
        .startOf("month")
        .format("YYYY-MM-DD");
      endDate = moment(startDate).endOf("month").format("YYYY-MM-DD");
    } else {
      const currentMonth = moment().format("MM");
      const currentYear = moment().year();
      startDate = moment(`${currentYear}-${currentMonth}-01`)
        .startOf("month")
        .format("YYYY-MM-DD");
      endDate = moment(startDate).endOf("month").format("YYYY-MM-DD");
    }
    
    let whereClause = {
      isActive: constants.ACTIVE,
      id: {
        [Op.not]: req.loggersId,
      },
    };
    if (employeeName) {
      whereClause[Op.or] = [
        Sequelize.where(
          Sequelize.fn(
            "concat",
            Sequelize.col("employees.firstName"),
            " ",
            Sequelize.col("employees.lastName")
          ),
          {
            [Op.iLike]: `%${employeeName}%`,
          }
        ),
        { firstName: { [Op.iLike]: `%${employeeName}%` } },
        { lastName: { [Op.iLike]: `%${employeeName}%` } },
      ];
    }

    let roleWhereClause = {};
    if (role === constants.ADMIN) {
      // No role filtering needed for SUPER ADMIN
    } else if (role === constants.HR) {
      roleWhereClause = {
        name: {
          [Op.notIn]: [constants.ADMIN],
        },
      };
    } else if (role === constants.EMPLOYEE) {
      roleWhereClause = {
        name: {
          [Op.notIn]: [constants.ADMIN, constants.HR],
        },
      };
    }

    await Employees.findAll({
      where: whereClause,
      attributes: [
        "id",
        "employee_code",
        "firstName",
        "lastName",
        "middleName",
        "departmentId",
        "employeeType",
        "probationEndDate",
        "reportTo",
        [
          literal(`'${AWS_URL}/thumbnails/' || "employees"."profilePicture"`),
          "profilePicture",
        ],
      ],
      include: [
        {
          model: Role,
          attributes: ["id", "name"],
          as: "role",
          where: roleWhereClause,
        },
        {
          model: Department,
          attributes: ["id", "name"],
          as: "department",
        },
        {
          model: Employees,
          attributes: ["id", "firstName", "lastName"],
          as: "reportToPerson",
        },
      ],
      order : [['firstName', 'ASC']]
    })
      .then(async (data) => {
        let allEmployees = [];
        let details;
        for (let employee of data) {
          details = await fetchMonthlyAttendance(
            employee,
            startDate,
            endDate,
          );
          if (details) {
            allEmployees.push(details);
          }
        }
        let allData = {
          totalWorkingDays: details.totalWorkingDays,
          allEmployees,
        };
        return res
          .status(statusCode.success)
          .send(
            successResponseFunc(
              "Here is the Employee's data.",
              statusCode.success,
              constants.SUCCESS,
              allData
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

const getByIdEmployeesData = async (req, res) => {
  try {
    const employeeId = req.params.id ? req.params.id : req.loggersId;

    const getAllEmployeeDetails = await Employees.findOne({
      where: {
        id: employeeId,
        isActive: constants.ACTIVE,
      },
      attributes: [
        "id",
        "firstName",
        "lastName",
        "middleName",
        "pancardNo",
        "aadharNo",
        "uanNo",
        "workLocation",
        "pfNo",
        "email",
        "dateOfJoining",
        "gender",
        "phoneNumber",
        "employeeType",
        "probationEndDate",
        "departmentId",
        "designationId",
        "reportTo",
        [literal(`'${AWS_URL + "/"}' || "profilePicture"`), "profilePicture"],
        "currentAddress",
        "permanentAddress",
        "roleId",
        "isActive",
        "emergencyContact",
        "passportNumber",
        "fatherName",
        "motherName",
        "dateOfBirth",
        "nationality",
        "experience",
        "qualification",
        "employee_code",
      ],
      include: [
        {
          model: EmployeeDocuments,
          attributes: [
            "id",
            [literal(`'${AWS_URL + "/"}' || "tenMarksheet"`), "tenMarksheet"],
            [
              literal(`'${AWS_URL + "/"}' || "twelveMarksheet"`),
              "twelveMarksheet",
            ],
            [
              literal(`'${AWS_URL + "/"}' || "passbook"`),
              "passbook",
            ],
            [
              literal(`'${AWS_URL + "/"}' || "degreeMarksheet"`),
              "degreeMarksheet",
            ],
            [literal(`'${AWS_URL + "/"}' || "adharCard"`), "adharCard"],
            [literal(`'${AWS_URL + "/"}' || "panCard"`), "panCard"],
            [literal(`'${AWS_URL + "/"}' || "salarySlip1"`), "salarySlip1"],
            [literal(`'${AWS_URL + "/"}' || "salarySlip2"`), "salarySlip2"],
            [literal(`'${AWS_URL + "/"}' || "salarySlip3"`), "salarySlip3"],
            [
              literal(`'${AWS_URL + "/"}' || "probationComplitionLetter"`),
              "probationComplitionLetter",
            ],
            [
              literal(`'${AWS_URL + "/"}' || "appointmentLetter"`),
              "appointmentLetter",
            ],
          ],
        },
        {
          model: BankDetails,
          attributes: [
            "bankName",
            "accountNo",
            "IFSC",
            "branchName",
            "isActive",
            "employeeId",
          ],
        },
        {
          model: Designation,
          as: "designations",
          attributes: ["name"],
        },
        {
          model: Department,
          as: "department",
          attributes: ["name"],
        },
        {
          model: EmergencyContacts,
          as: "emergencyContacts",
          attributes: [
            "primaryName",
            "primaryRelationship",
            "primaryPhoneNo",
            "primaryAddress",
            "secondaryName",
            "secondRelationship",
            "secondaryPhoneNo",
            "secondaryAddress",
            "employeeId",
          ],
        },
        {
          model: ExperienceDetails,
          attributes: [
            "companyName",
            "designation",
            "location",
            "periodFrom",
            "periodTo",
            "experienceId",
            "employeeId",
          ],
        },
        {
          model: Assets,
          attributes: [
            "assetsName",
            "assetsId",
            "assignedDate",
            "employeeId",
            "quantity",
            "description",
          ],
        },
      ],
    });
    if (!getAllEmployeeDetails) {
      logger.warn(
        errorResponseFunc(
          "Employee not found.",
          "Employee not found.",
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
      return res
        .status(statusCode.notFound)
        .send(
          errorResponseFunc(
            "Employee not found",
            "Employee not found",
            statusCode.badRequest,
            constants.NOTFOUND
          )
        );
    }

    let reportToFullName;
    if (getAllEmployeeDetails.reportTo) {
      const reportingPerson = await models.Employees.findOne({
        where: {
          id: getAllEmployeeDetails.reportTo,
        },
        attributes: [
          [fn("concat", col("firstName"), " ", col("lastName")), "fullName"],
        ],
      });
      reportToFullName = reportingPerson
        ? reportingPerson.dataValues?.fullName
        : null;
    }
    const employeeData = getAllEmployeeDetails.toJSON();

    employeeData.experienceDetails?.map((exp) => {
      exp.periodFrom = moment(exp.periodFrom).format("YYYY-MM-DD");
      let lastDate = exp.periodTo ? moment(exp.periodTo).format("YYYY-MM-DD"): moment().format("YYYY-MM-DD");
      const durationInMonths = moment(lastDate).diff(exp.periodFrom, "months");
      const years = Math.floor(durationInMonths / 12);
      const months = durationInMonths % 12;

      if(lastDate === moment().format("YYYY-MM-DD")) {
        exp.isPresent = true;
      }
    
      if (durationInMonths < 12) {
        exp.duration = `${durationInMonths} month${durationInMonths !== 1 ? 's' : ''}`;
      } else {
        exp.duration = `${years} year${years !== 1 ? 's' : ''}${months > 0 ? ` ${months} month${months !== 1 ? 's' : ''}` : ''}`;
      }
    });

    const emergencyContact = employeeData.emergencyContacts || {};
    const bankDetail = employeeData.bankDetail || {};
    const experienceDetails = employeeData.experienceDetails || [];
    const employeeDocuments = employeeData.employeeDocument || {};
    const assets = employeeData.assets || {};

    const data = {
      employee: {
        id: employeeData.id,
        firstName: employeeData.firstName,
        employeeType: employeeData.employeeType,
        probationEndDate: employeeData.probationEndDate,
        lastName: employeeData.lastName,
        pancardNo: employeeData.pancardNo,
        middleName: employeeData.middleName,
        aadharNo: employeeData.aadharNo,
        uanNo: employeeData.uanNo,
        workLocation: employeeData.workLocation,
        pfNo: employeeData.pfNo,
        email: employeeData.email,
        dateOfJoining: employeeData.dateOfJoining,
        gender: employeeData.gender,
        phoneNumber: employeeData.phoneNumber,
        departmentId: employeeData.departmentId,
        designationId: employeeData.designationId,
        profilePicture: employeeData.profilePicture,
        currentAddress: employeeData.currentAddress,
        permanentAddress: employeeData.permanentAddress,
        roleId: employeeData.roleId,
        isActive: employeeData.isActive,
        emergencyContact: employeeData.emergencyContact,
        passportNumber: employeeData.passportNumber,
        fatherName: employeeData.fatherName,
        motherName: employeeData.motherName,
        dateOfBirth: employeeData.dateOfBirth,
        nationality: employeeData.nationality,
        experience: employeeData.experience,
        qualification: employeeData.qualification,
        reportTo: reportToFullName,
        reportToId: employeeData.reportTo,
        designationName: employeeData.designations
          ? employeeData.designations.name
          : null,
        departmentName: employeeData.department
          ? employeeData.department.name
          : null,
        employeeCode: employeeData.employee_code,
      },
      documents: employeeDocuments,
      bankDetails: bankDetail,
      emergencyContacts: emergencyContact,
      experienceDetails: experienceDetails,
      assets: assets,
    };

    return res
      .status(statusCode.success)
      .send(
        successResponseFunc(
          "Here is the Employees Data's data.",
          statusCode.success,
          constants.SUCCESS,
          data
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
    res
      .status(500)
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
  getAllEmployeesData,
  getByIdEmployeesData,
};
