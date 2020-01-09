const jwt=require('jsonwebtoken')
const config=require('config')

module.exports=(req,res,next)=>{
    
    // let validToken=jwt.sign({user:'mahmoud',email:'mahmoudnassifptp39@gmail.com'},'coligo')
    // console.log(validToken)
    //valid token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFobW91ZCIsImVtYWlsIjoibWFobW91ZG5hc3NpZnB0cDM5QGdtYWlsLmNvbSIsImlhdCI6MTU3ODQxMzc2OH0.NaWJz39m6ZytS_2omfCmVdTIet3JoeNfpYDlMG1ev3Y"
    const token= req.headers['x-fake-token'];
    if(!token) return res.status(401).send({'message':'Access denied, No token provided'})
    try{
        const payload=jwt.verify(token,'coligo')
        req.user=payload;
        next()
    }
    catch(ex){
        res.status(400).send({'message':'Invalid token'})
    }
    
}