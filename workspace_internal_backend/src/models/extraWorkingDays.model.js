const db = require("../../config/database");

const ExtraWorkingDays = db.sequelize.define("extraWorkingDays", {
  id: {
    type: db.Sequelize.DataTypes.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  extraDayDate: {
    type: db.Sequelize.DataTypes.DATEONLY,
    allowNull: false,
  },
  shiftedFromDate: {
    type: db.Sequelize.DataTypes.DATEONLY,
    allowNull: true,
  },
  reason: {
    type: db.Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: db.Sequelize.DataTypes.DATE,
    defaultValue: db.Sequelize.NOW,
    allowNull: false,
  },
  updatedAt: {
    type: db.Sequelize.DataTypes.DATE,
    defaultValue: db.Sequelize.NOW,
    allowNull: false,
  },
});

module.exports = ExtraWorkingDays;