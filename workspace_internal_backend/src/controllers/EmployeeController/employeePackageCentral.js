const models = require("../../models/associations");
const {
  Employees,
  Role,
  Route,
  BankDetails,
  EmergencyContacts,
  EmployeeDocuments,
  ExperienceDetails,
  Assets,
  Department,
  Designation,
  WorkLogs,
  Projects,
  LeaveBalance,
  LeaveMaster,
  EmployeeLogDetails,
  LeaveRequest,
} = models;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { literal, fn, col } = require("sequelize");
const TOKEN_MAXAGE = process.env.TOKEN_MAXAGE;
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const AWS_URL = process.env.AWS_URL
const uuid = require("uuid");
const {
  constants,
  responseMessage,
  statusCode,
  errorResponseFunc,
  successResponseFunc,
  unlinkFiles,
  temporaryPasswordString,
  sendEmail,
  employeeMonthlyAttendance,
  fetchMonthlyAttendance
} = require("../../utils/utilsIndex");
const { uploadFile } = require('../../middlewares/fileUpload');
require("dotenv").config();
const Sequelize = require("sequelize");
const path = require("path");
const logger = require("../../services/loggerService");
const { Op } = require("sequelize");
const fs = require("fs");

module.exports = {
  fs,
  Employees,
  bcrypt,
  BankDetails,
  EmergencyContacts,
  EmployeeDocuments,
  ExperienceDetails,
  Assets,
  Department,
  Designation,
  constants,
  jwt,
  statusCode,
  models,
  responseMessage,
  Role,
  Department,
  successResponseFunc,
  errorResponseFunc,
  temporaryPasswordString,
  unlinkFiles,
  Op,
  path,
  logger,
  TOKEN_SECRET,
  TOKEN_MAXAGE,
  sendEmail,
  Route,
  Sequelize,
  WorkLogs,
  Projects,
  LeaveBalance,
  moment,
  LeaveMaster,
  uuid,
  EmployeeLogDetails,
  LeaveRequest,
  literal,
  fn,
  col,
  AWS_URL,
  uploadFile,
  employeeMonthlyAttendance,
  fetchMonthlyAttendance
};
