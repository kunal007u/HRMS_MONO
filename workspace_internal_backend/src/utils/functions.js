const fs = require("fs");
const moment = require("moment");
const models = require("../models/associations");
let {
  LeaveRequest,
  EmployeeLogDetails,
  Holiday,
  Employees,
  LeaveMaster,
  LeaveBalance,
  TimeSheet,
  EmployeeMapping,
  Role,
  ExtraWorkingDays,
} = models;
const { Op } = require("sequelize");
const constants = require("../utils/constants");
const sendMail = require("./sendEmail");
const xmlrpc = require("xmlrpc");

function unlinkFiles(files) {
  if (files.length !== 0) {
    files.map((file) => {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.log(`Error deleting file ${file.path}:`, err);
        } else {
          console.log(`Successfully deleted ${file.path}`);
        }
      });
    });
  }
}

const formatHoursToHHMM = (hours) => {
  const duration = moment.duration(Math.abs(hours), "hours");
  const formattedTime = `${hours < 0 ? "-" : ""}${Math.floor(
    duration.asHours()
  )}:${duration.minutes().toString().padStart(2, "0")}`;
  return formattedTime;
};
const formatTimeTo12Hour = (time) => {
  return time == null ? "" : moment(time, "HH:mm:ss").format("h:mm a");
};

// const employeeMonthlyAttendance = async (
//   employeeData,
//   startDate,
//   endDate,
//   totalWorkingDays
// ) => {
//   try {
//     let employee_code = employeeData.employee_code;
//     const whereClause = {
//       employee_code,
//       log_date: {
//         [Op.between]: [startDate, endDate],
//       },
//     };

//     const { count, rows: logs } = await EmployeeLogDetails.findAndCountAll({
//       attributes: ["log_date", "log_time", "direction"],
//       where: whereClause,
//       order: [
//         ["log_date", "DESC"],
//         ["log_time", "ASC"],
//       ],
//     });

//     const totalHolidays = await Holiday.findAll({
//       attributes: ["date"],
//     });
//     const leaveDays = [];
//     function calculateLeaveDays(startDate, endDate) {
//       const logDates = logs.map((e) => e.dataValues.log_date);
//       const uniqueLogDates = Array.from(new Set(logDates));
//       const islogs = (date) => {
//         return uniqueLogDates.includes(date);
//       };
//       const isWeekend = (date) => {
//         const day = moment(date).day();
//         return day === 0 || day === 6;
//       };

//       const holidays = totalHolidays.map((e) => e.dataValues.date);
//       const isHoliday = (date) => {
//         return holidays.includes(date);
//       };

//       let currentDate = moment(startDate);
//       while (currentDate.isSameOrBefore(endDate)) {
//         let selectedDuration;
//         if (islogs(currentDate.format("YYYY-MM-DD"))) {
//           selectedDuration = "Present";
//         } else if (isWeekend(currentDate.format("YYYY-MM-DD"))) {
//           selectedDuration = "Weekend";
//         } else if (isHoliday(currentDate.format("YYYY-MM-DD"))) {
//           selectedDuration = "Holiday";
//         } else {
//           selectedDuration = "Absent";
//         }

//         leaveDays.push({
//           date: currentDate.format("YYYY-MM-DD"),
//           selectedDuration: selectedDuration,
//         });

//         currentDate = currentDate.add(1, "days");
//       }
//       return leaveDays;
//     }

//     let date = moment().format("YYYY-MM");
//     let endDateYear = moment(endDate).format("YYYY-MM");
//     let previousDate = moment().subtract(1, "days").format("YYYY-MM-DD");

//     if (logs.length > 0) {
//       if (endDateYear === date) {
//         calculateLeaveDays(startDate, previousDate);
//       } else {
//         calculateLeaveDays(startDate, endDate);
//       }
//     }

//     let absentCount = 0;
//     let holidayCount = 0;

//     leaveDays.forEach((day) => {
//       if (day.selectedDuration === "Absent") {
//         absentCount++;
//       } else if (day.selectedDuration === "Holiday") {
//         holidayCount++;
//       }
//     });
//     let endDates =
//       moment(endDate).format("YYYY-MM") !== moment().format("YYYY-MM")
//         ? moment(endDate).endOf("day").toDate()
//         : moment().subtract(1, "day").endOf("day").toDate();
//     let totalPaidLeave = await LeaveRequest.sum("paidLeave", {
//       where: {
//         employeeId: employeeData.id,
//         startDate: {
//           [Op.between]: [moment(startDate).startOf("day").toDate(), endDates],
//         },
//       },
//     });

