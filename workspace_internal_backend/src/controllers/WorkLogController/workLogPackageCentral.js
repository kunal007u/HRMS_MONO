const {
  constants,
  statusCode,
  errorResponseFunc,
  successResponseFunc,
} = require("../../utils/utilsIndex");
const logger = require("../../services/loggerService");
const models = require("../../models/associations");
const { WorkLogs, Projects } = models;

module.exports = {
  WorkLogs,
  constants,
  statusCode,
  errorResponseFunc,
  successResponseFunc,
  logger,
  Projects,
};