module.exports=(err,req,res,next)=>{

    //maybe we need to log the error here
    res.status(500).send({'message':err.message})

}