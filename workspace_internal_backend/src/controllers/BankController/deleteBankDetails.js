const { constants, responseFunc, responseMessage, statusCode, errorResponseFunc, successResponseFunc, models } = require('../../utils/utilsIndex')

const deleteBankDetails = async (req, res) => {
    try {
        const bankId = req.params.bankId
        if (!bankId) {
            return res.status(statusCode.badRequest).send(
                errorResponseFunc(
                    "BankId is required",
                    "BankId is missing",
                    statusCode.badRequest,
                    constants.BADREQUEST
                )
            );
        }
        const bankDetail = await models.BankDetails.findByPk(bankId)
        if (!bankDetail) {
            return res.status(statusCode.badRequest).send(
                errorResponseFunc(
                    "Bank does not exist",
                    "Bank not found",
                    statusCode.badRequest,
                    constants.BADREQUEST
                )
            );
        }
        await bankDetail.destroy()
        return res.status(statusCode.success).send(
            successResponseFunc(
                `Bank Deleted successfully.`,
                statusCode.success,
                constants.SUCCESS,
            )
        );
    } catch (error) {
        return res.status(statusCode.internalServerError).send(
            errorResponseFunc(
                "Error while deleting bank..",
                err.toString(),
                statusCode.internalServerError,
                constants.ERROR
            )
        );
    }
}

module.exports = deleteBankDetails