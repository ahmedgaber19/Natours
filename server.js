const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})

const app = require('./app')

const DB = process.env.DB.replace('<password>',process.env.DB_PASSWORD)
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>{
    console.log('DB Connection successful')
})

const port = 3000
app.listen(port,()=>{
    console.log(`App is running on port ${port}...`)
})