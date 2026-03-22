const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const { RoleController } = require("../controllers/index");
// Role Routes
router.get("/getAllRoles", [verifyToken], RoleController.getAllRoles);
router.get("/getRole/:id", [verifyToken], RoleController.getRole);
router.post("/createRole", [verifyToken], RoleController.createRole);
router.put("/deleteRole/:id", [verifyToken], RoleController.deleteRole);
router.post("/updateRole", [verifyToken], RoleController.updateRole);

module.exports = router;


 