const db = require("../../config/database");

const Designation = db.sequelize.define("designations", {
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
    beforeDestroy: (designation, options) => {
      designation.isActive = false;
      return designation.save();
    }
  }
});

module.exports = Designation;
