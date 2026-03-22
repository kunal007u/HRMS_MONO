const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const { HolidayController } = require("../controllers/index");

router.get("/getAllHolidays", [verifyToken], HolidayController.getAllHoliday);
router.post("/addHoliday", [verifyToken], HolidayController.createHoliday);
router.put("/updateHoliday/:id", [verifyToken], HolidayController.updateHoliday);
router.delete("/deleteHoliday/:id", [verifyToken], HolidayController.deleteHoliday);


module.exports = router;