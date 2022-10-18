const express = require("express")
const router = express.Router()
const {loginController,logoutController, registerController} = require('../controllers/authController')

router.route('/register')
    .post(registerController)

    
router.route('/login')
.post(loginController)

router.route('/logout')
.get(logoutController)

module.exports=router