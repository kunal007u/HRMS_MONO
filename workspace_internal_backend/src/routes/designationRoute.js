const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const { DesignationController } = require("../controllers/index");

router.post('/addDesignation', [verifyToken], DesignationController.createDesignation);
router.get('/getAllDesignation', [verifyToken], DesignationController.getAllDesignation);
router.put('/updateDesignation/:id', [verifyToken], DesignationController.updateDesignation);
router.delete('/deleteDesignation/:id', [verifyToken], DesignationController.deleteDesignation);

module.exports = router;
