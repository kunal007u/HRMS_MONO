const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const { EmergencyContactController } = require("../controllers/index");

router.post('/addEmergencyContact', [verifyToken], EmergencyContactController.addEmergencyContacts);
router.delete('/deleteEmergencyContact', [verifyToken], EmergencyContactController.deleteEmergencyContacts);

module.exports = router;