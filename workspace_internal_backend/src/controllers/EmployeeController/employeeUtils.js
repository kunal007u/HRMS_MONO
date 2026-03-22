const {
  Employees,
  constants,
  temporaryPasswordString,
  sendEmail,
  unlinkFiles,
  LeaveBalance,
} = require("./employeePackageCentral");

const employeeCreatorFunc = (adminDetails, files) => {
  return new Promise((resolve, reject) => {
    try {
      const password = temporaryPasswordString();
      Employees.create({
        email: adminDetails.email.toLowerCase(),
        password: password,
        isActive: constants.ACTIVE,
        roleId: adminDetails.roleId,
        firstName: adminDetails.firstName,
        middleName: adminDetails.middleName,
        lastName: adminDetails.lastName,
        dateOfJoining: adminDetails.dateOfJoining,
        phoneNumber: adminDetails.phoneNumber,
        departmentId: adminDetails.departmentId,
        designationId: adminDetails.designationId,
        pancardNo: adminDetails.pancardNo,
        aadharNo: adminDetails.aadharNo,
        uanNo: adminDetails.uanNo,
        workLocation: adminDetails.workLocation,
        pfNo: adminDetails.pfNo,
        gender: adminDetails.gender,
        currentAddress: adminDetails.currentAddress,
        permanentAddress: adminDetails.permanentAddress,
        reportTo: adminDetails.reportTo,
        profilePicture: adminDetails.profilePicture,
        employee_code: adminDetails.employee_code,
        employeeType: adminDetails.employeeType,
        isProbationCompleted: adminDetails.isProbationCompleted,
        ...(adminDetails.probationEndDate && {probationEndDate: adminDetails.probationEndDate}),
      })
        .then(async (data) => {
          try {
            let employeeData = await Employees.findOne({
              where: {
                email: data?.email,
              },
            });

            await LeaveBalance.create({
              employeeId: employeeData?.id,
              balance: 0,
              isActive: constants.ACTIVE,
            });

            const subject = " Account Creation";
            const emailBody =
            `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Admin Account Created</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333333;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .credentials {
                        background-color: #f1f3f4;
                        padding: 15px;
                        border-radius: 4px;
                        margin: 20px 0;
                    }
                    .warning {
                        color: #d93025;
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
                <h2>Dear ${adminDetails.firstName},</h2>
                
                <p>We are pleased to inform you that your account has been successfully created. Below are your login credentials:</p>
                
                <div class="credentials">
                    <p><strong>Email:</strong> ${adminDetails.email}</p>
                    <p><strong>Password:</strong> ${password}</p>
                </div>
                
                <p class="warning">Important: For security reasons, please take the following actions immediately:</p>
                <ol>
                    <li>Log in to your account using the provided credentials.</li>
                    <li>Change your password to a strong, unique password that only you know.</li>
                </ol>
                
                <p>Please note that you should never share your login information with anyone. Our IT staff will never ask for your password.</p>
                
                <p>If you have any questions or concerns, please contact the support team.</p>
                
                <p>Welcome aboard, and thank you for your commitment to maintaining the security of our systems.</p>
                
                <p>Best regards,<br>PragetX Support Team</p>
                
                <div class="footer">
                    This is an automated message. Please do not reply to this email.
                </div>
            </body>
            </html>`;
            await sendEmail(adminDetails.email, subject, emailBody, null, employeeData.id);
            resolve(null);
          } catch (err) {
            reject(err);
          }
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      unlinkFiles(files);
      reject(err);
    }
  });
};

module.exports = { employeeCreatorFunc };
