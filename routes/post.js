const express = require("express")
const router = express.Router()
const verify_token = require("./verifyToken")
const User = require('../models/users')

//Protecting this route by adding a middleware
router.get('/',verify_token,async (req,res)=>{
    const id = req.user.id
    const user = await User.findOne({_id:id }).exec()
    res.json({
        posts:{
            title:'My first Post',
            description:'Rnadom data that you should not have access to',
            user:user
        }
    })
})

module.exports=router