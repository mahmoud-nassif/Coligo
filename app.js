const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const config=require('config')
const Quiz=require('./models/quiz')
const {Question,checkboxQuestion,radioQuestion}=require('./models/question')
const authMiddleware=require('./middlewares/authMiddleware')
const errorMiddleware=require('./middlewares/errorMiddleware')
const validateObjectID=require('./middlewares/validateObjectID')


const app=express()

app.use(bodyParser.json())

// if(!config.get('jwtPrivateKey')){
//     console.log("jwtPrivateKey is not defined")
//     process.exit(1)
// }


app.get('/',(req,res)=>{

    res.send({"message":"hi from home"})
    
})

app.get('/api/quiz/listAll',async(req,res)=>{

    try{
        const quizes=await Quiz.find({})
        if(quizes.length<=0) return res.status(404).send({'message':'no quizes yet'})
        res.status(200).send(quizes)
    }
    catch(ex){
        next(ex)
    }

})
app.post('/api/quiz/show',validateObjectID,async(req,res,next)=>{

    try{
        const quiz= await Quiz.findById(req.body.quizID)
        if(!quiz) return res.status(404).send({'message':'quiz not found'})
        res.status(200).send(quiz)
    }
    catch(ex){
        next(ex)
    }


})
app.post('/api/quiz/create',authMiddleware,async(req,res,next)=>{

    try{
        const quiz=new Quiz({...req.body,create_date:new Date(),publish_date:new Date()})
        await quiz.save()
        res.status(200).send({'message':'quiz created successfully'})
    }
    catch(ex){
        next(ex)
    }

})
app.post('/api/quiz/addQuestion',authMiddleware,async(req,res,next)=>{

    try{
        const {quizID,...rest}=req.body
        let question=new Question(rest)
        await Quiz.updateOne({_id:quizID},{$push:{questions:question}})
        res.status(200).send({'message':'question added successfully'})
    }
    catch(ex){
        next(ex)
    }

})
app.post('/api/quiz/removeQuestion',authMiddleware,async(req,res,next)=>{

    try{
        await Quiz.updateOne({_id:req.body.quizID},{$pull:{questions:{_id:req.body.questionID}}})
        res.status(200).send({'message':'question deleted successfully'})
    }
    catch(ex){
        next(ex)
    }
    
})

app.use(errorMiddleware)




module.exports=app;