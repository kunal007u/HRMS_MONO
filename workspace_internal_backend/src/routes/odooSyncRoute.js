const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");

const { OdooController } = require("../controllers/index");

router.post("/sync", OdooController.syncTimesheet);

router.get("/timesheet/:id?", [verifyToken], OdooController.getTimesheet);

module.exports = router;