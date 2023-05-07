const express = require('express')
const morgan = require('morgan')
const app = express()
const toursRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoute')


// 1) MIDDLEWARES
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
app.use(express.json())
app.use(express.static('./public'))

app.use((req,res,next)=>{
    req.requestedTime = new Date().toISOString()
    next()
})

app.use('/api/v1/tours',toursRouter)
app.use('/api/v1/user',userRouter)

module.exports = app