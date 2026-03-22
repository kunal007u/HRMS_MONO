const {
  statusCode,
  constants,
  successResponseFunc,
  errorResponseFunc,
  EmployeeDocuments,
  logger,
  uploadFile,
  deleteFile
} = require("./employeeDocumentPackageCentral");

const addEmployeeDocument = async (req, res) => {
  try {
    const { files = [] } = req;
    if (!files.length) {
      logger.warn(
        errorResponseFunc(
          "There is no request body.",
          "No upload files.",
          statusCode.badRequest,
          constants.BADREQUEST
        )
      );
      return res.status(statusCode.badRequest).send(
        errorResponseFunc(
          "There is no request body.",
          "No upload files.",
          statusCode.badRequest,
          constants.BADREQUEST
        )
      );
    }
    const employeeId = req.params.id ? req.params.id : req.loggersId;
    let obj = {
      employeeId
    }
    let name = req.name.split(" ").join("")
    const employeeDocuments = await EmployeeDocuments.findOne({ where: { employeeId } })
    for (const file of files) {
      file.originalname = name;
      if (employeeDocuments && employeeDocuments[file.fieldname]) {
          const oldKey = employeeDocuments[file.fieldname].split('/').pop();
          await deleteFile(oldKey);
      }
      const data = await uploadFile(file);
      obj[file.fieldname] = data.Location.split('/').pop();
    }

    if (!employeeDocuments) {
      await EmployeeDocuments.create(obj);
      return res.status(statusCode.created).send(
        successResponseFunc(
          `Documents uploaded successfully`,
          statusCode.created,
          constants.CREATED
        )
      );
    }

    await EmployeeDocuments.update(obj, { where: { employeeId } });
    return res.status(statusCode.success).send(
      successResponseFunc(
        `Documents uploaded successfully`,
        statusCode.success,
        constants.SUCCESS,
      )
    );
  } catch (err) {
    logger.error(
      errorResponseFunc(
        "Encountered error while syncing the document table.",
        err.toString(),
        statusCode.internalServerError,
        constants.ERROR
      )
    );
    return res.status(statusCode.internalServerError).send(
      errorResponseFunc(
        "Encountered error while syncing the document table.",
        err.toString(),
        statusCode.internalServerError,
        constants.ERROR
      )
    );
  }
};


module.exports = addEmployeeDocument 
