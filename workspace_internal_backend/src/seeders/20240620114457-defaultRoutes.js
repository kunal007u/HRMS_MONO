module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('routes', [
          {
              id: "30197083-e969-4797-8e27-2a44d97c380a", // 1
              parentRouteId: null,
              childRouteId: null,
              name: "Admin Dashboard",
              priority : 1,
              isActive : true,
              createdAt: new Date(),
              updatedAt: new Date(),
          },
          {
              id: "82e6e6e3-d763-4da6-a305-dcd2c5bb7909", // 2
              parentRouteId: null,
              childRouteId: null,
              name: "Employee Dashboard",
              priority : 2,
              isActive : true,
              createdAt: new Date(),
              updatedAt: new Date(),
          },
          {
              id: "0a8ee2b1-4534-4fd8-a99d-e63116b3a257", // 3
              parentRouteId: null,
              childRouteId: null,
              name: "Employee",
              priority : 3,
              isActive : true,
              createdAt: new Date(),
              updatedAt: new Date(),
          },
          {
              id: "2ee0fb3e-41e4-4da3-97a5-6a8b5b3ece1b", // 4
              parentRouteId: "0a8ee2b1-4534-4fd8-a99d-e63116b3a257",
              childRouteId: null,
              name: "Personal Details",
              priority: 1,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "79e0a2c0-35f6-4ac0-a600-520cf7f5530d", // 5
              parentRouteId: "0a8ee2b1-4534-4fd8-a99d-e63116b3a257", 
              childRouteId: null,
              name: "All Employees",
              priority: 2,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "f737aa19-9106-46e0-a272-73306b7d1721", // 6
              parentRouteId: "0a8ee2b1-4534-4fd8-a99d-e63116b3a257", 
              childRouteId: null,
              name: "Attendance",
              priority: 3,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "b4f313f0-4a24-46ad-9644-615b552ed8af", // 7
              parentRouteId: "0a8ee2b1-4534-4fd8-a99d-e63116b3a257", 
              childRouteId: null,
              name: "My Leaves",
              priority: 4,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
    
            {
              id: "598e0d41-7ee6-41bc-96c5-d6262e745648", // 8
              parentRouteId: "0a8ee2b1-4534-4fd8-a99d-e63116b3a257", 
              childRouteId: null,
              name: "Pay Slip",
              priority: 5,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "4cab10a0-6a49-4e9d-8ad1-2a5de57a913a", // 9
              parentRouteId: "0a8ee2b1-4534-4fd8-a99d-e63116b3a257", 
              childRouteId: null,
              name: "Work Log",
              priority: 6,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "f9ed0f73-4392-4de2-9e6b-d67dc2a8b6e9", // 10
              parentRouteId: "0a8ee2b1-4534-4fd8-a99d-e63116b3a257", 
              childRouteId: null,
              name: "Holidays",
              priority: 7,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "4ddf905c-0164-46eb-8827-f1832d4dc05c", // 11
              parentRouteId: "0a8ee2b1-4534-4fd8-a99d-e63116b3a257", 
              childRouteId: null,
              name: "Employee Resignation",
              priority: 8,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "c288905a-5bdc-493d-8524-567ae4dd72b5", // 12
              parentRouteId: null, 
              childRouteId: null,
              name: "Projects",
              priority: 4,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "4895217f-83dc-4c5a-a787-37c3bef0b047", // 13
              parentRouteId: "c288905a-5bdc-493d-8524-567ae4dd72b5",
              childRouteId: null,
              name: "All Projects",
              priority: 1,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "72e80249-1b16-4725-ae09-315b9ec39fd2", // 14
              parentRouteId: "c288905a-5bdc-493d-8524-567ae4dd72b5",
              childRouteId: null, 
              name: "Tasks",
              priority: 2,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "f02417f0-48f3-4928-a384-b55aaedd2c1e", // 15
              parentRouteId: "c288905a-5bdc-493d-8524-567ae4dd72b5",
              childRouteId: null, 
              name: "Project Statistics",
              priority: 3,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "66ada215-c1ef-41e6-bf4c-5811ec22d7db", // 16
              parentRouteId: null,
              childRouteId: null,
              name: "HR/Admin",
              priority: 5,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "ab661bb5-7276-4cd1-b111-ec8ae1ade8ca", // 17
              parentRouteId: "66ada215-c1ef-41e6-bf4c-5811ec22d7db", 
              childRouteId: null,
              name: "Policies",
              priority: 1,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "208f1be0-9653-4a76-9788-cc751f31f895", // 18
              parentRouteId: "66ada215-c1ef-41e6-bf4c-5811ec22d7db", 
              childRouteId: null,
              name: "Inventory",
              priority: 2,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "24c6c2e3-26ad-421b-9a07-5551c99c7569", // 19
              parentRouteId: "66ada215-c1ef-41e6-bf4c-5811ec22d7db",
              childRouteId: "208f1be0-9653-4a76-9788-cc751f31f895",
              name: "Office Assetes",
              priority: 1,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "baed1a95-467f-428f-bfce-d5a533bc0dcc", // 20
              parentRouteId: "66ada215-c1ef-41e6-bf4c-5811ec22d7db",
              childRouteId: "208f1be0-9653-4a76-9788-cc751f31f895",
              name: "Kitchen Assetes",
              priority: 2,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "6b2ee0f4-ecc0-4cea-8cee-5dff58583cd2", // 21
              parentRouteId: "66ada215-c1ef-41e6-bf4c-5811ec22d7db",
              childRouteId: null,
              name: "Reports",
              priority: 3,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "4adc05a8-f4f2-4fb8-9979-31ba80d4745d", // 22
              parentRouteId: "66ada215-c1ef-41e6-bf4c-5811ec22d7db",
              childRouteId: "6b2ee0f4-ecc0-4cea-8cee-5dff58583cd2",
              name: "Attendance Report",
              priority: 1,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "ef81b48c-feb0-40b0-98c2-7b33e1d6c7c8", // 23
              parentRouteId: "66ada215-c1ef-41e6-bf4c-5811ec22d7db",
              childRouteId: "6b2ee0f4-ecc0-4cea-8cee-5dff58583cd2",
              name: "Leave Report",
              priority: 2,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "9acf536a-42b1-436d-8f96-1ade0d76cd0c", // 24
              parentRouteId: "66ada215-c1ef-41e6-bf4c-5811ec22d7db",
              childRouteId: "6b2ee0f4-ecc0-4cea-8cee-5dff58583cd2",
              name: "Work Report",
              priority: 3,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "36233df1-ebfe-4813-989a-eccdb58309bb", // 25
              parentRouteId: "66ada215-c1ef-41e6-bf4c-5811ec22d7db",
              childRouteId: null,
              name: "Resignation",
              priority: 4,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "b5b8782b-d079-4bab-b741-6dfb5ca1b64c", // 26
              parentRouteId: "66ada215-c1ef-41e6-bf4c-5811ec22d7db",
              childRouteId: null,
              name: "All Worklogs",
              priority: 5,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "e41e11c3-ba6d-4d13-b19e-bcf77023afcf", // 27
              parentRouteId: "66ada215-c1ef-41e6-bf4c-5811ec22d7db",
              childRouteId: null,
              name: "Announcements",
              priority: 6,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "562f5713-1081-4b48-9efb-c781cc979754", // 28
              parentRouteId: "66ada215-c1ef-41e6-bf4c-5811ec22d7db",
              childRouteId: null,
              name: "Employee Salary",
              priority: 7,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "93fe53ec-ed35-4dcb-a079-3e027c99a6f7", // 29
              parentRouteId: "66ada215-c1ef-41e6-bf4c-5811ec22d7db",
              childRouteId: null,
              name: "Route Permission",
              priority: 8,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "b1b22b71-d8bd-449d-a57e-3aded15cc2a1", // 30
              parentRouteId: "66ada215-c1ef-41e6-bf4c-5811ec22d7db",
              childRouteId: null,
              name: "All Attendance",
              priority: 9,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "536b01fb-1f0d-437a-ac0c-4ce4c9e95fe8", // 31
              parentRouteId: "66ada215-c1ef-41e6-bf4c-5811ec22d7db",
              childRouteId: null,
              name: "All Leaves",
              priority: 10,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "62c1c89f-0e35-4d3a-87ec-bc726d0fa817", // 32
              parentRouteId: "66ada215-c1ef-41e6-bf4c-5811ec22d7db",
              childRouteId: null,
              name: "Leave Master",
              priority: 11,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "73117383-f086-416c-9139-2b7d9ee324ee", // 33
              parentRouteId: "66ada215-c1ef-41e6-bf4c-5811ec22d7db",
              childRouteId: null,
              name: "Leave Balance",
              priority: 12,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "e69600c1-b540-4ca5-8cc1-1a7574edcd64", // 34
              parentRouteId: "66ada215-c1ef-41e6-bf4c-5811ec22d7db",
              childRouteId: null,
              name: "Monthly Salary",
              priority: 13,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "96d801eb-a2f0-44e6-8738-220d849abfa9", // 35
              parentRouteId: null,
              childRouteId: null,
              name: "Performance",
              priority: 6,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "d7024db4-f314-4d9f-8b31-437b55dbe9c0", // 36
              parentRouteId: "96d801eb-a2f0-44e6-8738-220d849abfa9",
              childRouteId: null,
              name: "Reviews",
              priority: 1,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "e6d7ab08-5ab4-4ffe-97db-662c0746e6eb", // 37
              parentRouteId: "96d801eb-a2f0-44e6-8738-220d849abfa9",
              childRouteId: null,
              name: "Assessment",
              priority: 2,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "2d49c229-0e9a-488d-916a-b4ea73757fdd", // 38
              parentRouteId: "96d801eb-a2f0-44e6-8738-220d849abfa9",
              childRouteId: "e6d7ab08-5ab4-4ffe-97db-662c0746e6eb",
              name: "Employee Assessment",
              priority: 1,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "f7b70483-3c83-4880-a89c-db5a524803d4", // 39
              parentRouteId: "96d801eb-a2f0-44e6-8738-220d849abfa9",
              childRouteId: "e6d7ab08-5ab4-4ffe-97db-662c0746e6eb",
              name: "Admin Assessment",
              priority: 2,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "cfa03ce3-bfb6-4c53-9e2e-08b43fe5a3cc", // 40
              parentRouteId: "96d801eb-a2f0-44e6-8738-220d849abfa9",
              childRouteId: null,
              name: "Goals",
              priority: 3,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
      ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('routes', null, {});
  }
}