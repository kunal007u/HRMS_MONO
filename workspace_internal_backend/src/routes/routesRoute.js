const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const { RouteController } = require("../controllers/index");


router.get('/getAllRoutes', [verifyToken], RouteController.getAllRoutes);

module.exports = router;