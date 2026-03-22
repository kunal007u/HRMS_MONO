const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const { LeaveRequestController } = require("../controllers/index");

router.post("/create", [verifyToken], LeaveRequestController.addLeaveRequest);
router.put("/update/:leaveRequestId", [verifyToken], LeaveRequestController.updateLeaveRequest);
router.delete("/delete/:leaveRequestId", [verifyToken], LeaveRequestController.deleteLeaveRequest);
router.put("/updateStatus/:leaveRequestId", [verifyToken], LeaveRequestController.updateLeaveRequestStatus);
router.get("/getAll", [verifyToken], LeaveRequestController.getAllLeaveRequest);
router.get("/employeeLeaves", [verifyToken], LeaveRequestController.getByIdLeaveRequest);
router.post("/leave-type-summary", LeaveRequestController.leaveTypeSummary);

module.exports = router;