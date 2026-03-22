const db = require("../../config/database");

const Route = db.sequelize.define("routes", {
  id: {
    type: db.Sequelize.DataTypes.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  parentRouteId: {
    type: db.Sequelize.DataTypes.UUID,
    allowNull: true,
  },
  childRouteId: {
    type: db.Sequelize.DataTypes.UUID,
    allowNull: true,
  },
  name: db.Sequelize.DataTypes.STRING,
  priority: {
    type: db.Sequelize.DataTypes.INTEGER,
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

Route.associate = (models) => {
  Route.belongsToMany(models.Role, {
    through: models.Permission,
    onDelete: "CASCADE",
  });

  Route.hasMany(models.Route, {
    foreignKey: "parentRouteId",
    as: "childRoutes",
    allowNull: true,
  });

  Route.hasMany(models.Route, {
    foreignKey: "childRouteId",
    as: "subChildRoutes",
    allowNull: true,
  });
};

module.exports = Route;