const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const { ExtraDayController } = require("../controllers/index");

router.post("/add", verifyToken, ExtraDayController.addExtraDay);
router.get("/get", verifyToken, ExtraDayController.getExtraDay);
router.put("/update/:id", verifyToken, ExtraDayController.updateExtraDay);
router.delete("/delete/:id", verifyToken, ExtraDayController.deleteExtraDay);

module.exports = router;