const mongoose=require('mongoose')
//const {questionSchema}=require('./question')

const quizSchema=new mongoose.Schema({

    title:{type:String,required:true},
    description:{type:String,required:true},
    create_date:{type:Date,default:Date.now()},
    publish_date:{type:Date},
    questions:[]

})

function showQuizes(){

  return Quiz.find({})

}

 function saveQuiz(quiz){

  return new Quiz(quiz).save()

}

function showQuizByID(id){

  return Quiz.findById(id)

}

const Quiz=mongoose.model('quiz',quizSchema,'quizes')


module.exports={Quiz,showQuizes,saveQuiz,showQuizByID}
