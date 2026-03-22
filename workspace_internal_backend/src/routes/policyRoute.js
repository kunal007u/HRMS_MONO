const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const { PolicyController } = require("../controllers/index");
const { upload } = require("../middlewares/fileUpload");

router.get("/getAllPolicies", [verifyToken], PolicyController.getAllPolicy);
router.post("/addPolicy", [verifyToken, upload.any()], PolicyController.createPolicy);
router.put("/updatePolicy/:id", [verifyToken, upload.any()], PolicyController.updatePolicy);
router.delete("/deletePolicy/:id", [verifyToken], PolicyController.deletePolicy);


module.exports = router;