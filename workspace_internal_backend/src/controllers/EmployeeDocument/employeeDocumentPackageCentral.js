const models = require("../../models/associations");
const { Employees, Role , EmployeeDocuments} = models;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TOKEN_MAXAGE = process.env.TOKEN_MAXAGE
const TOKEN_SECRET = process.env.TOKEN_SECRET
const {
  constants,
  responseMessage,
  statusCode,
  errorResponseFunc,
  unlinkFiles,
  successResponseFunc,
  sendEmail,
} = require("../../utils/utilsIndex");
require("dotenv").config();
const path = require("path");
const logger = require("../../services/loggerService");
const { uploadFile, deleteFile } = require('../../middlewares/fileUpload');
module.exports = {
  Employees,
  EmployeeDocuments,
  bcrypt,
  constants,
  jwt,
  statusCode,
  responseMessage,
  Role,
  successResponseFunc,
  errorResponseFunc,
  path,
  logger,
  unlinkFiles,
  TOKEN_SECRET,
  TOKEN_MAXAGE,
  sendEmail,
  deleteFile,
  uploadFile
};
