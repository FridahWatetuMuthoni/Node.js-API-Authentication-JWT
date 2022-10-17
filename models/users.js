const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        maxlength:50
    },
    email: {
        type: String,
        required:true
    },
    telephone: Number,
    password: {
        type: String,
        required:true
    }
})

module.exports=mongoose.model('User',userSchema)

