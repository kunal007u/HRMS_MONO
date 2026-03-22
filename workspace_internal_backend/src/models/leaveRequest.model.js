const db = require("../../config/database");

const LeaveRequest = db.sequelize.define("leaveRequests", {
  id: {
    type: db.Sequelize.DataTypes.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  startDate: {
    type: db.Sequelize.DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: db.Sequelize.DataTypes.DATEONLY,
    allowNull: false,
  },
  halfLeaveDate: {
    type: db.Sequelize.DataTypes.DATEONLY,
    allowNull: true,
  },
  numberOfDays: {
    type: db.Sequelize.DataTypes.DECIMAL(10, 1),
    allowNull: false,
  },
  leaveType: {
    type: db.Sequelize.DataTypes.ENUM("Casual Leave", "Sick Leave", "Privilege Leave"),
    allowNull: false,
    defaultValue: "Casual Leave",
  },
  balance: {
    type: db.Sequelize.DataTypes.DECIMAL(10, 1),
    defaultValue: 0,
    allowNull: false,
  },
  reason: {
    type: db.Sequelize.DataTypes.TEXT,
    allowNull: false,
  },
  approvedBy: {
    type: db.Sequelize.DataTypes.UUID,
    allowNull: true,
  },
  status: {
    type: db.Sequelize.DataTypes.ENUM(
      "pending",
      "approved",
      "rejected",
      "cancelled"
    ),
    defaultValue: "pending",
    allowNull: false,
  },
  remark: {
    type: db.Sequelize.DataTypes.TEXT,
    allowNull: true,
  },
  employeeId: db.Sequelize.DataTypes.UUID,
  isActive: {
    type: db.Sequelize.DataTypes.BOOLEAN,
    defaultValue: true,
  },
  paidLeave: {
    type: db.Sequelize.DataTypes.DECIMAL(10, 1),
    defaultValue: 0.0,
    allowNull: false,
  },
  lossOfPay: {
    type: db.Sequelize.DataTypes.DECIMAL(10, 1),
    defaultValue: 0.0,
    allowNull: false,
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
},{
  timestamps: true
});

LeaveRequest.associate = (models) => {
  LeaveRequest.belongsTo(models.Employees, {
    foreignKey: "employeeId",
    onDelete: "CASCADE",
  });
  LeaveRequest.belongsTo(models.Employees, {
    foreignKey: "approvedBy",
    as: "approver",
    onDelete: "CASCADE",
  });
  LeaveRequest.hasMany(models.LeaveInfo, {
    foreignKey: "leaveId",
  });
};

module.exports = LeaveRequest;
