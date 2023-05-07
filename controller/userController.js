const User = require('./../models/UserModel')

exports.getAllUsers = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:'The route is not defind yet'
    })
}

exports.getUser = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:'The route is not defind yet'
    })
}

exports.createUser = async (req,res)=>{
    try 
    {
        const user = await User.create(req.body)
        res.status(201).json({
            status:'success',
            user
        })
        
    } 
    catch (error) 
    {
        res.status(400).json({
            status:'fail',
            message:err
        })
    }

}

exports.updateUser = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:'The route is not defind yet'
    })
}

exports.deleteUser = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:'The route is not defind yet'
    })
}