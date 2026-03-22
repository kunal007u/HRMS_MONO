const {
  Employees,
  statusCode,
  constants,
  errorResponseFunc,
  successResponseFunc,
  bcrypt,
  logger,
  sendEmail,
  jwt,
  TOKEN_SECRET,
  TOKEN_MAXAGE,
  Role,
} = require("./employeePackageCentral");
const { generateToken } = require("./employeeLogin");
const { generateOTP } = require("../../utils/randomString");
const moment = require("moment");


const resetPassword = (req, res) => {
  try {
    logger.info("/resetPassword route accessed.");

    const userId = req.loggersId;
    const currentPassword = req.body.currentPassword;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (!password || !confirmPassword || !currentPassword) {
      logger.warn(
        errorResponseFunc(
          "Please fill all the fields.",
          "Empty fields.",
          statusCode.badRequest,
          constants.BADREQUEST
        )
      );
      return res
        .status(statusCode.badRequest)
        .send(
          errorResponseFunc(
            "Please fill all the fields.",
            "Empty fields.",
            statusCode.badRequest,
            constants.BADREQUEST
          )
        );
    } else {
      Employees.findOne({
        where: {
          id: userId,
          isActive: constants.ACTIVE,
        },
      })
        .then(async (data) => {
          let capUserData = data;
          if (data) {
            const passwordIsValid = bcrypt.compareSync(
              currentPassword,
              capUserData.password
            );
            if (!passwordIsValid) {
              logger.warn(
                errorResponseFunc(
                  "Your current password is incorrect.",
                  "Incorrect password.",
                  statusCode.badRequest,
                  constants.BADREQUEST
                )
              );
              return res
                .status(statusCode.badRequest)
                .send(
                  errorResponseFunc(
                    "Your current password is incorrect.",
                    "Incorrect password.",
                    statusCode.badRequest,
                    constants.BADREQUEST
                  )
                );
            } else {
              if (password !== confirmPassword) {
                logger.warn(
                  errorResponseFunc(
                    "Both passwords does not match.",
                    "Passwords does not match.",
                    statusCode.badRequest,
                    constants.BADREQUEST
                  )
                );
                return res
                  .status(statusCode.badRequest)
                  .send(
                    errorResponseFunc(
                      "Both passwords does not match.",
                      "Passwords does not match.",
                      statusCode.badRequest,
                      constants.BADREQUEST
                    )
                  );
              } else {
                const dataToUpdate = {
                  password: password,
                };
                await Employees.update(dataToUpdate, {
                  where: {
                    id: userId,
                  },
                })
                  .then((data) => {
                    return res
                      .status(statusCode.success)
                      .send(
                        successResponseFunc(
                          "Password updated successfully.",
                          statusCode.success,
                          constants.SUCCESS
                        )
                      );
                  })
                  .catch((err) => {
                    logger.error(
                      errorResponseFunc(
                        "Encountered some error while updating the data.",
                        err.toString(),
                        statusCode.internalServerError,
                        constants.ERROR
                      )
                    );
                    return res
                      .status(statusCode.internalServerError)
                      .send(
                        errorResponseFunc(
                          "Encountered some error while updating the data.",
                          err.toString(),
                          statusCode.internalServerError,
                          constants.ERROR
                        )
                      );
                  });
              }
            }
          } else {
            logger.warn(
              errorResponseFunc(
                "User not found",
                "No user found",
                statusCode.notFound,
                constants.NOTFOUND
              )
            );
            return res
              .status(statusCode.notFound)
              .send(
                errorResponseFunc(
                  "User not found",
                  "No user found",
                  statusCode.notFound,
                  constants.NOTFOUND
                )
              );
          }
        })
        .catch((err) => {
          logger.error(
            errorResponseFunc(
              "Encountered some error while finding the user.",
              err.toString(),
              statusCode.internalServerError,
              constants.ERROR
            )
          );
          return res
            .status(statusCode.internalServerError)
            .send(
              errorResponseFunc(
                "Encountered some error while finding the user.",
                err.toString(),
                statusCode.internalServerError,
                constants.ERROR
              )
            );
        });
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

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Employees.findOne({
      where: { email: email, isActive: constants.ACTIVE },
    });
    if (!user) {
      logger.error(
        errorResponseFunc(
          "Please enter a valid email address.",
          "No user found",
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
      return res
        .status(statusCode.notFound)
        .send(
          errorResponseFunc(
            "Please enter a valid email address",
            "No user found",
            statusCode.notFound,
            constants.NOTFOUND
          )
        );
    }

    const role = await Role.findOne({
      where: { id: user.roleId, isActive: constants.ACTIVE },
    });
    if (!role) {
      return res
        .status(statusCode.notFound)
        .send(
          errorResponseFunc(
            "Role not found.",
            "Such role does not exist.",
            statusCode.notFound,
            constants.NOTFOUND
          )
        );
    }

    const token = await generateToken(user, role);
    const otp = generateOTP();
    await Employees.update(
      {
        otp: otp,
      },
      { where: { id: user.id }, returning: true }
    );
    const subject = "Your OTP for Password Reset";
    const emailBody = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset OTP</title>
          <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
            .otp {
                font-size: 24px;
                font-weight: bold;
                color: #1a73e8;
                padding: 10px;
                background-color: #f1f3f4;
                border-radius: 4px;
                display: inline-block;
              }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #666666;
              }
          </style>
      </head>
      <body>
        <p>Dear ${user.firstName},</p>
    
        <p>We have received a request to reset your account password. To proceed with this action, please use the following One-Time Password (OTP):</p>
    
        <p class="otp">${otp}</p>
    
        <p>To complete the password reset process, please enter this OTP on the designated password reset page.</p>
    
        <p><strong>Important:</strong> For security purposes, please do not share this OTP with anyone. Our staff will never ask you for this code.</p>
    
        <p>If you did not request a password reset, please disregard this email and contact our support team immediately.</p>
    
        <p>Thank you for your attention to this matter.</p>
    
        <p>Best regards,<br>PragetX Support Team</p>
    
        <div class="footer">
            This is an automated message. Please do not reply to this email.
        </div>
      </body>
    </html>
      `;

    await sendEmail(user.email, subject, emailBody);

    return res
      .status(statusCode.success)
      .send(
        successResponseFunc(
          "Email sent successfully.",
          statusCode.success,
          constants.SUCCESS,
          { token }
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

const verifyOtp = async (req, res, next) => {
  try {
    const payload = {
      id: req.loggersId,
      otp: req.body.otp,
    };
    const employeeExist = await Employees.findOne({
      where: {
        id: payload.id,
      },
    });
    if (employeeExist === null) {
      return res
        .status(statusCode.notFound)
        .send(
          errorResponseFunc(
            "User not registered with this email address",
            "User not found",
            statusCode.notFound,
            constants.NOTFOUND
          )
        );
    } else if (employeeExist.otp !== payload.otp) {
      return res
        .status(statusCode.badRequest)
        .send(
          errorResponseFunc(
            "Invalid OTP",
            "Invalid OTP",
            statusCode.badRequest,
            constants.BADREQUEST
          )
        );
    }

    const role = await Role.findOne({
      where: { id: employeeExist.roleId, isActive: constants.ACTIVE },
    });
    if (!role) {
      return res
        .status(statusCode.notFound)
        .send(
          errorResponseFunc(
            "Role not found.",
            "Such role does not exist.",
            statusCode.notFound,
            constants.NOTFOUND
          )
        );
    }

    const token = await generateToken(employeeExist, role);

    await Employees.update(
      {
        otp: null,
      },
      { where: { id: employeeExist.id }, returning: true }
    );

    return res
      .status(statusCode.success)
      .send(
        successResponseFunc(
          "Otp Verified Successfully.",
          statusCode.success,
          constants.SUCCESS,
          { token }
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

const resendOtp = async (req, res, next) => {
  try {
    const payload = {
      id: req.loggersId,
    };

    const employeeExist = await Employees.findOne({
      where: {
        id: payload.id,
      },
    });

    if (employeeExist === null) {
      return res
        .status(statusCode.notFound)
        .send(
          errorResponseFunc(
            "User not registered with this email address",
            "User not found",
            statusCode.notFound,
            constants.NOTFOUND
          )
        );
    }

    const otp = generateOTP();
    await Employees.update(
      {
        otp: otp,
      },
      { where: { id: employeeExist.id }, returning: true }
    );
    const subject = "Your OTP for Password Reset";
    const emailBody = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset OTP</title>
          <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
            .otp {
                font-size: 24px;
                font-weight: bold;
                color: #1a73e8;
                padding: 10px;
                background-color: #f1f3f4;
                border-radius: 4px;
                display: inline-block;
              }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #666666;
              }
          </style>
      </head>
      <body>
        <p>Dear ${employeeExist.firstName},</p>
    
        <p>We have received a request to reset your account password. To proceed with this action, please use the following One-Time Password (OTP):</p>
    
        <p class="otp">${otp}</p>
    
        <p>To complete the password reset process, please enter this OTP on the designated password reset page.</p>
    
        <p><strong>Important:</strong> For security purposes, please do not share this OTP with anyone. Our staff will never ask you for this code.</p>
    
        <p>If you did not request a password reset, please disregard this email and contact our support team immediately.</p>
    
        <p>Thank you for your attention to this matter.</p>
    
        <p>Best regards,<br>PragetX Support Team</p>
    
        <div class="footer">
            This is an automated message. Please do not reply to this email.
        </div>
      </body>
    </html>
      `;

    await sendEmail(employeeExist.email, subject, emailBody);

    return res
      .status(statusCode.success)
      .send(
        successResponseFunc(
          "Email sent successfully.",
          statusCode.success,
          constants.SUCCESS,
          null
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

const verifyPassword = async (req, res) => {
  try {
    const employeeId = req.loggersId;
    const { password, confirmPassword } = req.body;
    if (!password || !confirmPassword) {
      return res
        .status(statusCode.badRequest)
        .send(
          errorResponseFunc(
            "You have to enter password and confirmPassword.",
            "Password and confirmPassword required.",
            statusCode.badRequest,
            constants.BADREQUEST
          )
        );
    } else {
      const user = await Employees.findOne({
        where: { id: employeeId, isActive: constants.ACTIVE },
      });
      if (!user) {
        return res
          .status(statusCode.notFound)
          .send(
            errorResponseFunc(
              "User not found.",
              err.toString(),
              statusCode.notFound,
              constants.NOTFOUND
            )
          );
      } else {
        if (password !== confirmPassword) {
          return res
            .status(statusCode.badRequest)
            .send(
              errorResponseFunc(
                "Both passwords does not match.",
                "Passwords does not match.",
                statusCode.badRequest,
                constants.BADREQUEST
              )
            );
        } else {
          await Employees.update(
            { password: password },
            { where: { id: employeeId } }
          );
          return res
            .status(statusCode.success)
            .send(
              successResponseFunc(
                "Password updated successfully",
                statusCode.success,
                constants.SUCCESS
              )
            );
        }
      }
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

module.exports = {
  resetPassword,
  forgotPassword,
  verifyPassword,
  verifyOtp,
  resendOtp,
};
