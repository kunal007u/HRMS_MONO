const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const { ResignationController } = require("../controllers/index");

router.get("/getAllResignation", [verifyToken], ResignationController.getAllResignation);
router.get("/getResignationById", [verifyToken], ResignationController.getByIdResignation);
router.post("/addResignation", [verifyToken], ResignationController.createResignation);
router.put("/updateResignation/:id", [verifyToken], ResignationController.updateResignation);
router.put("/updateStatus/:id", [verifyToken], ResignationController.updateResignationStatus);
router.delete("/deleteResignation/:id", [verifyToken], ResignationController.deleteResignation);


module.exports = router;