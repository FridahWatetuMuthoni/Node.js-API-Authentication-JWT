const User = require('../models/users')
const bcrypt = require("bcrypt")


const loginController = async (req, res) => {
    const { username, password } = req?.body
    if (!username || !password) return res.status(400).json({ "message": "Username and password are required" })
    //find the user
    const user = await User.findOne({ username: username }).exec()
    if (!user) return res.status(401).json({ 'message': "User not found" })
    try { 
        //check if the password is correct
        const match = await bcrypt.compare(password, user.password)
        if (match) { 
            res.status(200).json({user})
        }
        else {
            res.status(401).json({"message":'Wrong password'})
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

module.exports = {loginController,logoutController}

