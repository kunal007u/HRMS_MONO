const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const { ExperienceDetailsController } = require("../controllers/index");

router.post('/addExperienceDetails', [verifyToken], ExperienceDetailsController.addExperienceDetails);
router.delete('/deleteExperienceDetails', [verifyToken], ExperienceDetailsController.deleteExperienceDetails);

module.exports = router;