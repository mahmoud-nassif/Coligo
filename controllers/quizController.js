const {showQuizes,saveQuiz,showQuizByID}=require('../models/quiz')


async function showAllQuizes(req,res,next){

    try{
        const quizes=await showQuizes()
        if(quizes.length<=0) return res.status(404).send({message:'no quizes yet'})
        res.status(200).send(quizes)
    }
    catch(ex){
        next(ex)
    }

}

async function createQuiz(req,res,next){
    
    try{
        const quiz=await saveQuiz(req.body)
        res.status(200).send({message:'quiz created successfully',quiz:quiz})
    }
    catch(ex){
        next(ex)
    }

}

async function showQuiz(req,res,next){

    try{
        const quiz= await showQuizByID(req.body.quizID)
        if(!quiz) return res.status(404).send({message:'quiz not found'})
        res.status(200).send(quiz)
    }
    catch(ex){
        next(ex)
    }

}


module.exports={showAllQuizes,createQuiz,showQuiz}