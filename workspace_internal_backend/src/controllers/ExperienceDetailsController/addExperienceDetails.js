const {
  statusCode,
  constants,
  ExperienceDetails,
  responseMessage,
  errorResponseFunc,
  successResponseFunc,
  logger,
} = require("./experienceDetailsPackageCentral");

const addExperienceDetails = async (req, res) => {
  try {
    let EmployeeId =
      req.query.employeeId === "" ? req.loggersId : req.query.employeeId;
    if (!EmployeeId) {
      logger.warn(
        errorResponseFunc(
          "Invalid EmployeeId",
          responseMessage.notFound,
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
      return res.status(statusCode.notFound).send(
        errorResponseFunc(
          "Invalid EmployeeId",
          responseMessage.notFound,
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
    } else {
      let payload = req.body;
      let message;
      let StatusCode;
      let Constants;
      for (const key in payload) {
        if (payload.hasOwnProperty(key)) {
          const experienceDetails = await ExperienceDetails.findOne({
            where: {
              employeeId: EmployeeId,
              experienceId: key,
            },
          });

          const value = payload[key];
          const periodTo = value.periodTo === "" ? null : value.periodTo;
          if (!experienceDetails) {
            message = "Experience Details created successfully";
            StatusCode = statusCode.created,
            Constants = constants.CREATED;

            await ExperienceDetails.create({
              companyName: value.companyName,
              designation: value.designation,
              location: value.location,
              periodFrom: value.periodFrom,
              periodTo: periodTo,
              employeeId: EmployeeId,
              isActive: constants.ACTIVE,
              experienceId: key,
            });
          } else {
            message = "Experience Details updated successfully";
            StatusCode = statusCode.success,
            Constants = constants.SUCCESS;
            const value = payload[key];
            await ExperienceDetails.update(
              {
                companyName: value.companyName,
                designation: value.designation,
                location: value.location,
                periodFrom: value.periodFrom,
                periodTo: periodTo,
              },
              {
                where: { employeeId: EmployeeId, experienceId: key },
              }
            );
          }
        }
      }
      return res.status(StatusCode).send(
        successResponseFunc(
          message,
          StatusCode,
          Constants
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

module.exports = { addExperienceDetails };
