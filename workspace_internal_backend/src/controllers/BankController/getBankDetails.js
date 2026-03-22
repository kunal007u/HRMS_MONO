const { constants, statusCode, errorResponseFunc, successResponseFunc, models , logger} = require('../../utils/utilsIndex')

const getBankDetailsByEmployee = async (req, res) => {
    try {
        const employeeId = req.loggersId
        const employeeBank = await models.BankDetails.findOne({ where: { employeeId } })
        if (!employeeBank) {
            logger.warn(
                errorResponseFunc(
                    "Employee bank details not found", "No Bank Found", statusCode.badRequest, constants.BADREQUEST));
            return res.status(statusCode.badRequest).send(
                errorResponseFunc(
                    "Employee bank details not found", "No Bank Found", statusCode.badRequest, constants.BADREQUEST));
        }
        return res.status(statusCode.success).send(successResponseFunc('Successfully get bank details', statusCode.success, constants.SUCCESS, employeeBank))

    } catch (err) {
        logger.error(errorResponseFunc(
            "Encountered error in getBankDetailsByEmployee", err.toString(), statusCode.internalServerError, constants.ERROR));

        return res.status(statusCode.internalServerError).send(
            errorResponseFunc(
                "Encountered error in getBankDetailsByEmployee", err.toString(), statusCode.internalServerError, constants.ERROR)
        );
    }
}

module.exports = getBankDetailsByEmployee