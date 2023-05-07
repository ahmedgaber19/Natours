const mongoose = require('mongoose')
const valid = require('validator')
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"A user must has a name"]
    },
    email:{
        type:String,
        required:[true,"A user must has a email"],
        unique:true,
        lowercase:true,
        validate:[valid.isEmail,"please provide a valid email"]
    },
    photo:{
        type:String,
        // required:[true,"A user must has photo"]
    },
    password:{
        type:String,
        required:[true,"A user must has a email"],
        minlength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        required:[true,"A user must has a email"],
        validate:{
            validator:function (passw) {
                return this.password === passw 
            },
            message:"password and passwordConfirm must be same"
        }
    },
    passwordChangedAt: Date,
    role:{
        type:String,
        enum:{
            values:['user','tourGuide','admin'],
        },
        default:'user'
    }
}
)

userSchema.pre('save',async function(next){
    if( ! this.isModified('password') ) return next()
    this.password = await bcrypt.hash(this.password,12)
    this.passwordConfirm = undefined
    next()
})
userSchema.methods.passwordChanged = function(jwtTimeStamp){
    const changedTime = parseInt(this.passwordChangedAt.getTime()/1000,10)
    console.log(jwtTimeStamp,changedTime)
    if (jwtTimeStamp <changedTime){
        return true
    }
    return false
}
const User = mongoose.model('User',userSchema)
module.exports = User