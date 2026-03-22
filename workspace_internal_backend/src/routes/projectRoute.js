const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const { ProjectController } = require("../controllers/index");

router.post("/createOrUpdate", [verifyToken], ProjectController.addProject);
router.get("/getById/:projectId", [verifyToken], ProjectController.getProjectById);
router.get("/getAll", [verifyToken], ProjectController.getAllProjects);
router.delete("/delete/:projectId", [verifyToken], ProjectController.deleteProject);
router.get('/getAllLogHours', [verifyToken], ProjectController.getAllWorkLogHours)


module.exports = router;