//     if (!logs.length) {
//       return {
//         ...employeeData.dataValues,
//         presentDays: 0,
//         leaveDays: 0,
//         totalPaidLeave: totalPaidLeave,
//       };
//     }

//     const groupedLogs = logs.reduce((acc, log) => {
//       const { log_date, log_time, direction } = log;
//       if (!acc[log_date]) {
//         acc[log_date] = { first_in: null, last_out: null, inOut: [] };
//       }

//       if (direction === "in") {
//         if (!acc[log_date].first_in || log_time < acc[log_date].first_in) {
//           acc[log_date].first_in = log_time;
//         }
//       } else if (direction === "out") {
//         if (!acc[log_date].last_out || log_time > acc[log_date].last_out) {
//           acc[log_date].last_out = log_time;
//         }
//       }

//       acc[log_date].inOut.push({ direction, time: log_time });

//       return acc;
//     }, {});

//     let present = 0,
//       absent = 0,
//       halfDay = 0;
//     const today = moment().format("YYYY-MM-DD");
//     Object.entries(groupedLogs).forEach(
//       ([log_date, { first_in, last_out, inOut }]) => {
//         const sortedInOut = inOut.sort((a, b) => {
//           const timeA = moment(a.time, "HH:mm:ss");
//           const timeB = moment(b.time, "HH:mm:ss");
//           return timeA.isBefore(timeB) ? -1 : 1;
//         });

//         let dailyTotalInTime = 0;
//         for (let i = 0; i < sortedInOut.length; i++) {
//           const currentEntry = sortedInOut[i];

//           if (currentEntry.direction === "in") {
//             let outTime = null;
//             for (let j = i + 1; j < sortedInOut.length; j++) {
//               if (sortedInOut[j].direction === "out") {
//                 outTime = sortedInOut[j].time;
//                 break;
//               }
//             }

//             const inTime = currentEntry.time;
//             const inMoment = moment(inTime, "HH:mm:ss");
//             const outMoment = outTime ? moment(outTime, "HH:mm:ss") : null;

//             if (outMoment && outMoment.isValid()) {
//               const duration = moment
//                 .duration(outMoment.diff(inMoment))
//                 .asHours();
//               if (duration > 0) {
//                 dailyTotalInTime += duration;
//               }
//             }
//           }
//         }
//         if (dailyTotalInTime > constants.FULLDAY) {
//           present++;
//         } else if (dailyTotalInTime >= constants.HALFDAY) {
//           halfDay++;
//         } else {
//           if (today !== log_date) absent++;
//         }
//       }
//     );
//     let half = halfDay / 2;
//     return {
//       ...employeeData.dataValues,
//       totalWorkingDays,
//       presentDays: present + half + holidayCount,
//       leaveDays: Number(absent + half + absentCount),
//       totalPaidLeave: totalPaidLeave,
//     };
//   } catch (error) {
//     console.error("error", error);
//   }
// };


