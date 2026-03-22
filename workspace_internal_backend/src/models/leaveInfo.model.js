const db = require("../../config/database");

const LeaveInfo = db.sequelize.define("leaveInfos", {
  id: {
    type: db.Sequelize.DataTypes.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  date: {
    type: db.Sequelize.DataTypes.DATEONLY,
    allowNull: false,
  },
  workingShift: {
    type: db.Sequelize.DataTypes.ENUM(
      "Holiday",
      "Weekend",
      "Full Day",
      "Half Day"
    ),
    allowNull: false,
  },
  fromTime: {
    type: db.Sequelize.DataTypes.TIME,
    allowNull: true,
  },
  toTime: {
    type: db.Sequelize.DataTypes.TIME,
    allowNull: true,
  },
  leaveId: {
    type: db.Sequelize.DataTypes.UUID,
    allowNull: true,
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

LeaveInfo.associate = (models) => {
  LeaveInfo.belongsTo(models.LeaveRequest, {
    foreignKey: "leaveId",
    onDelete: "CASCADE",
  });
};

module.exports = LeaveInfo;
