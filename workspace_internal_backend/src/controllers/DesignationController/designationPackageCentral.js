const models = require("../../models/associations");
const { Designation, Role, Employees } = models;
const {
  constants,
  responseMessage,
  statusCode,
  errorResponseFunc,
  successResponseFunc,
} = require("../../utils/utilsIndex");
const logger = require("../../services/loggerService");

module.exports = {
  Designation,
  Role,
  constants,
  Employees,
  responseMessage,
  statusCode,
  errorResponseFunc,
  successResponseFunc,
  logger,
}