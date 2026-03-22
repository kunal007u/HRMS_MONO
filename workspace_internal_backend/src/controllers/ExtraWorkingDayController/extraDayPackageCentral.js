const {
    constants,
    statusCode,
    errorResponseFunc,
    successResponseFunc,
  } = require("../../utils/utilsIndex");
  const logger = require("../../services/loggerService");
  const models = require("../../models/associations");
  const { ExtraWorkingDays } = models;
  const sequelize = require("sequelize");
  
  module.exports = {
    constants,
    statusCode,
    errorResponseFunc,
    successResponseFunc,
    logger,
    ExtraWorkingDays,
    sequelize,
  };