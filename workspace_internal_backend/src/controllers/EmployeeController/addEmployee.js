const {
  Employees,
  Role,
  statusCode,
  constants,
  successResponseFunc,
  errorResponseFunc,
  unlinkFiles,
  logger,
  LeaveBalance,
  uploadFile,
} = require("./employeePackageCentral");

const { employeeCreatorFunc } = require("./employeeUtils");
const addEmployee = (req, res) => {
  try {
    logger.info("/addEmployee route accessed.");
    const { files = [] } = req;
    if (Object.keys(req.body).length === 0) {
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
      const {
        firstName,
        email,
        middleName,
        lastName,
        dateOfJoining,
        phoneNumber,
        departmentId,
        designationId,
        pancardNo,
        aadharNo,
        uanNo,
        workLocation,
        pfNo,
        gender,
        roleId,
        reportTo,
        employeeCode,
        employeeType,
        endingDate,
      } = req.body;
      const isProbationCompleted =
        employeeType === constants.PERMANENT ? true : false;
      const authRoleId = req.roleId;

      if (
        !firstName ||
        !lastName ||
        !email ||
        !dateOfJoining ||
        !phoneNumber ||
        !departmentId ||
        !designationId ||
        !pancardNo ||
        !aadharNo ||
        !workLocation ||
        !gender ||
        !roleId ||
        !reportTo ||
        !employeeCode ||
        !employeeType
      ) {

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
            email: email.toLowerCase(),
            isActive: constants.ACTIVE,
          },
        })
          .then((data) => {
            if (!data) {
              Role.findOne({
                where: {
                  id: roleId,
                  isActive: constants.ACTIVE,
                },
              })
                .then(async (data) => {
                  try {
                    Role.findOne({
                      where: {
                        id: authRoleId,
                        isActive: constants.ACTIVE,
                      },
                    }).then(async (authRoleData) => {
                      if (
                        (authRoleData.name === "HR" &&
                          data.name === "SUPER ADMIN") ||
                        authRoleData.name === "EMPLOYEE"
                      ) {
                        res
                          .status(statusCode.badRequest)
                          .send(
                            errorResponseFunc(
                              "You dont have permission!",
                              "Account creation error.",
                              statusCode.badRequest,
                              constants.BADREQUEST
                            )
                          );
                      } else {
                        if (data) {
                          let profilePicture = null;
                          if (files.length > 0) {
                            profilePicture = files[0];
                            profilePicture.originalname = `${firstName}${lastName}`;
                            profilePicture = (
                              await uploadFile(profilePicture)
                            ).Location.split("/").pop();
                          }
                          const adminDetails = {
                            email: email,
                            roleId: data.id,
                            isActive: constants.ACTIVE,
                            firstName: firstName,
                            middleName: middleName,
                            lastName: lastName,
                            dateOfJoining: dateOfJoining,
                            phoneNumber: phoneNumber,
                            departmentId: departmentId,
                            designationId: designationId,
                            pancardNo: pancardNo,
                            aadharNo: aadharNo,
                            uanNo: uanNo,
                            workLocation: workLocation,
                            pfNo: pfNo,
                            gender: gender,
                            reportTo: reportTo,
                            profilePicture: profilePicture,
                            employee_code: employeeCode,
                            employeeType: employeeType,
                            probationEndDate: endingDate,
                            isProbationCompleted: isProbationCompleted
                          };

                          await employeeCreatorFunc(adminDetails, req.files);

                          return res
                            .status(statusCode.created)
                            .send(
                              successResponseFunc(
                                `Created successfully.`,
                                statusCode.created,
                                constants.CREATED
                              )
                            );
                        } else {
                          logger.warn(
                            errorResponseFunc(
                              "Role not found.",
                              "Role not found.",
                              statusCode.notFound,
                              constants.NOTFOUND
                            )
                          );
                          return res
                            .status(statusCode.notFound)
                            .send(
                              errorResponseFunc(
                                "Role not found.",
                                "Role not found.",
                                statusCode.notFound,
                                constants.NOTFOUND
                              )
                            );
                        }
                      }
                    });
                  } catch (err) {
                    logger.error(
                      errorResponseFunc(
                        "Encountered error while creating the admin.",
                        err.toString(),
                        statusCode.internalServerError,
                        constants.ERROR
                      )
                    );
                    return res
                      .status(statusCode.internalServerError)
                      .send(
                        errorResponseFunc(
                          "Encountered error while creating the admin.",
                          err.toString(),
                          statusCode.internalServerError,
                          constants.ERROR
                        )
                      );
                  }
                })
                .catch((err) => {
                  logger.error(
                    errorResponseFunc(
                      "Encountered error while checking if this role exists.",
                      err.toString(),
                      statusCode.internalServerError,
                      constants.ERROR
                    )
                  );
                  return res
                    .status(statusCode.internalServerError)
                    .send(
                      errorResponseFunc(
                        "Encountered error while checking if this role exists.",
                        err.toString(),
                        statusCode.internalServerError,
                        constants.ERROR
                      )
                    );
                });
            } else {
              logger.error(
                errorResponseFunc(
                  "Email already exists.",
                  "Already exists.",
                  statusCode.conflict,
                  constants.CONFLICT
                )
              );
              return res
                .status(statusCode.conflict)
                .send(
                  errorResponseFunc(
                    "Email already exists.",
                    "Already exists.",
                    statusCode.conflict,
                    constants.CONFLICT
                  )
                );
            }
          })
          .catch((err) => {
            logger.error(
              errorResponseFunc(
                "Encountered error after checking if this admin exists.",
                err.toString(),
                statusCode.internalServerError,
                constants.ERROR
              )
            );
            return res
              .status(statusCode.internalServerError)
              .send(
                errorResponseFunc(
                  "Encountered error after checking if this admin exists.",
                  err.toString(),
                  statusCode.internalServerError,
                  constants.ERROR
                )
              );
          });
      }
    }
  } catch (err) {
    logger.error(
      errorResponseFunc(
        "Encountered error while syncing the admin table.",
        err.toString(),
        statusCode.internalServerError,
        constants.ERROR
      )
    );
    return res
      .status(statusCode.internalServerError)
      .send(
        errorResponseFunc(
          "Encountered error while syncing the admin table.",
          err.toString(),
          statusCode.internalServerError,
          constants.ERROR
        )
      );
  }
};

module.exports = { addEmployee };
