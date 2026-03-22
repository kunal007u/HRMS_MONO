const models = require("../../models/associations");
const { LeaveRequest, Employees, LeaveBalance, LeaveInfo, Holiday } = models;
const { Sequelize } = require("../../../config/database");
const { Op } = require("sequelize");
const moment = require('moment');
require("dotenv").config();
const AWS_URL = process.env.AWS_URL;
const {
  constants,
  responseFunc,
  responseMessage,
  statusCode,
  errorResponseFunc,
  successResponseFunc,
  sendEmail,
} = require("../../utils/utilsIndex");
const logger = require("../../services/loggerService");

module.exports = {
  Employees,
  statusCode,
  responseMessage,
  constants,
  responseFunc,
  successResponseFunc,
  errorResponseFunc,
  logger,
  LeaveRequest,
  LeaveBalance,
  Sequelize,
  Op,
  moment,
  LeaveInfo,
  AWS_URL,
  sendEmail,
  Holiday
};
