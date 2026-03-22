const db = require("../../config/database");
const { Sequelize } = db;
const Salary = db.sequelize.define('salary', {
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
    basic: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false
    },
    milestone: {
        type: Sequelize.DataTypes.FLOAT,
        defaultValue: 0
    },
    PF: {
        type: Sequelize.DataTypes.FLOAT,
        defaultValue: 200
    },
    PT: {
        type: Sequelize.DataTypes.FLOAT,
        defaultValue: 0
    },
    totalSalary: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false
    },
    fromDate: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
    },
    toDate: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
    },
    isActive: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
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
    tableName: 'salary',
    paranoid: true,
    timestamps: true,
    hooks: {
        beforeDestroy: (salary, options) => {
            salary.isActive = false;
            return salary.save();
        }
    }
});

Salary.associate = (models) => {
    Salary.belongsTo(models.Employees, {
        foreignKey: "employeeId",
    });
};

module.exports = Salary;
