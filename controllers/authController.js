const User = require('../models/users')
const bcrypt = require("bcrypt")
const {registrationSchema,loginSchema} = require("../validation_schemas/auth")
const jwt = require("jsonwebtoken")


const registerController = async (req, res) => {
    //Data validation
    const {error} = registrationSchema(req.body)
    const error_message = error?.details[0].message
    if (error) return res.status(400).json({ "message":error_message })

    //getting the values from req.body
    const{username,email,telephone,password}=req.body
    
    //check for duplicate :Checking if the user is already registered
    const duplicate = await User.findOne({ username: username }).exec()
    if (duplicate) {
        return res.status(409).json({ "message": "User already exists please try another one" }) //conflict
    }
    else {
        try {
            //encrypt password
            const hashed_password = await bcrypt.hash(password, 10)
            //create new user
            const user = await User.create({ username, email, telephone, password:hashed_password } )
            res.status(201).json(user)
        }
        catch (err) {
            res.status(400).json({err:err})
            console.log(err)
        }
    }

}



const loginController = async (req, res) => {
    //Data validation
    const {error} = loginSchema(req.body)
    const error_message = error?.details[0].message
    if (error) return res.status(400).json({ "message":error_message })

    //get person from req.body
    const {username,password} = req.body

    //find the user
    const user = await User.findOne({ username: username }).exec()
    if (!user) return res.status(401).json({ 'message': "Email or Password is wrong" })

    try { 
        //check if the password is correct
        const match = await bcrypt.compare(password, user.password)
        if (match) { 
            //Get random encrypted string open node and type require('crypto').randomBytes(64).toString('hex')
            //Create and asign a token
            const token = jwt.sign(
                {id:user._id},
                process.env.TOKEN
            )
            res.header('auth-token',token).send(token)
            //res.status(200).json({user})
        }
        else {
            res.status(401).json({"message":'Invalid password'})
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({err})
    }
}

const logoutController = (req,res) => {
    res.send('Logout Controller')
}

module.exports = {loginController,logoutController,registerController}

