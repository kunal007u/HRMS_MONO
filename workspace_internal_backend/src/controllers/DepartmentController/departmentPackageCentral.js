const models = require("../../models/associations");
const { Department } = models;
require("dotenv").config();
const {
  constants,
  responseFunc,
  responseMessage,
  statusCode,
  errorResponseFunc,
  successResponseFunc,
} = require("../../utils/utilsIndex");
const logger = require("../../services/loggerService");

module.exports = {
  Department,
  statusCode,
  responseMessage,
  constants,
  responseFunc,
  successResponseFunc,
  errorResponseFunc,
  logger
};