const fetchMonthlyAttendance = async (employeeData, startDate, endDate) => {
  try {
    const employee_code = employeeData.employee_code;
    const whereClause = {
      employee_code,
      log_date: {
        [Op.between]: [startDate, endDate],
      },
      isDeleted: false,
    };

    const { rows: logs } = await EmployeeLogDetails.findAndCountAll({
      attributes: ["log_date", "log_time", "direction"],
      where: whereClause,
      order: [
        ["log_date", "DESC"],
        ["log_time", "ASC"],
      ],
    });

    const holidays = await Holiday.findAll({
      attributes: ["date"],
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const holidayDates = new Set(holidays.map((h) => h.date));

    // Calculate total working days and group logs
    const groupedLogs = {};
    let totalWorkingDays = 0;
    let currentDate = moment(startDate, "YYYY-MM-DD");
    const endMoment = moment(endDate, "YYYY-MM-DD");

    while (currentDate.isSameOrBefore(endMoment)) {
      const currentDateStr = currentDate.format("YYYY-MM-DD");
      const isWeekend = currentDate.day() === 0 || currentDate.day() === 6;
      const isHoliday = holidayDates.has(currentDateStr);

      if (!isWeekend && !isHoliday) {
        totalWorkingDays++;
      }

      groupedLogs[currentDateStr] = [];
      currentDate.add(1, "days");
    }

    // Populate groupedLogs with actual log data
    logs.forEach((log) => {
      if (groupedLogs[log.log_date]) {
        groupedLogs[log.log_date].push(log);
      }
    });

    let presentDays = 0;
    let halfDays = 0;
    let absentDays = 0;

    Object.entries(groupedLogs).forEach(([date, dayLogs]) => {
      const isWeekend =
        moment(date, "YYYY-MM-DD").day() === 0 ||
        moment(date, "YYYY-MM-DD").day() === 6;
      const isHoliday = holidayDates.has(date);

      if (isWeekend || isHoliday) {
        if (dayLogs.length > 0) {
          presentDays++; // Count as present if there are logs on weekends or holidays
        } else {
        }
        return;
      }

      if (dayLogs.length === 0) {
        absentDays++;
        return;
      }

      let dailyTotalInTime = 0;
      const sortedLogs = dayLogs.sort((a, b) =>
        moment(a.log_time, "HH:mm:ss").diff(moment(b.log_time, "HH:mm:ss"))
      );

      for (let i = 0; i < sortedLogs.length - 1; i += 2) {
        const inTime = moment(sortedLogs[i].log_time, "HH:mm:ss");
        const outTime = moment(sortedLogs[i + 1]?.log_time, "HH:mm:ss");
        if (outTime.isValid()) {
          const duration = moment.duration(outTime.diff(inTime)).asHours();
          dailyTotalInTime += duration;
        }
      }

      if (dailyTotalInTime > constants.FULLDAY) {
        presentDays++;
      } else if (dailyTotalInTime >= constants.HALFDAY) {
        halfDays++;
      } else {
        absentDays++;
      }
    });

    // Calculate leaveDays
    const leaveDays = absentDays + halfDays / 2;

    // Fetch total paid leave
    const totalPaidLeave = await LeaveRequest.sum("paidLeave", {
      where: {
        employeeId: employeeData.id,
        startDate: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const result = {
      ...employeeData.dataValues,
      totalWorkingDays,
      presentDays: leaveDays
        ? presentDays + halfDays / 2 + totalPaidLeave
        : presentDays + halfDays / 2,
      leaveDays: leaveDays ? leaveDays - totalPaidLeave : 0,
      totalPaidLeave: totalPaidLeave || 0,
    };

    return result;
  } catch (error) {
    console.error("Error in fetchMonthlyAttendance:", error);
    throw error;
  }
};

// Check probation ending for employees and send reminder email to HR and Admin team before 15 days and 7 days
const checkProbationEnding = async () => {
  try {
    const today = moment().startOf("day");
    const targetDate15Days = moment(today).add(15, "days").format("YYYY-MM-DD");
    const targetDate7Days = moment(today).add(7, "days").format("YYYY-MM-DD");

    // Find employees whose probation end date is either 15 days or 7days from today
    const employees = await Employees.findAll({
      where: {
        probationEndDate: {
          [Op.in]: [targetDate15Days, targetDate7Days],
        },
      },
    });

    if (employees.length === 0) {
      console.log(
        `No employees with probation end date on ${targetDate15Days} or ${targetDate7Days}.`
      );
      return;
    }

    for (const employee of employees) {
      const [designation, department] = await Promise.all([
        models.Designation.findByPk(employee.designationId),
        models.Department.findByPk(employee.departmentId),
      ]);


      const fullNames = `${employee.firstName} ${employee.lastName}`;
      const daysLeft = moment(employee.probationEndDate).diff(today, "days");
      const subject = `Reminder: Employee ${fullNames} - Probation Period Ending on ${moment(
        employee.probationEndDate
      ).format("DD-MM-YYYY")}`;
      const emailBody = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Probation Period Ending Reminder</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      line-height: 1.6;
                      color: #333333;
                      max-width: 600px;
                      margin: 0 auto;
                      padding: 20px;
                  }
                  .details {
                      background-color: #f9f9f9;
                      padding: 15px;
                      border-radius: 4px;
                      margin: 20px 0;
                  }
                  .details p {
                      margin: 5px 0;
                  }
                  .footer {
                      margin-top: 20px;
                      font-size: 12px;
                      color: #666666;
                  }
              </style>
          </head>
          <body>
              <p>Dear HR Team and Admin,<br>This is a reminder that the probation period for the following employee is ending in ${daysLeft} days:</p>

              <div class="details">
                  <p><strong>Name:</strong> ${fullNames}</p>
                  <p><strong>Employee Code:</strong> ${
                    employee.employee_code
                  }</p>
                  <p><strong>Department:</strong> ${
                    department.name || "N/A"
                  }</p>
                  <p><strong>Position:</strong> ${designation.name || "N/A"}</p>
                  <p><strong>Date of Joining:</strong> ${moment(
                    employee.dateOfJoining
                  ).format("DD-MM-YYYY")}</p>
                  <p><strong>Probation End Date:</strong> ${moment(
                    employee.probationEndDate
                  ).format("DD-MM-YYYY")}</p>
              </div>

              <p>Please take the necessary actions to review the employee's performance and decide on the next steps before the probation period ends.</p>
              <p>Best Regards,<br>PragetX Support Team</p>

              <div class="footer">
                  This is an automated message. Please do not reply to this email.
              </div>
          </body>
          </html>
          `;

      await sendMail(
        process.env.hrEmail,
        subject,
        emailBody,
        process.env.ccEmails
      );
      console.log(
        `Probation ending reminder email sent for employee ${fullNames}.`
      );
    }
  } catch (error) {
    console.error("Error in checkProbationEnding:", error);
    throw error;
  }
};

// Check daily time log for employees and send reminder email if not completed
const dailyTimeLogCheck = async () => {
  try {
    let date = moment().subtract(1, 'days').format("YYYY-MM-DD");
    const employee = await Employees.findAll({
    where : {
      isActive : true,
    },
    attributes : ["id","employee_code", "email", "firstName", "lastName"] });
    await employee.map(async (employeeData)=>{
      let leaveRequest = await LeaveRequest.findOne({
        where: {
          employeeId: employeeData.id,
          [Op.and]: [
            { startDate: { [Op.lte]: date } },
            { endDate: { [Op.gte]: date } },
          ],
          status: constants.APPROVED,
        },
      });
      if (!leaveRequest) {
        const logs = await EmployeeLogDetails.findAll({
          where: {
            employee_code: employeeData.employee_code,
            log_date: date,
            isDeleted: false,
          },
          attributes: { exclude: ["createdAt", "updatedAt", "id", "direction"] },
          order: [
            ["log_date", "DESC"],
            ["log_time", "ASC"],
          ],
        });
        if (logs.length > 0) {
          const groupedLogs = logs.reduce((acc, log) => {
            const { log_date, log_time } = log;
            if (!acc[log_date]) {
              acc[log_date] = [];
            }
            acc[log_date].push(log_time);
            return acc;
          }, {});
      
          let firstInTime = null;
          let lastOutTime = null;
          let totalInTime = 0;
          const inOut = [];
    
          const logTimes = groupedLogs[date] || [];
          for (let i = 0; i < logTimes.length; i += 2) {
            const inTime = logTimes[i];
            const outTime = logTimes[i + 1] || null;
            const duration = outTime
              ? moment
                  .duration(
                    moment(outTime, "HH:mm:ss a").diff(moment(inTime, "HH:mm:ss a"))
                  )
                  .asHours()
              : null;
            if (duration) {
              totalInTime += duration;
            }
            if (!firstInTime) {
              firstInTime = moment(inTime, "HH:mm:ss").format("hh:mm a");
            }
            if (outTime) {
              lastOutTime = moment(outTime, "HH:mm:ss").format("hh:mm a");
            }
            inOut.push({
              in: inTime ? moment(inTime, "HH:mm:ss").format("hh:mm a") : null,
              out: outTime ? moment(outTime, "HH:mm:ss").format("hh:mm a") : null,
              difference: duration ? formatHoursToHHMM(duration) : null,
            });
          }
          let subject = `Reminder: Incomplete Working Hours for [${moment().subtract(1, 'days').format("DD-MM-YYYY")}]`;
  
          const generateLogDetailsTableRows = (inOut, totalInTime) => {
            const logRows = inOut
              .map(
                (log) => `
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd; color: #333333;">${log.in || 'N/A'}</td>
                  <td style="padding: 10px; border: 1px solid #ddd; color: #333333;">${log.out || 'N/A'}</td>
                  <td style="padding: 10px; border: 1px solid #ddd; color: #333333;">${log.difference || 'N/A'}</td>
                </tr>
              `
              )
              .join('');
          
            const formattedTotalDuration = formatHoursToHHMM(totalInTime);
          
            // Add a row for the total duration
            const totalRow = `
              <tr style="background-color: #f0f0f0; font-weight: bold;">
                <td colspan="2" style="padding: 10px; border: 1px solid #ddd; text-align: right; color: #333333;">Total Time Log:</td>
                <td style="padding: 10px; border: 1px solid #ddd; color: #333333;">${formattedTotalDuration}</td>
              </tr>
            `;
          
            return logRows + totalRow;
          };
          
          const logDetailsRows = generateLogDetailsTableRows(inOut, totalInTime);
          const emailBody = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body {
                background-color: #f4f4f4;
                padding: 20px;
                margin: 0;
              }
              .email-container {
                background-color: #ffffff;
                border-radius: 8px;
                padding: 20px;
                max-width: 600px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              .content {
                font-size: 12px;
                color: #333333; /* Updated to a darker color */
                line-height: 1.5;
              }
              .highlight {
                color: #d9534f;
                font-weight: bold;
              }
              .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #666666;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="content">
                <p>Dear ${employeeData.firstName} ${employeeData.lastName},</p>
                <p>This is a reminder that you have not completed the required <span class="highlight">8 hours</span> of work on <span class="highlight">${moment().subtract(1, 'days').format("DD-MM-YYYY")}</span>.</p>
                <p>Below is a summary of your log times for the day:</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                  <thead>
                    <tr style="background-color: #f0f0f0;">
                      <th style="padding: 10px; border: 1px solid #ddd; color: #333333;">In Time</th>
                      <th style="padding: 10px; border: 1px solid #ddd; color: #333333;">Out Time</th>
                      <th style="padding: 10px; border: 1px solid #ddd; color: #333333;">Duration (HH:MM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${logDetailsRows}
                  </tbody>
                </table>
                <p>Please make sure to complete your working hours in the future to maintain your attendance record.</p>
              </div>
              <p style="color: #333333;">Best regards,<br>PragetX Support Team</p>
              <div class="footer">
                This is an automated message. Please do not reply to this email.
              </div>
            </div>
          </body>
          </html>
          `;

            if (constants.WORKED_HOURS > formatHoursToHHMM(totalInTime)[0]) {
            await sendMail(employeeData.email, subject, emailBody, [], null);
          }
        }
        
      }
    })
   
  } catch (error) {
    console.error("Error in scheduleAttendanceEmail:", error);
    throw error;
  }
};

// Distribute quarterly leaves to all permanent employees
const distributeMonthlyLeaves = async () => {
  try {
    const month = moment().tz("Asia/Kolkata").format("MMMM");

    // let monthOfQuarter =
    //   month === 1
    //     ? ["January", "February", "March"]
    //     : month === 4
    //     ? ["April", "May", "June"]
    //     : month === 7
    //     ? ["July", "August", "September"]
    //     : ["October", "November", "December"];

    // get the total leaves to be distributed for the month
    const totalLeaves =
      (await LeaveMaster.sum("leaves", {
        where: {
          month: month,
        },
      })) || 0;

    const totalEmployees = await Employees.findAll({
      where: {
        employeeType: constants.PERMANENT,
        isProbationCompleted: true,
      },
      attributes: ["id"],
      raw: true,
    });

    const totalEmployeeId = totalEmployees.map((emp) => emp.id);

    if (totalEmployeeId.length > 0) {
      const leaveBalances = await LeaveBalance.findAll({
        where: {
          employeeId: {
            [Op.in]: totalEmployeeId,
          },
        },
      });

      // Update each employee's leave balance
      await Promise.all(
        leaveBalances.map((balance) =>
          LeaveBalance.update(
            { balance: Number(balance.balance) + Number(totalLeaves) },
            { where: { employeeId: balance.employeeId } }
          )
        )
      );
    }
  } catch (error) {
    console.error("Error occurred during leave balance update:", error);
  }
};

// Odoo Configuration
const odooConfig = {
  url: process.env.ODOO_BASE_URL,
  db: process.env.ODOO_DB_NAME,
  username: process.env.ODOO_USERNAME,
  password: process.env.ODOO_PASSWORD,
};

async function normalizeEmployee(odooEmployeeId) {
  try {
    const mapping = await EmployeeMapping.findOne({
      where: { odoo_employee_id: odooEmployeeId },
    });

    return mapping ? mapping.hrms_employee_id : null;
  } catch (error) {
    console.error("Error in normalizeEmployee:", error);
    throw error;
  }
}

async function convertDecimalHoursToHM(decimalHours) {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

// Authenticate with Odoo
async function authenticateOdoo() {
  const commonClient = xmlrpc.createSecureClient({
    url: `${odooConfig.url}/xmlrpc/2/common`,
  });

  try {
    const uid = await new Promise((resolve, reject) => {
      commonClient.methodCall(
        "authenticate",
        [odooConfig.db, odooConfig.username, odooConfig.password, {}],
        (err, uid) => {
          if (err) {
            return reject(`Authentication failed: ${err.message}`);
          }
          resolve(uid);
        }
      );
    });
    return uid;
  } catch (error) {
    throw new Error(error);
  }
}

// Fetch Timesheets from Odoo
async function fetchTimesheets(uid, date) {
  const objectClient = xmlrpc.createSecureClient({
    url: `${odooConfig.url}/xmlrpc/2/object`,
  });

  let currentDate;
  if (date && date !== "") {
    currentDate = date;
  } else {
    const today = new Date();
    currentDate = today.toISOString().split("T")[0];
  }

  try {
    const result = await new Promise((resolve, reject) => {
      objectClient.methodCall(
        "execute_kw",
        [
          odooConfig.db,
          uid,
          odooConfig.password,
          "account.analytic.line", // Timesheet model
          "search_read",
          [
            // Domain filter for today's date only: Date format will be (YYYY-MM-DD)
            [["date", "=", currentDate]],
          ],
          {
            fields: [
              "employee_id",
              "project_id",
              "name",
              "task_id",
              "unit_amount",
              "date",
              "create_date",
              "display_name",
            ],
            limit: 100,
          },
        ],
        async (err, result) => {
          if (err) {
            return reject(`Error fetching timesheets: ${err.message}`);
          }

          if (result.length === 0) {
            return resolve({ message: `No timesheets found for ${currentDate}` });
          }

          await Promise.all(
            result.map(async (timesheet) => {
              const employeeId = await normalizeEmployee(
                timesheet.employee_id[0]
              );

              const workHours = await convertDecimalHoursToHM(
                timesheet.unit_amount
              );

              const timesheetData = {
                employeeName: timesheet.employee_id[1],
                employeeId,
                project: timesheet.project_id[1],
                description: timesheet.name,
                task: timesheet.task_id[1],
                hours: workHours,
                date: timesheet.date,
                projectTaskLabel: timesheet.display_name,
              };

              // Check if required fields are present
              if (!timesheetData.employeeId || !timesheetData.project || !timesheetData.task || !timesheetData.hours) {
                console.log("Skipping timesheet due to missing required fields:", timesheetData);
                console.warn("Skipping timesheet due to missing required fields:", timesheetData);
                return; // Skip this iteration if required fields are missing
              }

              // Check for duplicate entry
              const existingEntry = await TimeSheet.findOne({
                where: {
                  employeeId: timesheetData.employeeId,
                  project: timesheetData.project,
                  task: timesheetData.task,
                  date: timesheetData.date,
                  hours: timesheetData.hours,
                },
              });

              if (!existingEntry) {
                await TimeSheet.create(timesheetData);
              }
            })
          );
          resolve({ message: `Timesheets fetched successfully for ${currentDate}` });
        }
      );
    });
    return result;
  } catch (error) {
    console.error("Error in fetchTimesheets:", error);
    return { message: "Error occurred while fetching timesheets" };
  }
}

// ========== Helper Functions ==========
const formatDisplayDate = (date) => moment(new Date(date).toISOString()).format("DD-MM-YYYY");
const convertToDecimalHours = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours + minutes / 60;
};

const formatDecimalToHourMinute = (decimalHours) => {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  return `${hours}:${minutes.toString().padStart(2, '0')}`;
};

// Calculate working days between two dates
const calculateWorkingDays = async (employeeId, startDate, endDate) => {
  try {
    // Fetch holidays and leave requests in parallel
    const [holidays, leaveRequests] = await Promise.all([
      Holiday.findAll({
        attributes: ['date'],
        where: {
          date: { [Op.between]: [startDate, endDate] }
        }
      }),
      LeaveRequest.findAll({
        where: {
          employeeId,
          startDate: { [Op.lte]: endDate },
          endDate: { [Op.gte]: startDate },
          status: constants.APPROVED
        }
      })
    ]);

    // Convert dates to Sets for efficient lookup
    const holidayDates = new Set(holidays.map(h => h.date));
    const leaveDates = new Set();

    // Process leave requests
    leaveRequests.forEach(leave => {
      let current = moment(leave.startDate);
      const end = moment(leave.endDate);
      while (current.isSameOrBefore(end)) {
        leaveDates.add(current.format('YYYY-MM-DD'));
        current.add(1, 'day');
      }
    });

    // Count working days
    let totalWorkingDays = 0;
    let currentDate = moment(startDate);
    const endMoment = moment(endDate);

    while (currentDate.isSameOrBefore(endMoment)) {
      const currentDateStr = currentDate.format('YYYY-MM-DD');
      const isWorkingDay = !(
        currentDate.day() === 0 ||
        currentDate.day() === 6 ||
        holidayDates.has(currentDateStr) ||
        leaveDates.has(currentDateStr)
      );

      if (isWorkingDay) totalWorkingDays++;
      currentDate.add(1, 'days');
    }

    return totalWorkingDays;
  } catch (error) {
    throw new Error(`Failed to calculate working days: ${error.message}`);
  }
};

// Process extra working days
const processExtraWorkingDays = (extraDays) => {
  return extraDays.reduce((result, day) => {
    if (day.extraDayDate) {
      result.extraWorkingDays.add(day.extraDayDate);
      if (day.shiftedFromDate) {
        result.excludedDays.add(day.shiftedFromDate);
      }
    }
    return result;
  }, { extraWorkingDays: new Set(), excludedDays: new Set() });
};

// Generate email content
const generateEmailContent = (employee, dateWiseHours, totalHoursWorked, expectedHours, startDate, latestEndDate) => {
  return {
    subject: `Reminder: Incomplete Weekly Working Hours for [${startDate} - ${latestEndDate}]`,
    body: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { background-color: #f4f4f4; padding: 20px; margin: 0; }
          .email-container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 20px;
            max-width: 600px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            font-family: Arial, sans-serif;
          }
          .content { font-size: 14px; color: #333333; line-height: 1.5; }
          .highlight { color: #d9534f; font-weight: bold; }
          .footer { margin-top: 20px; font-size: 12px; color: #666666; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          table, th, td { border: 1px solid #dddddd; }
          th, td { text-align: left; padding: 8px; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="content">
            <p>Dear ${employee.firstName} ${employee.lastName},</p>
            <p>This is a reminder that you have not completed the required <span class="highlight">${expectedHours} hours</span> of work for the week ending on <span class="highlight">${latestEndDate}</span>.</p>
            
            <p>Here is your daily work hour breakdown for the week:</p>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Hours Worked</th>
                </tr>
              </thead>
              <tbody>
                ${dateWiseHours.map(({ date, totalHours }) => `
                  <tr>
                    <td>${date}</td>
                    <td>${totalHours}</td>
                  </tr>
                `).join('')}
                <tr>
                  <td><b>Total</b></td>
                  <td><b>${totalHoursWorked} hrs</b></td>
                </tr>
              </tbody>
            </table>
            
            <p>Please make sure to complete your working hours in the future to maintain your attendance record.</p>
          </div>
          <p style="color: #333333;">Best regards,<br>PragetX Support Team</p>
          <div class="footer">
            This is an automated message. Please do not reply to this email.
          </div>
        </div>
      </body>
      </html>
    `
  };
};

// Process timesheet entries
const processTimeSheetEntries = (timeSheets) => {
  const aggregateHours = timeSheets.reduce((acc, entry) => {
    const totalHours = convertToDecimalHours(entry.hours);
    acc[entry.date] = (acc[entry.date] || 0) + totalHours;
    return acc;
  }, {});

  return Object.entries(aggregateHours).map(([date, totalHours]) => ({
    date: formatDisplayDate(date),
    totalHours: formatDecimalToHourMinute(totalHours)
  }));
};

// Weekly timesheet check main function
const weeklyTimeSheetCheck = async () => {
  try {
    const startOfWeek = moment().startOf('week').add(1, 'days').format('YYYY-MM-DD'); // Monday
    const endOfWeek = moment().endOf('week').subtract(1, 'days').format('YYYY-MM-DD'); // Friday
    const adjustedEndOfWeek = moment(endOfWeek).add(2, 'days').format('YYYY-MM-DD');

    console.log(`Checking weekly timesheets for the week [${startOfWeek} - ${endOfWeek}]`);

    const employees = await Employees.findAll({
      where: { isActive: true },
      attributes: ['id', 'employee_code', 'email', 'firstName', 'lastName'],
      include: [{
        model: Role,
        as: 'role',
        attributes: ['name'],
        where: { [Op.not]: [{ name: constants.ADMIN }] }
      }]
    });

    if (!employees.length) {
      console.log('No active employees found.');
      return;
    }

    await Promise.all(employees.map(async (employee) => {
      try {
        // Calculate working days
        const weekdays = await calculateWorkingDays(employee.id, startOfWeek, endOfWeek);

        // Get extra working days
        const extraDays = await ExtraWorkingDays.findAll({
          where: {
            [Op.or]: [
              { extraDayDate: { [Op.between]: [startOfWeek, adjustedEndOfWeek] } },
              { shiftedFromDate: { [Op.between]: [startOfWeek, adjustedEndOfWeek] } }
            ]
          }
        });

        const { extraWorkingDays, excludedDays } = processExtraWorkingDays(extraDays);

        // Calculate total working days
        const adjustedExtraDays = Array.from(extraWorkingDays).filter(date => !excludedDays.has(date));
        const totalWorkingDays = weekdays + 
          adjustedExtraDays.length - 
          Array.from(excludedDays).filter(date => !extraWorkingDays.has(date)).length;

        if (totalWorkingDays === 0) return;

        const expectedHours = totalWorkingDays * constants.DAILY_WORKING_HOURS;

        // Get timesheet entries
        const timeSheets = await TimeSheet.findAll({
          where: {
            employeeId: employee.id,
            date: { [Op.between]: [startOfWeek, adjustedEndOfWeek] }
          }
        });

        const dateWiseHours = processTimeSheetEntries(timeSheets);
        const totalDecimalHours = dateWiseHours.reduce(
          (acc, { totalHours }) => acc + convertToDecimalHours(totalHours),
          0
        );

        const totalHoursWorked = formatDecimalToHourMinute(totalDecimalHours);

        if (totalDecimalHours < expectedHours) {
          console.log(`Total hours worked by ${employee.firstName} ${employee.lastName} is less than expected.`);

          const allRelevantDates = new Set([endOfWeek, ...Array.from(extraWorkingDays)]);
          const latestEndDate = moment.max(Array.from(allRelevantDates).map(date => moment(date))).format('YYYY-MM-DD');

          const { subject, body } = generateEmailContent(
            employee,
            dateWiseHours,
            totalHoursWorked,
            expectedHours,
            startOfWeek,
            latestEndDate
          );

          await sendMail(employee.email, subject, body, [], null);
        }
      } catch (error) {
        console.error(`Error processing employee ${employee.id}:`, error);
      }
    }));
  } catch (error) {
    console.error('Error in weeklyTimeSheetCheck:', error);
    throw error;
  }
};

module.exports = {
  unlinkFiles,
  formatHoursToHHMM,
  formatTimeTo12Hour,
  // employeeMonthlyAttendance,
  fetchMonthlyAttendance,
  checkProbationEnding,
  dailyTimeLogCheck,
  distributeMonthlyLeaves,
  authenticateOdoo,
  fetchTimesheets,
  calculateWorkingDays,
  weeklyTimeSheetCheck,
};
