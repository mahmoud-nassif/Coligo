const {saveQuestion,deleteQuestion}=require('../models/question')

async function addQuestion(req,res,next){
    
    try{
        const saved=await saveQuestion(req.body)
        res.status(200).send({message:'question added successfully'})
    }
    catch(ex){
        next(ex)
    }

}

async function removeQuestion(req,res,next){
    
    try{
        deleteQuestion(req.body.quizID,req.body.questionID)
        res.status(200).send({message:'question deleted successfully'})
    }
    catch(ex){
        next(ex)
    }

}


module.exports={addQuestion,removeQuestion}