const {
  WorkLogs,
  constants,
  statusCode,
  errorResponseFunc,
  successResponseFunc,
  logger,
} = require("./workLogPackageCentral");

const deleteWorkLog = async (req, res) => {
  try {
    const id = req.params.id;
    if(!id){
      return res.status(statusCode.notFound).send(
        errorResponseFunc(
          "Worklog id not found.",
          "Worklog id not found.",
          statusCode.notFound,
          constants.NOTFOUND
        )
      );
    }else {
        const work = await WorkLogs.findOne({
            where: { id: id },
        });
        if (!work) {
            return res.status(statusCode.notFound).send(
            errorResponseFunc(
                "Worklog not found.",
                "Worklog not found.",
                statusCode.notFound,
                constants.NOTFOUND
            )
            );
        } else {
            await work.destroy();
            return res.status(statusCode.success).send(
            successResponseFunc(
                "Worklog deleted successfully.",
                "Worklog deleted successfully.",
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

module.exports = deleteWorkLog;