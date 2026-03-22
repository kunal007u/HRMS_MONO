"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "leaveBalances",
      [
        {
          id: "f66dcc4d-a95b-430e-944b-692f16d5183f",
          balance: 0.0,
          employeeId:"25c9cb79-615f-4720-bb52-cb221032957b",
          paidLeave:0.0,
          lossOfPay:0.0,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "fa9fb22b-b65c-4f58-9cff-ec0eef426771",
          balance: 0.0,
          employeeId:"9df6d49e-16f8-4eb9-8079-0d5d76a62cfd",
          paidLeave:0.0,
          lossOfPay:0.0,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "84e9fbcc-a55a-4884-bf61-3e6af71a50e5",
          balance: 0.0,
          employeeId:"3f23b495-8f73-43b9-b15f-13858fcfcbe0",
          paidLeave:0.0,
          lossOfPay:0.0,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("leaveBalances", null, {});
  },
};
