const {
    EmergencyContacts,
    statusCode,
    constants,
    responseMessage,
    errorResponseFunc,
    successResponseFunc,
    logger,
  } = require("./emergencyContactPackageCentral");
  
  const deleteEmergencyContacts = async (req, res) => {
    try {
      let EmployeeId =
        req.query.employeeId === ""
          ? req.loggersId
          : req.query.employeeId;
  
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
          const emergencyContacts = await EmergencyContacts.findOne({
            where: {
              employeeId: EmployeeId,
            },
          });
  
          if (!emergencyContacts) {
            logger.warn(
              errorResponseFunc(
                "This Emergency contacts dose not exist",
                responseMessage.notFound,
                statusCode.notFound,
                constants.NOTFOUND
              )
            );
            return res.status(statusCode.notFound).send(
              errorResponseFunc(
                "This Emergency contacts dose not exist",
                responseMessage.notFound,
                statusCode.notFound,
                constants.NOTFOUND
              )
            );
          }
          await emergencyContacts.destroy();
  
          return res.status(statusCode.success).send(
            successResponseFunc(
              `Emergency contacts deleted successfully`,
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
  
  module.exports = { deleteEmergencyContacts };
  