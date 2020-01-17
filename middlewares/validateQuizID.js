const mongoose=require('mongoose')

module.exports=(req,res,next)=>{
    if(!mongoose.Types.ObjectId.isValid(req.body.quizID))return res.status(400).send({'message':'invalid id'})
    next()
}