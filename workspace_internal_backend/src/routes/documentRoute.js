const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const { EmployeeDocument } = require("../controllers/index");
const { upload , multerErrorHandler} = require("../middlewares/fileUpload");

router.post("/add/:id?", [verifyToken, upload.any(), multerErrorHandler], EmployeeDocument.addEmployeeDocument);

module.exports = router;