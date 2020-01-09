const app=require('./app')
const mongoose=require('mongoose')
const port=process.env.PORT||3030
const config=require('config')


mongoose.connect(config.get('db'))
console.log(`current db ${config.get('db')}`)

const server=app.listen(port,()=>{
    console.log('server is ready')
})


module.exports=server