const express = require("express")
const router = express.Router()
const {loginController,logoutController} = require('../controllers/authController')

router.route('/')
    .post(loginController)
    .get(logoutController)

module.exports=router