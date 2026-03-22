const db = require("../../config/database");
const { Sequelize } = db
const EmployeeLogDetails = db.sequelize.define('EmployeeLogDetails', {
    id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: db.Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    employee_code: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false

    },
    log_date: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false

    },
    log_time: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false

    },
    direction: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false

    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    deletedAt: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
    },
    isDeleted: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
    }

});
EmployeeLogDetails.associate = function (models) {

};

module.exports = EmployeeLogDetails
