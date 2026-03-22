const { statusCode, constants, logger, errorResponseFunc, successResponseFunc, Projects } = require('./projectPackageCentral')



const deleteProject = async (req, res) => {
    try {
    const projectId = req.params.projectId
    if (!projectId) {
        return res.status(statusCode.notFound).send(
            errorResponseFunc(
                "projectId is required",
                responseMessage.notFound,
                statusCode.notFound,
                constants.NOTFOUND
            ))
    }

    await Projects.destroy({
        where: { id: projectId }
    })
    return res.status(statusCode.success).send(
        successResponseFunc(
            "Project deleted successfully",
            statusCode.success,
            constants.SUCCESS
        )
    )
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
}

module.exports = deleteProject