const {
    Salary,
    logger,
    errorResponseFunc,
    statusCode,
    constants,
    successResponseFunc, } = require('./salaryPackageCentral')

const deleteSalary = async (req, res) => {
    try {
        const salaryId = req.params.id
        if (!salaryId) {
            return res
                .status(statusCode.badRequest)
                .send(
                    errorResponseFunc(
                        "salaryId is required to delete",
                        "No salaryId found",
                        statusCode.badRequest,
                        constants.BADREQUEST
                    )
                );
        }

        const salary = await Salary.findByPk(salaryId)
        if (!salary) {
            return res
                .status(statusCode.badRequest)
                .send(
                    errorResponseFunc(
                        "No salary found",
                        "There is no salary with this id",
                        statusCode.badRequest,
                        constants.BADREQUEST
                    )
                );
        }

        if (salary.deletedAt != null) {
            return res
                .status(statusCode.badRequest)
                .send(
                    errorResponseFunc(
                        "salary already deleted",
                        "salary already deleted",
                        statusCode.badRequest,
                        constants.BADREQUEST
                    )
                );
        }
        await salary.destroy();
        return res
            .status(statusCode.success)
            .send(
                successResponseFunc(
                    "Successfully deleted",
                    statusCode.success,
                    constants.SUCCESS
                )
            );

    } catch (err) {
        logger.error(
            errorResponseFunc(
                "Encountered error while syncing the admin table.",
                err.toString(),
                statusCode.internalServerError,
                constants.ERROR
            )
        );

    }

}
module.exports = { deleteSalary }