const db = require("../../config/database");

const EmployeeDocuments = db.sequelize.define("employeeDocuments", {
  id: {
    type: db.Sequelize.DataTypes.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  tenMarksheet: {
    type: db.Sequelize.STRING,
    allowNull: true,
  },
  twelveMarksheet: {
    type: db.Sequelize.STRING,
    allowNull: true,
  },
  degreeMarksheet: {
    type: db.Sequelize.STRING,
    allowNull: true,
  },
  adharCard: {
    type: db.Sequelize.STRING,
    allowNull: true,
  },
  panCard: {
    type: db.Sequelize.STRING,
    allowNull: true,
  },
  salarySlip1: {
    type: db.Sequelize.STRING,
    allowNull: true,
  },
  salarySlip2: {
    type: db.Sequelize.STRING,
    allowNull: true,
  },
  salarySlip3: {
    type: db.Sequelize.STRING,
    allowNull: true,
  },
  probationComplitionLetter: {
    type: db.Sequelize.STRING,
    allowNull: true,
  },
  appointmentLetter: {
    type: db.Sequelize.STRING,
    allowNull: true,
  },
  passbook: {
    type: db.Sequelize.STRING,
    allowNull: true,
  },
  employeeId: db.Sequelize.UUID,
  isActive: {
    type: db.Sequelize.DataTypes.BOOLEAN,
    defaultValue: true,
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
});

EmployeeDocuments.associate = (models) => {
  EmployeeDocuments.belongsTo(models.Employees, {
      foreignKey: "employeeId",
      onDelete: "CASCADE",
  });
};

module.exports = EmployeeDocuments;
