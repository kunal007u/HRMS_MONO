const { statusCode, constants, logger, errorResponseFunc, successResponseFunc, Projects } = require('./projectPackageCentral')


const addProject = async (req, res) => {
    try {
        const { projectName, projectId, description, projectManager, startDate, endDate } = req.body
        if (projectId) {
            const project = await Projects.findByPk(projectId)
            if (!project) {
                return res.status(statusCode.badRequest).send(
                    errorResponseFunc(
                        'No Project Found to Update',
                        statusCode.notFound,
                        constants.NOTFOUND
                    )
                )
            }

            let updatedProject = await project.update(req.body)
            return res.status(statusCode.success).send(
                successResponseFunc(
                    `Project Updated successfully`,
                    statusCode.success,
                    constants.SUCCESS,
                    updatedProject
                ))

        } else {
            const missingFields = [];

            if (!projectManager) missingFields.push('projectManager');
            if (!description) missingFields.push('description');
            if (!startDate) missingFields.push('startDate');
            if (!endDate) missingFields.push('endDate');

            if (missingFields.length > 0) {
                const missingFieldsList = missingFields.join(', ');
                return res.status(statusCode.badRequest).send(
                    errorResponseFunc(
                        `Missing fields: ${missingFieldsList}`,
                        `Please fill all the details.`,
                        statusCode.badRequest,
                        constants.BADREQUEST
                    )
                );
            }

            await Projects.create({
                projectName,
                projectManager,
                description,
                startDate,
                endDate
            })
            return res.status(statusCode.created).send(
                successResponseFunc(
                    `Project created successfully`,
                    statusCode.created,
                    constants.CREATED,
                ))

        }

    } catch (err) {
        return res.status(statusCode.internalServerError).send(
            errorResponseFunc(
                "Error while adding Project..",
                err.toString(),
                statusCode.internalServerError,
                constants.ERROR
            )
        );
    }
}


module.exports = addProject