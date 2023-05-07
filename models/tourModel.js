const mongoose = require('mongoose')

const tourSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'A tour must has a name'],
        unique:true,
        trim:true,
        maxlength:[40,"tour name mustn't greater than 40" ],
        minlength:[5,"tour name mustn't less than 10"]
    },
    duration:{
        type:Number,
        required:[true,'A tour must has a duration']
    },
    maxGroupSize:{
        type:Number,
        reqiured:[true,'A tour must has a group size']
    },
    difficulty:{
        type:String,
        required:[true,'A tour must has a difficulty'],
        enum:{
            values:['easy', 'medium', 'diffcult'],
            message:'must be easy or medium or hard'
        }
    },

    price:{
        type:Number,
        required:[true,'A tour must has a price']
    },
    ratingsAverage:{
        type:Number,
        default:4.5,
        min:[1,'rating must be above 1.0'],
        max:[5,'Rating must be above 5']
    },
    ratingsQuantity:{
        type:Number,
        default:0
    },
    priceDiscount:
    {
        type:Number,
        validate:{
            validator: function (val) {
                return this.price > val 
            }
        }
    },
    summary:{
        type:String,
        trim:true,
        required:[true,'A tour must has a summary'],
    },
    description:{
        type:String,
        trim:true
    },
    imageCover:{
        type:String,
        required:[true,'A tour must has a cover']
    },
    images:[String],
    createdAt:
    {
        type:Date,
        default:Date.now()
    },
    startDates: [Date]


},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

tourSchema.virtual('durationInWeeks').get(function(){
    return this.duration /7
})

const Tour = mongoose.model('Tour',tourSchema)
module.exports = Tour