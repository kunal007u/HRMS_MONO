const { createEmployeeLogDetails, getLatestDate } = require('./createEmployeeLogDetails')
const { getEmployeeLogDetails, getAttendanceByCode } = require('./getEmployeeLogDetails')
const {employeeMonthlyAttendance } = require('./employeeMonthlyAttendance')
const deleteEmployeeLog = require('./deleteEmployeeLog');
const addEmpLogManually = require('./addEmpLogManually');

module.exports = { createEmployeeLogDetails, getEmployeeLogDetails ,employeeMonthlyAttendance, getLatestDate, getAttendanceByCode, deleteEmployeeLog, addEmpLogManually }