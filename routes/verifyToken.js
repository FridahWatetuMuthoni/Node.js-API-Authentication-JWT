const jwt = require('jsonwebtoken')

function auth(req,res,next){
    //checking if it has an auth token when sending a request
    const token = req.header('auth-token')
    if(!token) return res.status(401).send('Access Denied')

    try{
        //verify the token
        const verified = jwt.verify(token,process.env.TOKEN)
        req.user=verified
        next()
    }
    catch(err){
        res.status(400).send("Invalid Token")
    }
}

module.exports=auth