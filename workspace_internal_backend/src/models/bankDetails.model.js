const db = require("../../config/database");
const { Sequelize } = db;
const BankDetails = db.sequelize.define("bankDetails", {
  id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  employeeId: {
    type: Sequelize.DataTypes.UUID,
    references: {
      model: "employees",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  bankName: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  branchName: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  accountNo: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  IFSC: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: db.Sequelize.DataTypes.BOOLEAN,
    defaultValue: true,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  deletedAt: {
    allowNull: true,
    type: Sequelize.DataTypes.DATE,
  },
},{
  paranoid: true,
  timestamps: true
});

BankDetails.associate = (models) => {
  BankDetails.belongsTo(models.Employees, {
    foreignKey: "employeeId",
  });
};

module.exports = BankDetails;
