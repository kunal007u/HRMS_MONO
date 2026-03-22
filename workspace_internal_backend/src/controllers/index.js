const AdminController = require("./AdminController/adminIndex");
const EmployeeController = require("./EmployeeController/employeeIndex");
const EmployeeDocument = require("./EmployeeDocument/employeeDocumentIndex");
const DepartmentIndex = require("./DepartmentController/departmentIndex");
const AttendanceController = require("./AttendanceController/attendanceIndex");
const BankController = require("./BankController/bankIndex")
const DesignationController = require('./DesignationController/designationIndex')
const RoleController = require('./RoleController/roleIndex')
const DepartmentController = require("./DepartmentController/departmentIndex");
const RouteController = require("./RoutesController/routesIndex");
const ExperienceDetailsController = require("./ExperienceDetailsController/experienceDetailsIndex");
const AssetsController = require("./AssetsController/assetsIndex");
const EmergencyContactController = require("./EmergencyContactController/emergencyContactIndex");
const ProjectController = require('./ProjectController/projectIndex')
const EmployeeLogController = require('./EmployeeLogController/employeeLogIndex')
const LeaveMasterController = require('./LeaveMasterController/leaveMasterIndex')
const WorkLogController = require('./WorkLogController/workLogIndex')
const LeaveBalanceController = require('./LeaveBalanceController/leaveBalanceIndex')
const LeaveRequestController = require('./LeaveRequestController/leaveRequestIndex')
const HolidayController = require('./HolidayController/holidayIndex')
const SalaryController = require('./SalaryController/salaryIndex')
const PolicyController = require('./PolicyController/PolicyIndex')
const ResignationController = require('./ResignationController/ResignationIndex')
const OdooController = require('./OdooController/odooIndex')
const ExtraDayController = require("./ExtraWorkingDayController/extraDayIndex");


module.exports = {
  AdminController,
  EmployeeController,
  EmployeeDocument,
  DepartmentIndex,
  AttendanceController,
  BankController,
  DesignationController,
  RoleController,
  DepartmentController,
  RouteController,
  ExperienceDetailsController,
  AssetsController,
  EmergencyContactController,
  EmployeeLogController,
  LeaveMasterController,
  ProjectController,
  WorkLogController,
  LeaveBalanceController,
  LeaveRequestController,
  HolidayController,
  SalaryController,
  PolicyController,
  ResignationController,
  OdooController,
  ExtraDayController,
};
