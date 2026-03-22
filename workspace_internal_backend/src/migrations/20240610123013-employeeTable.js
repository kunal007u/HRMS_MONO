"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
    await queryInterface.createTable("employees", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        allowNull: false,
        primaryKey: true,
      },
      employee_code: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      middleName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      pancardNo: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      aadharNo: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      uanNo: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      workLocation: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      pfNo: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: Sequelize.DataTypes.ENUM("male", "female"),
        allowNull: false,
      },
      departmentId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: "departments", // Ensure table name is plural here
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      designationId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: "designations", // Ensure table name is plural here
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      reportTo: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: "employees", // Ensure table name is plural here
          key: "id",
        },
        onDelete: "CASCADE",
      },
      profilePicture: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      currentAddress: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      permanentAddress: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      dateOfJoining: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      isProbationCompleted: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        set(value) {
          const salt = bcrypt.genSaltSync(12);
          const hash = bcrypt.hashSync(value, salt);
          this.setDataValue("password", hash);
        },
      },
      roleId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: "roles", // Ensure table name is plural here
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      emergencyContact: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      pincode: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      nationality: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      dateOfBirth: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
      experience: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true,
      },
      qualification: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      passportNumber: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      fatherName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      motherName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      sessionId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("employees");
  },
};
