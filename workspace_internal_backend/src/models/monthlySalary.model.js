const db = require("../../config/database");
const { Sequelize } = db;

const MonthlySalary = db.sequelize.define('monthlySalary', {
    id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: db.Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    employeeId: {
        type: Sequelize.DataTypes.UUID,
        references: {
            model: "employees",
            key: "id",
        }
    },
    month: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false

    },
    totalWorkingDays: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    leaveDays: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false
    },
    presentDays: {
        type: Sequelize.DataTypes.FLOAT
    },
    bonus: {
        type: Sequelize.DataTypes.FLOAT,
        defaultValue: 0
    },
    totalSalary: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false
    },
    paidSalary: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true
    },
    salaryPaidAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true
    },
    isVerified: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
    },
    verifiedBy: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
    },
    remarks: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true
    },
    deletedAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: null,
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
    }

}, {
    tableName: 'monthlySalary',
})


MonthlySalary.associate = (models) => {
    MonthlySalary.belongsTo(models.Employees, {
        foreignKey: "employeeId",
    });
};


module.exports = MonthlySalary