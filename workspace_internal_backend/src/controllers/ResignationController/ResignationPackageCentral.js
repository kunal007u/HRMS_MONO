const models = require("../../models/associations");
const { Resignation, Employees } = models;
const { Sequelize } = require('sequelize');
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
  statusCode,
  responseMessage,
  constants,
  responseFunc,
  successResponseFunc,
  errorResponseFunc,
  logger,
  Resignation,
  Employees,
  Sequelize
};