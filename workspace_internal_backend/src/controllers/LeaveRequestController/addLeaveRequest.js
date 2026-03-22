const {
  statusCode,
  constants,
  responseMessage,
  errorResponseFunc,
  successResponseFunc,
  logger,
  LeaveRequest,
  LeaveBalance,
  moment,
  LeaveInfo,
  Holiday,
  sendEmail,
  Op,
  Employees,
} = require("./leaveRequestPackageCentral");

const addLeaveRequest = async (req, res) => {
  try {
    const EmployeeId = req.loggersId;
    const { startDate, endDate, numberOfDays, reason, 
      // leaveType,
       leaveInfo } = req.body;
    if (
      !startDate ||
      !endDate ||
      !numberOfDays ||
      !reason ||
      !EmployeeId ||
      !leaveInfo 
      // !leaveType
    ) {
      logger.warn(
        errorResponseFunc(
          "There is no request body.",
          "No request body.",
          statusCode.badRequest,
          constants.BADREQUEST
        )
      );
      return res
        .status(statusCode.badRequest)
        .send(
          errorResponseFunc(
            "There is no request body.",
            "No request body.",
            statusCode.badRequest,
            constants.BADREQUEST
          )
        );
    } else {
      const existingLeaveRequest = await LeaveRequest.findOne({
        where: {
          employeeId: EmployeeId,
          startDate: startDate,
          endDate: endDate,
          status: {
            [Op.or]: [constants.PENDING, constants.APPROVED],
          },
        },
      });

      if (existingLeaveRequest) {
        return res
          .status(statusCode.badRequest)
          .send(
            errorResponseFunc(
              "Leave request already exists for these dates with status pending or approved",
              "Duplicate leave request",
              statusCode.badRequest,
              constants.BADREQUEST
            )
          );
      }

      const leaveBalance = await LeaveBalance.findOne({
        where: {
          employeeId: EmployeeId,
        },
      });
      const leave = await LeaveRequest.create({
        startDate: startDate,
        endDate: endDate,
        balance: leaveBalance.balance,
        numberOfDays: numberOfDays,
        reason: reason,
        // leaveType: leaveType,
        employeeId: EmployeeId,
        isActive: constants.ACTIVE,
      });

      const leaveInfoData = leaveInfo.map((entry) => ({
        leaveId: leave.id,
        date: entry.date,
        workingShift: entry.selectedDuration,
        // fromTime: entry.selectedDuration === constants.HALF_LEAVE ? entry.fromTime : null,
        // toTime: entry.selectedDuration === constants.HALF_LEAVE ? entry.toTime : null,
      }));

      const reportingPerson = await Employees.findOne({
        where: { id: EmployeeId },
        include: {
          model: Employees,
          as: "reportToPerson",
          attributes: ["email"],
        },
        attributes: ["id", "email"],
      });
      // let email = reportingPerson.email;
      const generateLeaveRequestEmail = (
        employeeName,
        leaveInfo,
        reason,
        numberOfDays
      ) => {
        const subject = `Leave Request`;

        const formatDate = (date) => {
          return new Date(date).toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        };

        const generateTableRows = () => {
          let rows = leaveInfo
            .map(
              (info) => `
            <tr>
              <td>${formatDate(info.date)}</td>
              <td>${info.selectedDuration}</td>
            </tr>
          `
            )
            .join("");

          rows += `
            <tr>
              <td><strong>Total Leave Days</strong></td>
              <td><strong>${numberOfDays}</strong></td>
            </tr>
          `;

          return rows;
        };

        const emailBody = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; padding: 20px; }
              h2 { color: #2c3e50; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              th, td { padding: 12px; border: 1px solid #ddd; text-align: left; }
              th { background-color: #dedede; font-weight: bold; }
              .reason { background-color: #f2f2f2; padding: 15px; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <p>Respected Sir/Madam,</p>
              <p>I hope this email finds you in good health. I am writing to request leave as per the following details:</p>
              
              <table>
                <tr>
                  <th>Date</th>
                  <th>Duration</th>
                </tr>
                ${generateTableRows()}
              </table>
      
              <div class="reason">
                <strong>Reason for Leave:</strong>
                <p>${reason}</p>
              </div>
      
              <p>Regards,<br>${employeeName}</p>
            </div>
          </body>
          </html>
        `;

        return { subject, emailBody };
      };

      const { subject, emailBody } = generateLeaveRequestEmail(
        req.name,
        leaveInfo,
        reason,
        numberOfDays
      );
      const reportTo = reportingPerson.reportToPerson.dataValues.email;
      let cc = process.env.ccEmails ? process.env.ccEmails.split(",") : [];
      if (!cc.includes(reportTo)) {
        cc.push(reportTo);
      }
      cc = cc.join(",");


      sendEmail(process.env.hrEmail, subject, emailBody, cc, leave.id);

      await LeaveInfo.bulkCreate(leaveInfoData);
      return res
        .status(statusCode.created)
        .send(
          successResponseFunc(
            "Leave Request created successfully.",
            statusCode.created,
            constants.CREATED
          )
        );
    }
  } catch (err) {
    logger.error(
      errorResponseFunc(
        "Encountered some error.",
        err.toString(),
        statusCode.internalServerError,
        constants.ERROR
      )
    );
    return res
      .status(statusCode.internalServerError)
      .send(
        errorResponseFunc(
          "Encountered some error.",
          err.toString(),
          statusCode.internalServerError,
          constants.ERROR
        )
      );
  }
};

const leaveTypeSummary = async (req, res) => {
  try {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const leaveRequestId = req.body.leaveRequestId;
    const leaveDays = [];

    const isWeekend = (date) => {
      const day = moment(date).day();
      return day === 0 || day === 6;
    };
    const totalHolidays = await Holiday.findAll({
      attributes: ["date"],
    });

    const holidays = totalHolidays.map((e) => e.dataValues.date);
    const isHoliday = (date) => {
      return holidays.includes(date);
    };

    let currentDate = moment(startDate);

    while (currentDate.isSameOrBefore(endDate)) {
      let selectedDuration = "Full Day";
      if (isHoliday(currentDate.format("YYYY-MM-DD"))) {
        selectedDuration = "Holiday";
      } else if (isWeekend(currentDate.format("YYYY-MM-DD"))) {
        selectedDuration = "Weekend";
      }

      leaveDays.push({
        date: currentDate.format("YYYY-MM-DD"),
        selectedDuration: selectedDuration,
        isHoliday: isHoliday(currentDate.format("YYYY-MM-DD")),
        isWeekend: isWeekend(currentDate.format("YYYY-MM-DD")),
      });

      currentDate = currentDate.add(1, "days");
    }

    if (leaveRequestId) {
      const leaveInfo = await LeaveInfo.findAll({
        where: {
          leaveId: leaveRequestId,
        },
      });

      leaveDays.forEach((day) => {
        const matchingLeaveInfo = leaveInfo.find(
          (info) => info.date === day.date
        );
        if (matchingLeaveInfo) {
          day.selectedDuration = matchingLeaveInfo.workingShift;
          day.isHoliday = matchingLeaveInfo.isHoliday;
          day.isWeekend = matchingLeaveInfo.isWeekend;
        }
      });
    }

    const result = {
      leaveDays: leaveDays,
    };

    return res.send(
      successResponseFunc(
        "Leave type summary successfully.",
        statusCode.success,
        constants.SUCCESS,
        result
      )
    );
  } catch (err) {
    logger.error(
      errorResponseFunc(
        "Encountered some error.",
        err.toString(),
        statusCode.internalServerError,
        constants.ERROR
      )
    );
    return res
      .status(statusCode.internalServerError)
      .send(
        errorResponseFunc(
          "Encountered some error.",
          err.toString(),
          statusCode.internalServerError,
          constants.ERROR
        )
      );
  }
};

module.exports = { addLeaveRequest, leaveTypeSummary };
