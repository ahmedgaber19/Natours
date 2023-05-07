const User = require('./../models/UserModel')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const {promisify} = require('util')
exports.signUp = async (req,res)=>{
    try 
    {
        //TODO:Need to be change
        const user = await  User.create(req.body)
        const token = jwt.sign({id:user._id},process.env.JWT_SCREATE,{
            expiresIn:process.env.EXPIRESIN
        })
        console.log("hello")

        res.status(201).json({
            status:'created',
            data:user,
            token
        })
    } 
    catch (err) 
    {
     res.status(400).json({
        status:'failed',
        message:err
     })   
    }
}
exports.logIn = async (req,res)=>{
    //1)check email and password
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            status:'failed',
            message:'please enter email and password'
        })
    }
    //2)check if the user exist
    const user = await User.findOne({email:req.body.email}).select('+password')
    if(!user ||  !(await bcrypt.compare(req.body.password,user.password)) ){
        return res.status(401).json({
            status:"failed",
            message:"please enter valid email or password"
        })
    }
    // // //3)generate token
    const token = jwt.sign({id:user._id},process.env.JWT_SCREATE,{
        expiresIn:process.env.EXPIRESIN
    })
    return res.status(200).json({
        status:'success',
        token
    })
}

exports.protectRoute = async (req,res,next)=>{
    // 1) get token from header
    //check token
    console.log()
    if( !req.headers.authorization || !req.headers.authorization.startsWith('Bearer') ) {
        return res.status(401).json({
            status:"failed",
            message:"you aren't logged in"
        })
    }
    const token = req.headers.authorization.split(" ")[1]
    //2)veify token
    const tokenDecode = await promisify(jwt.verify)(token,process.env.JWT_SCREATE)
    if (!tokenDecode)
    {
        res.status(400).json({
            status:'failed',
            message:'you have to login'
        })
    }
    const user = await User.findById(tokenDecode.id)    
    if(!user){
        return res.status(400).json({
            status:'failed',
            message:'you have to signup again'

        })
    }
    console.log(tokenDecode)
    if (user.passwordChanged(tokenDecode.iat)){
        return res.status(400).json({
            status:'failed',
            message:'you have to login again'
        })
    }

    next()

}

