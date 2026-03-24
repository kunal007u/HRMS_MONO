const pino = require("pino");

module.exports = pino({
  transport: {
    target: "pino/file",
    options: {
      destination: 1, // stdout (file descriptor 1)
    },
  },
  level: process.env.LOG_LEVEL || "info",
});
