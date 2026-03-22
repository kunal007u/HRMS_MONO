const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const { LeaveMasterController } = require("../controllers/index");

router.post("/create", [verifyToken], LeaveMasterController.addLeaveMaster);
router.put("/update/:leaveMasterId", [verifyToken], LeaveMasterController.updateLeaveMaster);
router.get("/getAll", [verifyToken], LeaveMasterController.getAllLeaveMaster);

module.exports = router;
