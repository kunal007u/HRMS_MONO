const createWorkLog = require('./createWorkLog')
const { getWorkLogByEmployeeId } = require('./getWorkLog')
const getAllWorkLogs = require('./getAllWorkLogs');
const deleteWorkLog = require('./deleteWorkLog');
const updateWorkLog = require('./updateWorkLog');

module.exports = {
    createWorkLog,
    getWorkLogByEmployeeId,
    getAllWorkLogs,
    deleteWorkLog,
    updateWorkLog,
}