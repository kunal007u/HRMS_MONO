const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const { DepartmentController } = require("../controllers/index");


router.post('/addDepartment', [verifyToken], DepartmentController.createDepartment);
router.get('/getAllDepartment', [verifyToken], DepartmentController.getAllDepartment);
router.put('/updateDepartment/:id', [verifyToken], DepartmentController.updateDepartment);
router.delete('/deleteDepartment/:id', [verifyToken], DepartmentController.deleteDepartment);

module.exports = router;