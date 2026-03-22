const db = require("../../config/database");

const LeaveMaster = db.sequelize.define("leaveMasters", {
  id: {
    type: db.Sequelize.DataTypes.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  month:{
    type: db.Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  leaves:{
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


module.exports = LeaveMaster;
