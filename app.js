const express=require('express')
const bodyParser=require('body-parser')
const {showAllQuizes,createQuiz,showQuiz}=require('./controllers/quizController')
const {addQuestion,removeQuestion}=require('./controllers/questionController')

const authMiddleware=require('./middlewares/authMiddleware')
const errorMiddleware=require('./middlewares/errorMiddleware')
const validateQuizID=require('./middlewares/validateQuizID')
const validateQuestionID=require('./middlewares/validateQuestionID')
const validateQuiz=require('./middlewares/validateQuiz')
const validateQuestion=require('./middlewares/validateQuestion')


const app=express()

app.use(bodyParser.json())

//main routes
app.get('/api/quiz/listAll',showAllQuizes)

app.post('/api/quiz/show',[validateQuizID],showQuiz)

app.post('/api/quiz/create',[authMiddleware,validateQuiz],createQuiz)

app.post('/api/quiz/addQuestion',[authMiddleware,validateQuizID,validateQuestion],addQuestion)

app.post('/api/quiz/removeQuestion',[authMiddleware,validateQuizID,validateQuestionID],removeQuestion)

app.use(errorMiddleware)




module.exports=app;