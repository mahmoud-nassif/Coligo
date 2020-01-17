const mongoose=require('mongoose')

module.exports=(req,res,next)=>{
    if(!mongoose.Types.ObjectId.isValid(req.body.questionID))return res.status(400).send({'message':'invalid id'})
    next()
}