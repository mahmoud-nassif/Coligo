const mongoose=require('mongoose')
const {Quiz}=require('./quiz')


const questionSchema= new mongoose.Schema({
    
    type:{type:String,enum:["multiple choice","multiple choice_checkboxes","short answer"],required:true},
    body:{type:String,required:true},
    options:{type:Array,required:function(){return this.type!=="Short answer"?true:false}},
    correct_answer:{type:Array,required:true}

})

 function saveQuestion(question){

    let q=new Question(question)
    return Quiz.updateOne({_id:question.quizID},{$push:{questions:q}})

}

function deleteQuestion(quizID,questionID){
    return Quiz.updateOne({_id:quizID},{$pull:{questions:{_id:questionID}}})
}

const Question=mongoose.model("question",questionSchema,"questions")

module.exports={Question,questionSchema,saveQuestion,deleteQuestion}
