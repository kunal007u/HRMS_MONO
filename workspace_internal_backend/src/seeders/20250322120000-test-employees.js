'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash the password "Test@123" for all test users
    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync('Test@123', salt);

    await queryInterface.bulkInsert(
      "employees",
      [
        {
          id: "a1234567-1234-1234-1234-123456789abc",
          firstName: "John",
          email: "john.doe@example.com",
          middleName: "K",
          lastName: "Doe",
          dateOfJoining: "2024-01-01",
          phoneNumber: "9876543210",
          departmentId: "91c1f9a3-b171-430f-b833-5a46a9334015", // Admin
          designationId: "f70e9f56-c4c6-44a6-b7fe-07a098e55336",
          pancardNo: "AABPM5055K",
          aadharNo: "123456789012",
          uanNo: "768736hjf",
          workLocation: "Ahmedabad",
          pfNo: "625321tghn",
          gender: "male",
          roleId: "6e5f9a85-db29-4960-bba9-74a334fb3731", // SUPER ADMIN
          currentAddress: "123 Main St, Ahmedabad",
          permanentAddress: "123 Main St, Ahmedabad",
          reportTo: "a1234567-1234-1234-1234-123456789abc",
          profilePicture: "",
          isProbationCompleted: true,
          password: hashedPassword,
          deletedAt: null,
          emergencyContact: "9876543211",
          passportNumber: "N1234567",
          fatherName: "Robert Doe",
          motherName: "Mary Doe",
          nationality: "Indian",
          experience: 5,
          qualification: "B.E. in Computer Science",
          employee_code: "EMP001",
          employeeType: "permanent",
          sessionId: null,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "a1234567-1234-1234-1234-123456789abd",
          firstName: "Sarah",
          email: "sarah.smith@example.com",
          middleName: "M",
          lastName: "Smith",
          dateOfJoining: "2024-02-15",
          phoneNumber: "9876543211",
          departmentId: "95063a4f-2e21-44ab-9686-dce5c95778f1", // IT
          designationId: "f70e9f56-c4c6-44a6-b7fe-07a098e55336",
          pancardNo: "BBBPM5055K",
          aadharNo: "234567890123",
          uanNo: "768736hjg",
          workLocation: "Ahmedabad",
          pfNo: "625321tgho",
          gender: "female",
          roleId: "6e5f9a85-db29-4960-bba9-74a334fb3731",
          currentAddress: "456 Oak Ave, Ahmedabad",
          permanentAddress: "456 Oak Ave, Ahmedabad",
          reportTo: "a1234567-1234-1234-1234-123456789abc",
          profilePicture: "",
          isProbationCompleted: true,
          password: hashedPassword,
          deletedAt: null,
          emergencyContact: "9876543212",
          passportNumber: "N1234568",
          fatherName: "James Smith",
          motherName: "Patricia Smith",
          nationality: "Indian",
          experience: 3,
          qualification: "B.Tech in Information Technology",
          employee_code: "EMP002",
          employeeType: "permanent",
          sessionId: null,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "a1234567-1234-1234-1234-123456789abe",
          firstName: "Michael",
          email: "michael.johnson@example.com",
          middleName: "A",
          lastName: "Johnson",
          dateOfJoining: "2024-03-10",
          phoneNumber: "9876543212",
          departmentId: "af312ff9-7d4d-4144-88f7-0a627d4f9ee5", // Finance
          designationId: "f70e9f56-c4c6-44a6-b7fe-07a098e55336",
          pancardNo: "CCCPM5055K",
          aadharNo: "345678901234",
          uanNo: "768736jhi",
          workLocation: "Ahmedabad",
          pfNo: "625321tghp",
          gender: "male",
          roleId: "6e5f9a85-db29-4960-bba9-74a334fb3731",
          currentAddress: "789 Pine Rd, Ahmedabad",
          permanentAddress: "789 Pine Rd, Ahmedabad",
          reportTo: "a1234567-1234-1234-1234-123456789abc",
          profilePicture: "",
          isProbationCompleted: false,
          password: hashedPassword,
          deletedAt: null,
          emergencyContact: "9876543213",
          passportNumber: "N1234569",
          fatherName: "Charles Johnson",
          motherName: "Linda Johnson",
          nationality: "Indian",
          experience: 2,
          qualification: "MBA Finance",
          employee_code: "EMP003",
          employeeType: "permanent",
          sessionId: null,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("employees", {
      email: {
        [Sequelize.Op.in]: [
          "john.doe@example.com",
          "sarah.smith@example.com",
          "michael.johnson@example.com"
        ]
      }
    }, {});
  },
};
