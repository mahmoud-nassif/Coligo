const mongoose=require('mongoose')

const questionSchema=new mongoose.Schema({
    type:String,
    body:String,
    options:Array,
    correct_answer:String
},
{discriminatorKey:'type'})

const Question=mongoose.model("question",questionSchema,"questions")

const radioQuestion=Question.discriminator('radio',new mongoose.Schema({
    body:String,
    options:Array,
    correct_answer:String
}))

const checkboxQuestion=Question.discriminator('checkbox',new mongoose.Schema({
    body:String,
    options:Array,
    correct_answer:Array
}))
module.exports={Question,radioQuestion,checkboxQuestion,questionSchema}