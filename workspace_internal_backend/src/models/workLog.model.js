const db = require("../../config/database");
const { Sequelize } = db


const WorkLogs = db.sequelize.define("workLogs", {
    id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
    },
    projectId: {
        type: db.Sequelize.DataTypes.UUID,
        references: {
            model: "projects",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    employeeId: {
        type: db.Sequelize.DataTypes.UUID,
        references: {
            model: "employees",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    workHour: {
        type: db.Sequelize.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: db.Sequelize.DataTypes.TEXT,
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
    }
})


WorkLogs.associate = (models) => {
    WorkLogs.belongsTo(models.Projects, {
        foreignKey: "projectId",
        // as: 'project'
    })
    WorkLogs.belongsTo(models.Employees, {
        foreignKey: 'employeeId',
        // as: 'employees'
    })
}

module.exports = WorkLogs