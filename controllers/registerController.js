const User = require('../models/users')
const bcrypt = require("bcrypt")

const registerController = async (req, res) => {
    const { username, email, telephone, password } = req?.body
    if (!username && !email && password) return res.status(400).json({ "message": 'Username email and password required' })
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
            res.status(500).json({err:err})
            console.log(err)
        }
    }

}

module.exports=registerController