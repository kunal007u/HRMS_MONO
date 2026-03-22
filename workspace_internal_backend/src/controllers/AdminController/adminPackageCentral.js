const models = require("../../models/associations");
const { Employees, Role , Permission, Route } = models;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifiedEmail = process.env.NODEMAILER_VERIFIED_EMAIL_ID;
require("dotenv").config();
const TOKEN_MAXAGE = process.env.TOKEN_MAXAGE;
const fs = require("fs");
const cheerio = require("cheerio");
const path = require("path");
const {
  temporaryPasswordString,
  constants,
  responseFunc,
  responseMessage,
  statusCode,
  errorResponseFunc,
  successResponseFunc,
  unlinkFiles,
  sendEmail
} = require("../../utils/utilsIndex");
const logger = require("../../services/loggerService");
module.exports = {
  Employees,
  bcrypt,
  jwt,
  sendEmail,
  statusCode,
  unlinkFiles,
  responseMessage,
  Role,
  constants,
  TOKEN_MAXAGE,
  verifiedEmail,
  temporaryPasswordString,
  responseFunc,
  successResponseFunc,
  errorResponseFunc,
  fs,
  path,
  cheerio,
  logger,
  Permission,
  Route,
};
