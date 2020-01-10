const app=require('./app')
const mongoose=require('mongoose')
const port=process.env.PORT||3030
const config=require('config')


mongoose.connect(config.get('db'),{ useNewUrlParser: true ,useUnifiedTopology: true }).then(done=>{
    console.log(done)
}).catch(err=>{
    console.log("mongoose err",err)
})
console.log(`current db ${config.get('db')}`)
//mongoose.connect("mongodb+srv://mahmoud-nassif:95685124951@cluster0-rhgan.mongodb.net/test?retryWrites=true&w=majority")

const server=app.listen(port,()=>{
    console.log('server is ready')
})


module.exports=server