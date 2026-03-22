const db = require("../../config/database");

const Attendance = db.sequelize.define("attendances", {
  id: {
    type: db.Sequelize.DataTypes.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  date: {
    type: db.Sequelize.DataTypes.DATEONLY,
  },
  employeeCode: {
    type: db.Sequelize.DataTypes.STRING,
  },
  employeeName: {
    type: db.Sequelize.DataTypes.STRING,
  },
  inTime: {
    type: db.Sequelize.DataTypes.TIME,
  },
  outTime: {
    type: db.Sequelize.DataTypes.TIME,
  },
  inDuration: {
    type: db.Sequelize.DataTypes.TIME,
  },
  outDuration: {
    type: db.Sequelize.DataTypes.TIME,
  },
  lateBy: {
    type: db.Sequelize.DataTypes.TIME,
  },
  earlyBy: {
    type: db.Sequelize.DataTypes.TIME,
  },
  status: {
    type: db.Sequelize.DataTypes.ENUM("Absent", "Present"),
    defaultValue: "Absent",
  },
  punchRecords: {
    type: db.Sequelize.DataTypes.STRING,
  },
  overtime: {
    type: db.Sequelize.DataTypes.TIME,
  },
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

module.exports = Attendance;
