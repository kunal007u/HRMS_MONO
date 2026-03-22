const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const { LeaveBalanceController } = require("../controllers/index");

router.put("/update/:leaveBalanceId", [verifyToken], LeaveBalanceController.updateLeaveBalance);
router.get("/getAll", [verifyToken], LeaveBalanceController.getAllLeaveBalance);

module.exports = router;