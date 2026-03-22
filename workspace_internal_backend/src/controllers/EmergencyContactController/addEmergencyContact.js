const {
  EmergencyContacts,
  statusCode,
  constants,
  responseMessage,
  errorResponseFunc,
  successResponseFunc,
  logger,
} = require("./emergencyContactPackageCentral");

const addEmergencyContacts = async (req, res) => {
  try {
    let EmployeeId =
      req.query.employeeId === "" ? req.loggersId : req.query.employeeId;

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
      let payload = {
        primaryName: req.body.primaryName,
        primaryRelationship: req.body.primaryRelationship,
        primaryPhoneNo: req.body.primaryPhoneNo,
        primaryAddress: req.body.primaryAddress,
        secondaryName: req.body.secondaryName,
        secondRelationship: req.body.secondRelationship,
        secondaryPhoneNo: req.body.secondaryPhoneNo,
        secondaryAddress: req.body.secondaryAddress,
      };
      const emergencyContacts = await EmergencyContacts.findOne({
        where: {
          employeeId: EmployeeId,
        },
      });
      if (emergencyContacts) {
        await EmergencyContacts.update(
          {
            ...payload,
          },
          {
            where: { employeeId: EmployeeId },
          }
        );
        return res.status(statusCode.success).send(
          successResponseFunc(
            `Emergency contacts details updated successfully`,

            statusCode.success,
            constants.SUCCESS
          )
        );
      }
      await EmergencyContacts.create({
        ...payload,
        employeeId: EmployeeId,
        isActive: constants.ACTIVE,
      });
      return res.status(statusCode.created).send(
        successResponseFunc(
          `Emergency contacts details added successfully`,
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

module.exports = { addEmergencyContacts };
