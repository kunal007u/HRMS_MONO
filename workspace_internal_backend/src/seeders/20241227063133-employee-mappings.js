'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('employeeMappings', [
      {
        // Yash Savaliya
        id: "27e3ddda-b187-464e-bb08-5f60d47d293c",
        odoo_employee_id: 24,
        hrms_employee_id: "407b1858-9417-49db-97e3-3978dbee104a",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // Ankit Malaviya
        id: "86a09add-f7a1-4a4f-989e-32945c7858e4",
        odoo_employee_id: 25,
        hrms_employee_id: "57abe31f-bcfa-4737-8ee9-5fa603e4b0d0",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // Anmol Parsana
        id: "f1b19b3b-f058-440f-90b5-29dba9099178",
        odoo_employee_id: 26,
        hrms_employee_id: "dd18e63c-d44d-4a3c-8ffe-d02677b33d51",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // Arun Tiwari
        id: "466cfca3-5dec-42d0-bb1a-7de85ea6c8f8",
        odoo_employee_id: 27,
        hrms_employee_id: "b296be8f-2911-40b5-b5fb-8c0498015bc0",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // Bhakti Gajipara
        id: "2b05ba7a-eb6d-45f0-a257-20482a4a7b1a",
        odoo_employee_id: 28,
        hrms_employee_id: "bf41bed9-24c2-44b8-bba8-fc9860c7adf3",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // Hemal Gondaliya
        id: "487c0c01-67b4-4ba1-9d51-d75836b4a2d1",
        odoo_employee_id: 29,
        hrms_employee_id: "04d61087-f49c-43d5-a44f-f4109be3e658",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // Het Vaghasiya
        id: "c9928e3a-0f07-4d69-a3a5-800f5c2b17f1",
        odoo_employee_id: 30,
        hrms_employee_id: "02b5c2d8-5c0c-42dc-93c5-0dc23010e169",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // Kaushal Dasadiya
        id: "67d78bc9-89c2-422f-9356-098f5dfed469",
        odoo_employee_id: 32,
        hrms_employee_id: "7a5431fc-5eb6-4701-9c97-699a31a1193b",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // Kunal Mishra
        id: "b2ae3d65-7853-45b3-9bed-ae18972edeb7",
        odoo_employee_id: 33,
        hrms_employee_id: "43deb0ad-54d2-458f-ac86-9e8d51ff3a57",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // Mehul Vamja
        id: "3ae1ded7-5563-4915-b58e-dbed55224551",
        odoo_employee_id: 34,
        hrms_employee_id: "d4c37892-7de8-4ee7-8f04-2f4001d069dc",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // Renish Gajera
        id: "2c9bfe1e-955a-4023-9ec6-9cc97111535c",
        odoo_employee_id: 35,
        hrms_employee_id: "bce2ca45-444d-41b5-80f7-bb81e6376fc1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // Rushin Prajapati
        id: "3fd4589e-e282-4cac-9cbd-e607ccc4447d",
        odoo_employee_id: 36,
        hrms_employee_id: "7f7ee4b7-6649-49f7-844a-a7b899372418",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // Sushmita Gour
        id: "34514d20-69dd-4c9c-84eb-f2e660e5b743",
        odoo_employee_id: 37,
        hrms_employee_id: "eec5d8e2-a462-425c-a1a5-a1b56b641841",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // Vijay Singh Kushawaha
        id: "c6b7bcca-5ed0-49bd-b7b6-47d783e712f5",
        odoo_employee_id: 38,
        hrms_employee_id: "031881ee-68c7-438b-b4c2-9f36cd08be83",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // Aditya Lathiya
        id: "86f35425-3728-4fe7-98f6-a5bf3e5731db",
        odoo_employee_id: 39,
        hrms_employee_id: "2e262d8d-34f8-476e-afe3-2c2fec47f1e1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // Riddhi Malaviya
        id: "aaaa3cd8-7f37-4fcb-81d9-72e17ede73ff",
        odoo_employee_id: 40,
        hrms_employee_id: "c5a287f2-ca75-4811-acc0-c9327d7a4d3e",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // Saumya Desai
        id: "45572a5a-ffff-44db-9fac-171b7eddf6e5",
        odoo_employee_id: 41,
        hrms_employee_id: "dbcc89e1-90f3-49d4-b819-f5163df8c467",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // Dhruvil Pittalia
        id: "6463de6f-b519-46e4-a9e6-edbb740fc0d3",
        odoo_employee_id: 42,
        hrms_employee_id: "c057689a-83ce-49e8-901d-79b1042a082f",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employeeMappings', null, {});
  }
};
