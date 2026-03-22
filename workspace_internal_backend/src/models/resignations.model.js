const db = require("../../config/database");

const Resignation = db.sequelize.define(
  "resignations",
  {
    id: {
      type: db.Sequelize.DataTypes.UUID,
      defaultValue: db.Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: db.Sequelize.DataTypes.TEXT,
      allowNull: false,
    },
    employeeId: db.Sequelize.DataTypes.UUID,
    modifiedBy: db.Sequelize.DataTypes.UUID,
    status: {
      type: db.Sequelize.DataTypes.ENUM("pending", "accepted", "rejected"),
      defaultValue: "pending",
      allowNull: false,
    },
    remark: {
      type: db.Sequelize.DataTypes.TEXT,
      allowNull: true,
    },
    acceptedDate: {
      type: db.Sequelize.DataTypes.DATEONLY,  
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
  },
  {
    timestamps: true,
  }
);

Resignation.associate = (models) => {
  Resignation.belongsTo(models.Employees, {
    foreignKey: "employeeId",
    as: "employee",
    onDelete: "CASCADE",
  });
  Resignation.belongsTo(models.Employees, {
    foreignKey: "modifiedBy",
    as: "modifier",
    onDelete: "CASCADE",
  });
};

module.exports = Resignation;
