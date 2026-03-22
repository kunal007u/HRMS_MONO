const models = require("../../models/associations");
const { EmergencyContacts } = models;
const {
  constants,
  responseMessage,
  statusCode,
  errorResponseFunc,
  successResponseFunc,
} = require("../../utils/utilsIndex");
const logger = require("../../services/loggerService");

module.exports = {
  EmergencyContacts,
  constants,
  responseMessage,
  statusCode,
  errorResponseFunc,
  successResponseFunc,
  logger,
};
