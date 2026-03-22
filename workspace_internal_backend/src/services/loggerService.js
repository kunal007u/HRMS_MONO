const pino = require("pino");

module.exports = pino({
  transport: {
    targets: [
      {
        level: "info",
        target: "pino/file",
        options: { destination: "src/loggerFiles/logsInfo.log" },
      },
      {
        level: "error",
        target: "pino/file",
        options: { destination: "src/loggerFiles/logsError.log" },
      },
      {
        
        level: "warn",
        target: "pino/file",
        options: { destination: "src/loggerFiles/logsWarn.log" },
      }
    ],
    options: {
      ignore: "req.headers,res",
    },
  },
});
