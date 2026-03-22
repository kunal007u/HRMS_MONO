const models = require("../../models/associations");
const { Employees, Role, Attendance } = models;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const csv = require('csv-parser');
const TOKEN_MAXAGE = process.env.TOKEN_MAXAGE
const TOKEN_SECRET = process.env.TOKEN_SECRET
const {
  constants,
  responseMessage,
  statusCode,
  errorResponseFunc,
  successResponseFunc,
  unlinkFiles,
  temporaryPasswordString,
  sendEmail
} = require("../../utils/utilsIndex");
require("dotenv").config();
const path = require("path");
const logger = require("../../services/loggerService");
module.exports = {
  Employees,
  bcrypt,
  constants,
  jwt,
  statusCode,
  responseMessage,
  Role,
  successResponseFunc,
  errorResponseFunc,
  temporaryPasswordString,
  unlinkFiles,
  path,
  logger,
  TOKEN_SECRET,
  TOKEN_MAXAGE,
  sendEmail,
  Attendance,
  fs,
  csv
};
