const express = require("express")
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const registerRoute = require('./routes/register')
const authRoute = require("./routes/auth")
const connectDB = require("./models/connect")

//DATABASE
connectDB()

///MIDDLEWARES
//express json middleware (because we will be sending json to the frontend)
app.use(express.json())


//Routes
app.use("/api/auth", authRoute)
app.use('/api/register',registerRoute)



//app listens when the database is connected
mongoose.connection.once("open", () => {
    console.log("Database connected")
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
})
