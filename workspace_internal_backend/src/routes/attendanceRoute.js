const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const { EmployeeLogController } = require("../controllers/index");


router.post('/employeeLog/create', EmployeeLogController.createEmployeeLogDetails)
router.get('/getByEmployeeCode', EmployeeLogController.getAttendanceByCode)
router.get('/employeeMonthlyAttendance', EmployeeLogController.employeeMonthlyAttendance )
router.get('/getLatestDate', EmployeeLogController.getLatestDate )
router.put('/deleteEmployeeLog', verifyToken, EmployeeLogController.deleteEmployeeLog)
router.post('/addEmpLogManually', verifyToken, EmployeeLogController.addEmpLogManually)


//  // Attendance Routes
//  app.post("/addAttendance",[verifyToken], AttendanceController.addEmployeeAttendance);
//  app.get("/dailylogs",[verifyToken], AttendanceController.getAllAttendance);

module.exports = router;