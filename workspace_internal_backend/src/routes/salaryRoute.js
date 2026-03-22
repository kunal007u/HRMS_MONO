const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");

const { SalaryController } = require('../controllers/index')


router.post('/add', [verifyToken], SalaryController.addOrUpdate)
router.delete('/delete/byId/:id', [verifyToken], SalaryController.deleteSalary)
router.get('/getAll', [verifyToken], SalaryController.getSalaryDetails )
router.get('/getById/:id', [verifyToken], SalaryController.getSalaryById)
router.post('/monthly/create', [verifyToken], SalaryController.createMonthlySalary)
router.get('/monthly/allEmployees', [verifyToken], SalaryController.getAllEmployeeMonthlySalary)
router.get('/allSalaryByEmployee', [verifyToken], SalaryController.getAllSalaryByEmployeeId)
router.put('/monthly/paid/:id', [verifyToken], SalaryController.PaidEmployeeMonthlySalary)
router.put('/verifySalary', [verifyToken], SalaryController.verifySalary);



module.exports = router;