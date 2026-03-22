const db = require("../../config/database");

const Role = db.sequelize.define("roles", {
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
  deletedAt: {
    allowNull: true,
    type: db.Sequelize.DataTypes.DATE,
  },
},{
  paranoid: true,
  timestamps: true,
  hooks: {
    beforeDestroy: (role, options) => {
      role.isActive = false;
      return role.save();
    }
  }
});

Role.associate = (models) => {
  Role.hasMany(models.Employees, { foreignKey: "roleId"});
  Role.belongsToMany(models.Route, {
    through: models.Permission,
    onDelete: "CASCADE",
  });
};

module.exports = Role;
