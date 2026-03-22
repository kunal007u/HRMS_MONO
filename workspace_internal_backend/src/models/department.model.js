const db = require("../../config/database");


const Department = db.sequelize.define("departments", {
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
    beforeDestroy: (department, options) => {
      department.isActive = false;
      return department.save();
    }
  }
});

Department.associate = (models) => {
  Department.hasMany(models.Employees, { foreignKey: "departmentId" })

}

module.exports = Department;
