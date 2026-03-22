const db = require("../../config/database");

const Policy = db.sequelize.define(
  "policies",
  {
    id: {
      type: db.Sequelize.DataTypes.UUID,
      defaultValue: db.Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: db.Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: db.Sequelize.DataTypes.TEXT,
      allowNull: false,
    },
    policyFile: {
      type: db.Sequelize.DataTypes.STRING,
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

module.exports = Policy;
