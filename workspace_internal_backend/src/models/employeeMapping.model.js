const db = require("../../config/database");

const EmployeeMapping = db.sequelize.define("employeeMappings", {
  id: {
    type: db.Sequelize.DataTypes.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  odoo_employee_id: {
    type: db.Sequelize.DataTypes.INTEGER,
    allowNull: false,
  },
  hrms_employee_id: {
    type: db.Sequelize.DataTypes.UUID,
    allowNull: false,
    references: {
      model: "employees",
      key: "id",
    },
    onDelete: "CASCADE",
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

EmployeeMapping.associate = (models) => {
  EmployeeMapping.belongsTo(models.Employees, {
    foreignKey: "hrms_employee_id",
  });
};

module.exports = EmployeeMapping;
