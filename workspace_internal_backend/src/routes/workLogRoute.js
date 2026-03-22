const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth")

const { WorkLogController } = require("../controllers/index");

router.post("/create", [verifyToken], WorkLogController.createWorkLog)
router.get("/getByEmployeeId", [verifyToken], WorkLogController.getWorkLogByEmployeeId);
router.get("/getAll/:id?", [verifyToken], WorkLogController.getAllWorkLogs);
router.delete("/deleteLog/:id", [verifyToken], WorkLogController.deleteWorkLog);
router.put("/updateLog", [verifyToken], WorkLogController.updateWorkLog);
module.exports = router;