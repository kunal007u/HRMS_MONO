const db = require("../../config/database");


const Holiday = db.sequelize.define("holidays", {
  id: {
    type: db.Sequelize.DataTypes.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: db.Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: db.Sequelize.DataTypes.DATEONLY,
    allowNull: false,
  },
  day: {
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
},{
  timestamps: true,
});


module.exports = Holiday;
