const db = require("../../config/database");
const { Sequelize } = db;

const Projects = db.sequelize.define(
  "projects",
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    projectName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    projectManager: {
        type: Sequelize.DataTypes.UUID,
        allowNull: true
    },
    startDate: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    endDate: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: Sequelize.DataTypes.BOOLEAN,
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
  },
  {
    paranoid: true,
    timestamps: true,
    hooks: {
      beforeDestroy: (project, options) => {
        project.isActive = false;
        return project.save();
      },
    },
  }
);

Projects.associate = (models) => {
  Projects.hasMany(models.WorkLogs, {
    foreignKey: "projectId",
  });
  Projects.belongsTo(models.Employees, {
    foreignKey: "projectManager",
    onDelete: "CASCADE",
  });
};
module.exports = Projects;
