const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();
const cookieParser = require("cookie-parser");
const pinoLogger = require("pino-http");
const logger = require("./src/services/loggerService");
const { path } = require("./src/controllers/EmployeeDocument/employeeDocumentPackageCentral");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const colors = require('colors');
const db = require("./config/database");
const cron = require('node-cron');
const { checkProbationEnding, dailyTimeLogCheck, distributeMonthlyLeaves, authenticateOdoo, fetchTimesheets, weeklyTimeSheetCheck } = require('./src/utils/functions');

app.use(function (req, res, next) {
  const method = req.method;
  const url = req.originalUrl;

  console.log(`${colors.bgBlue(`API Path:`)} ${colors.red(method)} ${colors.bgBlue(url)}`);
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json({ limit: '200mb' }));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "*",
  exposedHeaders: ["Content-Disposition"],
};

app.use(cors(corsOptions));
const loggerMidlleware = pinoLogger({
  logger: logger,
  autoLogging: true,
});

app.use("/public", express.static(path.join(__dirname, "public")));


app.use(loggerMidlleware);


// Cron job to check if probation period is ending
cron.schedule('0 8 * * *', async () => {
  try {
    await checkProbationEnding();
  } catch (error) {
    console.log('Error occurred while running checkProbationEnding cron:', error);
  }
}, {
  scheduled: true,
  timezone: "Asia/Kolkata"
});

cron.schedule('0 10 * * *', async () => {
  try {
    await dailyTimeLogCheck();
  } catch (error) {
    console.log('Error occurred while running dailyTimeLogCheck cron:', error);
  }
}, {
  scheduled: true,
  timezone: "Asia/Kolkata"
});

// Cron job to add leave balance at the start of each month
// this will run on the 1st day of every month at midnight
cron.schedule('0 0 1 * *', async () => {
  try {
    await distributeMonthlyLeaves();
  } catch (error) {
    console.log('Error occurred while running updateLeaveBalance cron:', error);
  }
}, {
  scheduled: true,
  timezone: "Asia/Kolkata"
});

// Cron job to fetch timesheets at 11 PM daily
cron.schedule('0 23 * * *', async () => {
  try {
    const uid = await authenticateOdoo();
    const result = await fetchTimesheets(uid);
    console.log('Cron job for fetching timesheets ran successfully.');
    console.log(result);
  } catch (error) {
    console.error('Error fetching timesheets:', error);
  }
}, {
  scheduled: true,
  timezone: "Asia/Kolkata"
});

// Cron job to send weekly worklog reminder at each Saturday 11:30 PM
cron.schedule('30 23 * * 6', async () => {
  try {
    await weeklyTimeSheetCheck();
  } catch (error) {
    console.error('Error sending weekly worklog reminder:', error);
  }
}, {
  scheduled: true,
  timezone: "Asia/Kolkata"
});

// Start the server
require("./src/routes/index")(app);

app.listen(PORT, async () => {
  try { 
    await db.sequelize.authenticate();
    console.log('DB connection has been established successfully.');
    logger.info('DB connection has been established successfully.');
  } catch (err) {
    console.log('Unable to connect to the database:', err);
    logger.error('Unable to connect to the database:', err);
  };
  console.log(`Server is running on port ${PORT}`);
  logger.info(`Server started on port ${PORT}`);
});