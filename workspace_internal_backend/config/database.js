// const Sequelize = require("sequelize");
// const config = require("./config");

// const db = {};

// // Parse connection string based on environment
// let sequelize;

// if (process.env.DATABASE_URL) {
//   // Use DATABASE_URL for Render or other production deployments
//   sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: "postgres",
//     logging: false,
//     retry: {
//       match: [/Deadlock/i],
//       max: 3,
//       backoffBase: 1000,
//       backoffExponent: 1.5,
//     },
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//   });
// } else if (process.env.NETLIFY_DATABASE_URL) {
//   // Use Neon's connection string for Netlify deployment
//   sequelize = new Sequelize(process.env.NETLIFY_DATABASE_URL, {
//     dialect: "postgres",
//     logging: false,
//     retry: {
//       match: [/Deadlock/i],
//       max: 3,
//       backoffBase: 1000,
//       backoffExponent: 1.5,
//     },
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//   });
// } else {
//   // Use traditional development config for local development
//   sequelize = new Sequelize(
//     config.development.database,
//     config.development.username,
//     config.development.password,
//     {
//       host: config.development.host,
//       port: config.development.port,
//       dialect: config.development.dialect,
//       logging: false,
//       retry: {
//         match: [/Deadlock/i],
//         max: 3,
//         backoffBase: 1000,
//         backoffExponent: 1.5,
//       },
//     }
//   );
// }

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;


const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// import models AFTER sequelize is created
db.employee = require("./employee.model")(sequelize, Sequelize);

module.exports = db;