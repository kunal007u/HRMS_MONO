const db = require("../../config/database");

const Permission = db.sequelize.define("permissions", {
  id: {
    type: db.Sequelize.DataTypes.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  canCreate: {
    type: db.Sequelize.DataTypes.BOOLEAN,
    defaultValue: false,
  },
  canRead: {
    type: db.Sequelize.DataTypes.BOOLEAN,
    defaultValue: false,
  },
  canUpdate: {
    type: db.Sequelize.DataTypes.BOOLEAN,
    defaultValue: false,
  },
  canDelete: {
    type: db.Sequelize.DataTypes.BOOLEAN,
    defaultValue: false,
  },
  roleId: {
    type: db.Sequelize.DataTypes.UUID,
    references: {
      model: "roles",
      key: "id",
    },
  },
  routeId: {
    type: db.Sequelize.DataTypes.UUID,
    references: {
      model: "routes",
      key: "id",
    },
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
}, {
  indexes: [
    {
      unique: true,
      fields: ['roleId', 'routeId'],
    },
  ],
});

Permission.associate = (models) => {
  Permission.belongsTo(models.Role);
  Permission.belongsTo(models.Route);
};

module.exports = Permission;