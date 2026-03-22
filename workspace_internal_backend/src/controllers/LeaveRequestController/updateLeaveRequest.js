const {
  statusCode,
  constants,
  LeaveRequest,
  responseMessage,
  errorResponseFunc,
  successResponseFunc,
  logger,
  Employees,
  LeaveBalance,
  LeaveInfo,
  sendEmail,
  moment
} = require("./leaveRequestPackageCentral");

const updateLeaveRequest = async (req, res) => {
  try {
    const leaveRequestId = req.params.leaveRequestId;
    const { startDate, endDate, numberOfDays, reason, 
      // leaveType,
       dateRange } = req.body;

    const leaveRequest = await LeaveRequest.findByPk(leaveRequestId);
    if (!leaveRequest) {
      logger.warn(
        errorResponseFunc(
          "Leave request not found.",
          responseMessage.notFound,
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
      return res.status(statusCode.notFound).send(
          errorResponseFunc(
            "Leave request not found.",
            responseMessage.notFound,
            statusCode.notFound,
            constants.NOTFOUND
          )
        );
    } else {
      if (!startDate || !endDate || !numberOfDays || !reason || !dateRange 
        // || !leaveType
      ) {
        logger.warn(
          errorResponseFunc(
            "There is no request body.",
            "No request body.",
            statusCode.badRequest,
            constants.BADREQUEST
          )
        );
        return res.status(statusCode.badRequest).send(
            errorResponseFunc(
              "There is no request body.",
              "No request body.",
              statusCode.badRequest,
              constants.BADREQUEST
            )
          );
      }
      const leaveInfos = await LeaveInfo.findAll({
        where: { leaveId: leaveRequest.id }
      });

      for (const leaveInfo of leaveInfos) {
        await leaveInfo.destroy();
      }

      const leaveInfoData = dateRange.map((entry) => ({
        leaveId: leaveRequest.id,
        date: entry.date,
        workingShift: entry.selectedDuration,
        // fromTime: entry.fromTime,
        // toTime: entry.toTime,
      }));

      await LeaveInfo.bulkCreate(leaveInfoData);
      await LeaveRequest.update(
        {
          startDate: startDate,
          endDate: endDate,
          numberOfDays: numberOfDays,
          reason: reason,
          // leaveType: leaveType,
        },
        { where: { id: leaveRequestId } }
      );
      return res.status(statusCode.success).send(
          successResponseFunc(
            "Leave request updated successfully.",
            responseMessage.success,
            statusCode.success,
            constants.SUCCESS
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
    return res.status(statusCode.internalServerError).send(
        errorResponseFunc(
          "Encountered some error.",
          err.toString(),
          statusCode.internalServerError,
          constants.ERROR
        )
      );
  }
};

const updateLeaveRequestStatus = async (req, res) => {
  try {
    const approvedBy = req.loggersId;
    const leaveRequestId = req.params.leaveRequestId;
    const status = req.body.status;
    const remark = req.body.remark;

    const leaveRequest = await LeaveRequest.findByPk(leaveRequestId);
    if (!leaveRequest) {
      logger.warn(
        errorResponseFunc(
          "Leave request not found.",
          responseMessage.notFound,
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
      return res.status(statusCode.notFound).send(
          errorResponseFunc(
            "Leave request not found.",
            responseMessage.notFound,
            statusCode.notFound,
            constants.NOTFOUND
          )
        );
    } else {
      if (!status) {
        logger.warn(
          errorResponseFunc(
            "There is no request body.",
            "No request body.",
            statusCode.badRequest,
            constants.BADREQUEST
          )
        );
        return res.status(statusCode.badRequest).send(
            errorResponseFunc(
              "There is no request body.",
              "No request body.",
              statusCode.badRequest,
              constants.BADREQUEST
            )
          );
      }
      const leaveBalance = await LeaveBalance.findOne({
        where: {
          employeeId: leaveRequest.employeeId,
        },
      });

      if (status === constants.APPROVED) {
        if (leaveRequest.status !== status) {
          if (Number(leaveBalance.balance) >= Number(leaveRequest.numberOfDays)) {
            let leave = Number(leaveBalance.balance) - Number(leaveRequest.numberOfDays);
            let paidLeave = Number(leaveBalance.paidLeave) + Number(leaveRequest.numberOfDays);

            await LeaveRequest.update(
              {
                paidLeave: Number(leaveRequest.numberOfDays),
              },
              { where: { id: leaveRequest.id } }
            )
            await LeaveBalance.update(
              {
                balance: leave,
                paidLeave: paidLeave,
              },
              { where: { employeeId: leaveRequest.employeeId } }
            );
          } else {
            let leaveDaysExceedingBalance =
              Number(leaveRequest.numberOfDays) - Number(leaveBalance.balance);
          let paidLeave = Number(leaveBalance.paidLeave) + Number(leaveBalance.balance);
            let lossOfpay = leaveDaysExceedingBalance;

            await LeaveRequest.update(
              {
                paidLeave: Number(leaveBalance.balance),
                lossOfPay: Number(lossOfpay),
              },
              { where: { id: leaveRequest.id } }
            );

            await LeaveBalance.update(
              {
                balance: 0,
                paidLeave: paidLeave,
                lossOfPay: Number(leaveBalance.lossOfPay) + Number(lossOfpay),
              },
              { where: { employeeId: leaveRequest.employeeId } }
            );
          }
        }
      } else if (status === constants.CANCELLED) {
       if (leaveRequest.status !== status && leaveRequest.status === constants.APPROVED) {
        if (Number(leaveRequest.balance) >= Number(leaveRequest.numberOfDays)) {
          let leave = Number(leaveBalance.balance) + Number(leaveRequest.numberOfDays);
          let paidLeave = Number(leaveBalance.paidLeave) - Number(leaveRequest.numberOfDays);

            await LeaveRequest.update(
              {
                paidLeave: Number(0.0),
              },
              { where: { id: leaveRequest.id } }
            );

            await LeaveBalance.update(
              {
                balance: leave,
                paidLeave: paidLeave,
              },
              { where: { employeeId: leaveRequest.employeeId } }
            );
          } else {
          let balance = Number(leaveBalance.balance) + Number(leaveRequest.balance);
            let leaveDaysExceedingBalance =
              Number(leaveRequest.numberOfDays) - Number(leaveRequest.balance);
          let paidLeave = Number(leaveBalance.paidLeave) - Number(leaveRequest.balance);
            let lossOfpay = leaveDaysExceedingBalance;

            await LeaveRequest.update(
              {
                paidLeave: Number(0.0),
              lossOfPay: Number(0.0)
              },
              { where: { id: leaveRequest.id } }
            );

            await LeaveBalance.update(
              {
                balance: balance,
                paidLeave: paidLeave,
                lossOfPay: Number(leaveBalance.lossOfPay) - Number(lossOfpay),
              },
              { where: { employeeId: leaveRequest.employeeId } }
            );
          }
        }
      }

      const employeeName = await Employees.findOne({
        where: { id: leaveRequest.employeeId },
        attributes: ["id", "firstName", "lastName",],
      });
      let [affectedRows, updatedLeaveInfo] = await LeaveRequest.update(
        {
          approvedBy: approvedBy,
          status: status,
          ...(remark && { remark: remark }),
        },
        { where: { id: leaveRequestId }, returning: true }
      );
      let subject = `Your Leave Request Has Been ${ status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() }`;

      let emailBody = `<!DOCTYPE html>
           <html lang="en">
           <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>Leave Request Status Update</title>
           <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;  
                    margin: 0;
                    padding: 20px;
                }
                .email-container {
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
        .content {
            margin: 20px 0;
            line-height: 1.6;
            color: #333333;
        }
        .footer {
             margin-top: 20px;
             font-size: 12px;
             color: #777777;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="content">
            <p>Dear ${employeeName.firstName} ${employeeName.lastName},</p>
            <p>We wanted to inform you that the status of your leave request has been ${status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}. Please find the details below:</p>
            <ul>
                <li><strong>Leave Dates:</strong> ${moment(leaveRequest.dataValues.startDate).format("DD-MM-YYYY")} to ${moment(leaveRequest.dataValues.endDate).format("DD-MM-YYYY")}</li>
                ${remark ? `<li><strong>Remark:</strong> ${remark}</li>` : ''}
            </ul>
            <p>If you have any questions or concerns, please feel free to contact the HR department.</p>
            <p>Best regards,<br>PragetX Support Team</p>
        </div>
         <div class="footer">
                    This is an automated message. Please do not reply to this email.
         </div>
    </div>
</body>
</html>
`;

        sendEmail(
          process.env.hrEmail,
          subject,
          emailBody,
          process.env.ccEmails,
          leaveRequestId
        );
      return res
        .status(statusCode.success)
        .send(
          successResponseFunc(
          `Leave request ${ status } successfully.`,
            responseMessage.success,
            statusCode.success,
            constants.SUCCESS
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
    return res.status(statusCode.internalServerError).send(
        errorResponseFunc(
          "Encountered some error.",
          err.toString(),
          statusCode.internalServerError,
          constants.ERROR
        )
      );
  }
};

module.exports = { updateLeaveRequest, updateLeaveRequestStatus };