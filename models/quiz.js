const mongoose=require('mongoose')
const {Question,checkbocQuestion,radioQuestion,questionSchema}=require('./question')

const quizSchema=new mongoose.Schema({
    title:String,
    description:String,
    create_date:Date,
    publish_date:Date,
    questions:[questionSchema]
})

module.exports=mongoose.model('quiz',quizSchema,'quizes')