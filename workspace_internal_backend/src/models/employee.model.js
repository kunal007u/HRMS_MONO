const db = require("../../config/database");
const bcrypt = require("bcrypt");

const Employees = db.sequelize.define(
  "employees",
  {
    id: {
      type: db.Sequelize.DataTypes.UUID,
      defaultValue: db.Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: db.Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: db.Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: db.Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    pancardNo: {
      type: db.Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    aadharNo: {
      type: db.Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    uanNo: {
      type: db.Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    workLocation: {
      type: db.Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    pfNo: {
      type: db.Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: db.Sequelize.DataTypes.ENUM("male", "female"),
      allowNull: false,
    },
    departmentId: {
      type: db.Sequelize.DataTypes.UUID,
      references: {
        model: "departments",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    designationId: {
      type: db.Sequelize.DataTypes.UUID,
      references: {
        model: "designations",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    reportTo: {
      type: db.Sequelize.DataTypes.UUID,
      references: {
        model: "employees",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    profilePicture: {
      type: db.Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    currentAddress: {
      type: db.Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    permanentAddress: {
      type: db.Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: db.Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    dateOfJoining: {
      type: db.Sequelize.DataTypes.DATEONLY,
      allowNull: false,
    },
    phoneNumber: {
      type: db.Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: db.Sequelize.DataTypes.STRING,
      allowNull: true,
      set(value) {
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue("password", hash);
      },
    },
    roleId: {
      type: db.Sequelize.DataTypes.UUID,
      references: {
        model: "roles",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    isActive: {
      type: db.Sequelize.DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isProbationCompleted: {
      type: db.Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deletedAt: {
      type: db.Sequelize.DataTypes.DATE,
      defaultValue: null,
    },
    emergencyContact: {
      type: db.Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    passportNumber: {
      type: db.Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    fatherName: {
      type: db.Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    motherName: {
      type: db.Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    otp: {
      type: db.Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    otpExpiry: {
      type: db.Sequelize.DataTypes.DATE,
      allowNull: true,
    },
    nationality: {
      type: db.Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    dateOfBirth: {
      type: db.Sequelize.DataTypes.DATE,
      allowNull: true,
    },
    experience: {
      type: db.Sequelize.DataTypes.FLOAT,
      allowNull: true,
    },
    qualification: {
      type: db.Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    employee_code: {
      type: db.Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    sessionId: {
      type: db.Sequelize.DataTypes.UUID,
      allowNull: true,
    },
    employeeType: {
      type: db.Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    probationEndDate: {
      type: db.Sequelize.DataTypes.DATEONLY,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: db.Sequelize.DataTypes.DATE,
      defaultValue: db.Sequelize.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: db.Sequelize.DataTypes.DATE,
      defaultValue: db.Sequelize.NOW,
    },
  },
  {
    paranoid: true,
    timestamps: true,
    hooks: {
      beforeDestroy: (employee, options) => {
        employee.isActive = false;
        return employee.save();
      },
    },
  }
);

Employees.associate = (models) => {
  Employees.belongsTo(models.Role, { foreignKey: "roleId", as: "role" });
  Employees.belongsTo(models.Employees, {
    foreignKey: "reportTo",
    as: "reportToPerson",
  });
  Employees.belongsTo(models.Department, {
    foreignKey: "departmentId",
    as: "department",
  });
  Employees.belongsTo(models.Designation, {
    foreignKey: "designationId",
    as: "designations",
  });

  Employees.hasOne(models.Employees, {
    foreignKey: "reportTo",
    as: "subordinates",
  });
  Employees.hasOne(models.EmployeeDocuments);
  Employees.hasMany(models.Assets);
  Employees.hasOne(models.EmergencyContacts, {
    foreignKey: "employeeId",
    as: "emergencyContacts",
  });
  Employees.hasMany(models.ExperienceDetails, {
    foreignKey: "employeeId",
  });
  Employees.hasOne(models.BankDetails);
  Employees.hasMany(models.WorkLogs, {
    foreignKey: "employeeId",
  });
  Employees.hasMany(models.LeaveRequest, {
    foreignKey: "employeeId",
  });
  Employees.hasOne(models.LeaveRequest, {
    foreignKey: "approvedBy",
    as: "approver",
  });
  Employees.hasOne(models.LeaveBalance, {
    foreignKey: "employeeId",
  });
  Employees.hasMany(models.Projects, {
    foreignKey: "projectManager",
  }),
    Employees.hasMany(models.Salary, {
      foreignKey: "employeeId",
    })
  Employees.hasMany(models.MonthlySalary, {
    foreignKey: "employeeId",
  })
  Employees.hasMany(models.Resignation, {
    foreignKey: "employeeId",
    as: "employee",
  });

  Employees.hasMany(models.Resignation, {
    foreignKey: "modifiedBy",
    as: "modifier",
  });

  Employees.hasMany(models.TimeSheet, {
    foreignKey: "employeeId",
  })

  Employees.hasOne(models.EmployeeMapping, {
    foreignKey: "hrms_employee_id",
  });
};

module.exports = Employees;
