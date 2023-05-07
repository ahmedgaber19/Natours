
const Tour = require('./../models/tourModel')
const APIFeatures = require('../utils/apiFeature') 

exports.getAllTours = async (req,res)=>{
    try{
  
        //2)excute query
        const features =  new APIFeatures(Tour.find(),req.query)
        const tours = await features.query
        
        //3)send response
        res.status(200).json({
            status:'success',
            results:tours.length,
            data:{
                    tours:tours
                }
            })
    }
    catch(err){
        res.status(400).json({
            status:'fail',
            message:err
        })
    }
}

exports.getTour = async (req,res)=>{
    try{

        const tour = await Tour.findById(req.params.id)
        res.status(200).json({
            status:'success',
            data:{
                tour
            }
        })
    }
    catch(err){
        res.status(400).json({
            status:'faild',
            message:err
        })
    }
}

exports.createTour = async (req,res)=>{
    try{

        const newTour = await Tour.create(req.body)
        res.status(201).json({
            status:'success',
            data:{
                    tour:newTour
                }
            })
        }
    catch(err){
        res.status(400).json({
            status:'faild',
            message:err
        })
        }
    
    }
exports.deleteTour = async (req,res)=>{
    try{
        await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status:'success',
            data:null
        })
    } 
    catch(err){
        res.status(400).json({
            status:'faild',
            message:err
        })
    }
}

exports.updateTour = async (req,res)=>{
    try{

        const updatedTour = await Tour.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })    
        res.status(200).json({
            status:'success',
            data:{
                tour:updatedTour
            }
        })
    }
    catch(err){
        res.status(400).json({
            status:'faild',
            message:err
        })
    }
}

exports.getTourStat = async (req,res)=>{
    try {
        console.log('hello')
        const stat = await Tour.aggregate([
        {
            $match:{
                ratingsAverage:{$gte:4.5}
            }
        },
        {
            $group:{
                _id: '$difficulty',
                avgRating:{$avg:'$ratingsAverage'},
                avgPrice:{$avg:'$price'},
                minPrice:{$min:'$price'},
                maxPrice:{$max:'$price'},
                totalNumberOfRatings:{$sum:'$ratingsQuantity'},
                numberOftours:{$sum:1}
            }
        },
        {
            $sort:{avgPrice:1}
        }
    ])
    res.status(200).json({
        status:'success',
        stat

    })
   } 
   catch (err) {
    res.status(400).json({
        status:'faild',
        message:err
    })
    }
   
}

exports.monthlyPlan = async (req,res)=>{
    try 
    {
        console.log("hello")
        const year = req.params.year * 1
        const stat = await Tour.aggregate([
            {
                $unwind:'$startDates'
            },
            {
                $match:{
                    startDates:
                    {
                        $gte:new Date(`${year}-01-01`),
                        $lte:new Date(`${year}-12-31`),
                    }
                },
            },
            {
                $group:{
                    _id: {$month:'$startDates'},
                    numTours:{$sum: 1},
                    tours:{$push:'$name'}
                }
            },
            {
                $addFields:{
                    month:"$_id"
                }
            },
            {
                $project:{
                    _id:0
                }
            },
            {
            $sort:
            {
                numTours:-1
            }
        }
            

        ])
        res.status(200).json({
            status:'success',
            length:stat.length,
            stat
        })
    } 
    catch (err) {
        res.status(400).json({
            status:'failure',
            message:err
        })
    }
}