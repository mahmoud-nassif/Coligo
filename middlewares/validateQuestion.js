const joi=require('@hapi/joi')
joi.objectID=require('joi-objectid')(joi)

module.exports=async function(req,res,next){

    const schema=joi.object({
        quizID:joi.objectID(),
        type:joi.string().valid("multiple choice","multiple choice_checkboxes","short answer").required(),
        body:joi.string().required().min(5).max(200),
        options:joi.array().items(joi.string()),
        correct_answer:joi.array().items(joi.string()).required()
    })

    try{
        await schema.validateAsync(req.body)
        next()
    }
    catch(ex){
         res.status(400).send({'message':ex.details[0].message})
    }

}

