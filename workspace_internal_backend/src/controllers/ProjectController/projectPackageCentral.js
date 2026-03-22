const models = require("../../models/associations");
const { Projects, WorkLogs, Employees } = models
require("dotenv").config();
const {
    constants,
    responseFunc,
    responseMessage,
    statusCode,
    errorResponseFunc,
    successResponseFunc,
    formatHoursToHHMM
} = require("../../utils/utilsIndex");

const logger = require("../../services/loggerService");

module.exports = {
    Projects,
    WorkLogs,
    statusCode,
    responseMessage,
    constants,
    responseFunc,
    successResponseFunc,
    errorResponseFunc,
    logger,
    formatHoursToHHMM,
    Employees
};
