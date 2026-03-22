const addProject = require('./addProject')
const deleteProject = require('./deleteProject')
const { getProjectById, getAllProjects } = require('./getProjects')
const {getAllWorkLogHours} = require('./getAllWorkLogHours')
module.exports = {
    addProject,
    deleteProject,
    getProjectById,
    getAllProjects,
    getAllWorkLogHours
}