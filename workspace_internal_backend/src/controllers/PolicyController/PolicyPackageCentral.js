const models = require("../../models/associations");
const { Policy } = models;
const AWS_URL = process.env.AWS_URL;
const { literal } = require("sequelize");

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
const { uploadFile, deleteFile } = require('../../middlewares/fileUpload');

module.exports = {
  statusCode,
  responseMessage,
  constants,
  responseFunc,
  successResponseFunc,
  errorResponseFunc,
  logger,
  Policy,
  uploadFile,
  deleteFile,
  AWS_URL,
  literal
};