const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})
const Tour = require('./../../models/tourModel')

const DB = process.env.DB.replace('<password>',process.env.DB_PASSWORD)
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>{
    console.log('DB Connection successful')
})

//1)Reading data
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf8'))

//2) save the data in db
const saveData = async ()=>{
 try {
    await Tour.create(tours)
    console.log('Date successfully loaded')
    
 } catch (error) {
    console.log(error)
 }
 finally{
    process.exit()
}
}
//
const deleteData = async ()=>{
    try {
       await Tour.deleteMany()
       console.log('Date successfully deleted')
       
    } catch (error) {
       console.log(error)
    }
    finally{
        process.exit()
    }
   }

if(process.argv[2]==='--import'){
    saveData()
}
if(process.argv[2]==='--delete'){
    deleteData()
}