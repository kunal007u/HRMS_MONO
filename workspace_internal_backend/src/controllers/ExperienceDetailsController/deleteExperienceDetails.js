const {
  statusCode,
  constants,
  ExperienceDetails,
  responseMessage,
  errorResponseFunc,
  successResponseFunc,
  logger,
} = require("./experienceDetailsPackageCentral");

const deleteExperienceDetails = async (req, res) => {
  try {
    let EmployeeId = req.query.employeeId ? req.query.employeeId : req.loggersId;
    const ExperienceId = req.query.experienceId;

    if (!EmployeeId) {
      logger.warn(
        errorResponseFunc(
          "Invalid Employee",
          responseMessage.notFound,
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
      return res.status(statusCode.notFound).send(
        errorResponseFunc(
          "Invalid Employee",
          responseMessage.notFound,
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
    } else {
      if (!ExperienceId) {
        logger.warn(
          errorResponseFunc(
            "Please add the ExperienceId fields.",
            "Empty fields.",
            statusCode.badRequest,
            constants.BADREQUEST
          )
        );
        return res.status(statusCode.badRequest).send(
          errorResponseFunc(
            "Please add the ExperienceId fields.",
            "Empty fields.",
            statusCode.badRequest,
            constants.BADREQUEST
          )
        );
      } else {
        const experienceDetails = await ExperienceDetails.findOne({
          where: {
            employeeId: EmployeeId,
            experienceId: ExperienceId,
          },
        });

        if (!experienceDetails) {
          logger.warn(
            errorResponseFunc(
              "This experience Details dose not exist",
              responseMessage.notFound,
              statusCode.notFound,
              constants.NOTFOUND
            )
          );
          return res.status(statusCode.notFound).send(
            errorResponseFunc(
              "This experience Details dose not exist",
              responseMessage.notFound,
              statusCode.notFound,
              constants.NOTFOUND
            )
          );
        }
        await experienceDetails.destroy();

        return res.status(statusCode.success).send(
          successResponseFunc(
            `experience Details deleted successfully`,
            statusCode.success,
            constants.SUCCESS
          )
        );
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

module.exports = { deleteExperienceDetails };
