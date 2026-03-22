const {
    Role,
    constants,
    statusCode,
    errorResponseFunc,
    successResponseFunc,
    logger,
} = require("./rolePackageCentral");

const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll({
            where: { isActive: constants.ACTIVE },
        })
        return res.status(statusCode.success).send(
            successResponseFunc(
                "Here is the roles data.",
                statusCode.success,
                constants.SUCCESS,
                roles
            )
        );
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

module.exports = { getAllRoles }