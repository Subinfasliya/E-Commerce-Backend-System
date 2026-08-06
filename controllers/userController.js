const User = require("../models/userModel")

const registerController = async(req,res) => {
    
    try{
       const user = await User.create(req.body)

       res.status(201).json({
        success:true,
        message:"Registered successfull",
        data:user
       })
    } catch(error){
        res.status(500).json({
            success:false,
            message:"Something went wrong",
            error:error
        })
    }
}

module.exports = {
    registerController
}