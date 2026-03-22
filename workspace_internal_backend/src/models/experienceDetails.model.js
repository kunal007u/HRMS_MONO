const db = require("../../config/database");

const ExperienceDetails = db.sequelize.define("experienceDetails", {
  id: {
    type: db.Sequelize.DataTypes.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  companyName: { type: db.Sequelize.DataTypes.STRING, allowNull: false },
  designation: { type: db.Sequelize.DataTypes.STRING, allowNull: false },
  location: { type: db.Sequelize.DataTypes.STRING, allowNull: false },
  periodFrom: { type: db.Sequelize.DataTypes.DATEONLY, allowNull: false },
  periodTo: { type: db.Sequelize.DataTypes.DATEONLY, allowNull: true },
  employeeId: { type: db.Sequelize.DataTypes.INTEGER, allowNull: false },
  experienceId: { type: db.Sequelize.DataTypes.INTEGER, allowNull: false },
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
  timestamps: true
});

ExperienceDetails.associate = (models) => {
  ExperienceDetails.belongsTo(models.Employees, {
    foreignKey: "employeeId",
    onDelete: "CASCADE",
  });
};

module.exports = ExperienceDetails;
