const db = require("../../config/database");

const EmergencyContacts = db.sequelize.define("emergencyContacts", {
  id: {
    type: db.Sequelize.DataTypes.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  primaryName: db.Sequelize.DataTypes.STRING,
  primaryRelationship: db.Sequelize.DataTypes.STRING,
  primaryPhoneNo: db.Sequelize.DataTypes.STRING,
  primaryAddress : db.Sequelize.DataTypes.TEXT,
  secondaryName: db.Sequelize.DataTypes.STRING,
  secondRelationship: db.Sequelize.DataTypes.STRING,
  secondaryPhoneNo: db.Sequelize.DataTypes.STRING,
  secondaryAddress : db.Sequelize.DataTypes.TEXT,
  employeeId : db.Sequelize.DataTypes.UUID,
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

EmergencyContacts.associate = (models) => {
    EmergencyContacts.belongsTo(models.Employees, {
    foreignKey: "employeeId",
    onDelete: "CASCADE",
  });
};

module.exports = EmergencyContacts;
