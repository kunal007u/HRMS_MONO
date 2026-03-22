const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const { BankController } = require("../controllers/index");


router.post('/uploadBankDetails', [verifyToken], BankController.addBankDetails)
router.delete('/deleteBank/:bankId', [verifyToken], BankController.deleteBankDetails)
router.get('/getBank', [verifyToken], BankController.getBankDetailByEmployee)

module.exports = router;