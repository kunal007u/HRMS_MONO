module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "leaveMasters",
      [
        {
          id: "5098e8dd-c1ac-464a-9da3-e12da13c9726",
          month: "January",
          leaves: 2,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2e1d9b4f-d452-4b51-b553-66d3a8941ecd",
          month: "February",
          leaves: 1,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "5dd7703b-e98e-421e-9275-b740f96df317",
          month: "March",
          leaves: 1,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "763fcb61-35d0-4e79-8ca4-3d9718a886df",
          month: "April",
          leaves: 2,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1d7e5e98-da7a-4f55-9e00-725ff39473df",
          month: "May",
          leaves: 1,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "591a4a27-4639-4ef3-a0cc-07d827f64af8",
          month: "June",
          leaves: 1,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "53d5c40a-7fb5-411d-b05b-5b2c3d723119",
          month: "July",
          leaves: 2,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "d7615270-0ed4-417a-8d8c-83ef30a05f07",
          month: "August",
          leaves: 2,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "bd48ec5a-ccc4-4201-ab28-03eacc8bf8ce",
          month: "September",
          leaves: 1,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "d1c2fcbc-f273-4654-9c0d-e613abd65561",
          month: "October",
          leaves: 2,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "667e73b6-a6a7-4adf-a3fe-46a55dedf545",
          month: "November",
          leaves: 1,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "6f6cc92a-5c4a-42f0-b10a-8164f2a6da81",
          month: "December",
          leaves: 1,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("leaveMasters", null, {});
  },
};
