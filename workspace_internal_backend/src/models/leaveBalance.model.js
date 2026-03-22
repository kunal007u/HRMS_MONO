const db = require("../../config/database");

const LeaveBalance = db.sequelize.define("leaveBalances", {
  id: {
    type: db.Sequelize.DataTypes.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  balance: {
    type: db.Sequelize.DataTypes.DECIMAL(10, 1),
    allowNull: false,
  },
  employeeId: db.Sequelize.DataTypes.UUID,
  paidLeave: {
    type: db.Sequelize.DataTypes.DECIMAL(10, 1),
    defaultValue: 0,
    allowNull: false,
  },
  lossOfPay: {
    type: db.Sequelize.DataTypes.DECIMAL(10, 1),
    defaultValue: 0,
    allowNull: false,
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

LeaveBalance.associate = (models) => {
  LeaveBalance.belongsTo(models.Employees, {
    foreignKey: "employeeId",
    onDelete: "CASCADE",
  });
};

module.exports = LeaveBalance;
