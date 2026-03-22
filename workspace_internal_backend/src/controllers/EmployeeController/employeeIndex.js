const {
  resetPassword,
  forgotPassword,
  verifyPassword,
  verifyOtp,
  resendOtp
} = require("./PasswordReset");
const { getAllEmployeesData, getByIdEmployeesData } = require("./getEmployee");
const {
  updateEmployeeData,
  updateSignUpDetails,
  probationCompleted
} = require("./updateEmployeeData");
const { employeeLogin } = require("./employeeLogin");
const { addEmployee } = require("./addEmployee");
const { deleteEmployee } = require("./deleteEmployee");
const { getReportTo } = require("./reportTo");
const { logOut } = require("./logOut");
const createWorkLog = require('../WorkLogController/createWorkLog')
const { getWorkLogByEmployeeId } = require('../WorkLogController/getWorkLog')
module.exports = {
  resetPassword,
  employeeLogin,
  getAllEmployeesData,
  updateEmployeeData,
  deleteEmployee,
  getByIdEmployeesData,
  addEmployee,
  getReportTo,
  forgotPassword,
  verifyPassword,
  logOut,
  updateSignUpDetails,
  createWorkLog,
  getWorkLogByEmployeeId,
  probationCompleted,
  verifyOtp,
  resendOtp
};
