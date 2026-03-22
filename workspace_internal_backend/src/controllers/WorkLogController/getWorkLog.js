const { literal, fn, col, where } = require("sequelize");
const {
    Employees,
    statusCode,
    constants,
    errorResponseFunc,
    BankDetails,
    EmergencyContacts,
    EmployeeDocuments,
    ExperienceDetails,
    Assets,
    Department,
    Designation,
    successResponseFunc,
    bcrypt,
    Role,
    models,
    Op,
    logger,
    Sequelize,
    WorkLogs,
    Projects
} = require("../EmployeeController/employeePackageCentral");



const getWorkLogByEmployeeId = async (req, res) => {
    try {
        let employeeId = req.body.id;

        const workLog = await WorkLogs.findAndCountAll({
            where: {
                employeeId
            },
            include: [
                {
                    model: Employees,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: Projects,
                    attributes: ['id', 'name',],
                }
            ]
        })

        if (!workLog.count) {
            return res.status(400).send(
                errorResponseFunc(
                    "Employee workLog does'not exist", "No Data Found", statusCode.badRequest, constants.BADREQUEST
                )
            )
        }

        return res.status(200).send(workLog)

    } catch (err) {
        console.log(err)
    }

}


module.exports = { getWorkLogByEmployeeId }