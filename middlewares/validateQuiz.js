const joi=require('@hapi/joi')

module.exports=async function(req,res,next){

    const schema=joi.object({
        title:joi.string().required().min(5).max(200),
        description:joi.string().required().min(5).max(200)
    })

    try{
        await schema.validateAsync(req.body)
        next()
    }
    catch(ex){
         res.status(400).send({'message':ex.details[0].message})
    }

}

