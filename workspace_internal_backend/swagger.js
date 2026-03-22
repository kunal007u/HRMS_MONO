const swaggerAutogen = require("swagger-autogen")();
const route = require("./src/routes/route");
const doc = {
  info: {
    title: "My API",
    description: "Description",
    version: "1.0.0",
  },
  host: "localhost:9000",
  basePath: "/",
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      scheme: "bearer",
      bearerFormat: "Token",
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["./src/routes/route"];

swaggerAutogen(outputFile, routes, doc);
