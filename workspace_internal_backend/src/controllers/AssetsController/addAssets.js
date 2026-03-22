const {
  statusCode,
  constants,
  Assets,
  responseMessage,
  errorResponseFunc,
  successResponseFunc,
  logger,
  temporaryPasswordString,
  unlinkFiles,
} = require("./assetsPackageCentral");

const addAssets = async (req, res) => {
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
        assetsName: req.body.assetsName,
        assetsId: temporaryPasswordString(),
        assignedDate: req.body.assignedDate,
        quantity: req.body.quantity,
        description: req.body.description,
        employeeId: EmployeeId,
        isActive: constants.ACTIVE,
      };
      if (
        !payload.assetsId ||
        !payload.assetsName ||
        !payload.assignedDate || 
        !payload.quantity ||
        !payload.description
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
      } else {
        await Assets.create({ ...payload });
        return res.status(statusCode.created).send(
          successResponseFunc(
            `Assets added successfully`,
            statusCode.created,
            constants.CREATED
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

module.exports = { addAssets };
