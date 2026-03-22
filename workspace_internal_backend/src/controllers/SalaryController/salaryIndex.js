const { addOrUpdate, createMonthlySalary , PaidEmployeeMonthlySalary} = require('./addSalary')
const { deleteSalary } = require('./deleteSalary')
const { getSalaryDetails, getSalaryById, getAllEmployeeMonthlySalary, getAllSalaryByEmployeeId } = require('./getSalary')
const verifySalary = require('./verifySalary');
module.exports = { addOrUpdate, deleteSalary, getSalaryDetails, getSalaryById, createMonthlySalary, getAllEmployeeMonthlySalary, getAllSalaryByEmployeeId, PaidEmployeeMonthlySalary, verifySalary }