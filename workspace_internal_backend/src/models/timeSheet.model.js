const db = require("../../config/database");

const TimeSheet = db.sequelize.define("timeSheets", {
  id: {
    type: db.Sequelize.DataTypes.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  employeeName: {
    type: db.Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  employeeId: {
    type: db.Sequelize.DataTypes.UUID,
    references: {
      model: "employees",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  project: {
    type: db.Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: db.Sequelize.DataTypes.TEXT,
    allowNull: false,
  },
  task: {
    type: db.Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  hours: {
    type: db.Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: db.Sequelize.DataTypes.DATE,
    allowNull: false,
  },
  projectTaskLabel: {
    type: db.Sequelize.DataTypes.STRING,
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

TimeSheet.associate = (models) => {
  TimeSheet.belongsTo(models.Employees, {
    foreignKey: "employeeId",
  });
};

module.exports = TimeSheet;
