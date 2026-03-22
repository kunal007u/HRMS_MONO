const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const { EmployeeController } = require("../controllers/index");
const { upload } = require("../middlewares/fileUpload");

router.post("/addEmployee", [verifyToken , upload.any()], EmployeeController.addEmployee);
router.get("/getAllEmployees", [verifyToken], EmployeeController.getAllEmployeesData);
router.put("/updatePersonalDetails/:employeeId", [verifyToken], EmployeeController.updateEmployeeData);
router.put("/probation/completed/:employeeId",[verifyToken], EmployeeController.probationCompleted);
router.put("/updateSignUpDetails/:employeeId", [verifyToken, upload.any()], EmployeeController.updateSignUpDetails);
router.delete("/deleteEmployee/:employeeId", [verifyToken], EmployeeController.deleteEmployee);
router.get("/getByIdEmployee/:id?", [verifyToken], EmployeeController.getByIdEmployeesData);
router.get('/getReportPerson', [verifyToken], EmployeeController.getReportTo);

module.exports = router;