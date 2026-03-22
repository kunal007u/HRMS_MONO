const {
  statusCode,
  constants,
  responseMessage,
  errorResponseFunc,
  successResponseFunc,
  logger,
  Resignation,
} = require("./ResignationPackageCentral");

const updateResignation = async (req, res) => {
  try {
    const resignationId = req.params.id;
    const description = req.body.description;
    const employeeId = req.loggersId;

    const resignation = await Resignation.findByPk(resignationId);
    if (!description || !employeeId ) {
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
      if (!resignation) {
        logger.warn(
          errorResponseFunc(
            "Resignation not found.",
            responseMessage.notFound,
            statusCode.notFound,
            constants.NOTFOUND
          )
        );
        return res
          .status(statusCode.notFound)
          .send(
            errorResponseFunc(
              "Resignation not found.",
              responseMessage.notFound,
              statusCode.notFound,
              constants.NOTFOUND
            )
          );
      } else {
        await Resignation.update(
          {
            description: description,
          },
          { where: { id: resignationId } }
        );
        return res
          .status(statusCode.success)
          .send(
            successResponseFunc(
              "Resignation updated successfully.",
              responseMessage.success,
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

const updateResignationStatus = async (req, res) => {
  try {
    const resignationId = req.params.id;
    const status = req.body.status;
    const acceptedDate = new Date();
    const modifiedBy = req.loggersId;
    const remark = req.body.remark;
    const resignation = await Resignation.findByPk(resignationId);
    if (!status) {
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
      if (!resignation) {
        logger.warn(
          errorResponseFunc(
            "Resignation not found.",
            responseMessage.notFound,
            statusCode.notFound,
            constants.NOTFOUND
          )
        );
        return res
          .status(statusCode.notFound)
          .send(
            errorResponseFunc(
              "Resignation not found.",
              responseMessage.notFound,
              statusCode.notFound,
              constants.NOTFOUND
            )
          );
      } else {
        await Resignation.update(
          {
            status: status,
            modifiedBy: modifiedBy,
            acceptedDate:acceptedDate,
            ...(status === constants.REJECTED && { remark: remark })
          },
          { where: { id: resignationId } }
        );
        return res
          .status(statusCode.success)
          .send(
            successResponseFunc(
              `Resignation ${status} successfully.`,
              responseMessage.success,
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

module.exports = { updateResignation, updateResignationStatus };
