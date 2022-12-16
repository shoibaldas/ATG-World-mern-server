const express = require("express");
const authController = require("../controllers/auth");
const validator = require("../middleware/validation");

const router = express.Router();


//Auth API
router.post("/api/v1/signup", validator.signup, authController.signup);
router.post("/api/v1/signin", validator.signin, authController.signin);
router.post("/api/v1/forget-password", validator.signin, authController.forgetPassword);




module.exports = router;