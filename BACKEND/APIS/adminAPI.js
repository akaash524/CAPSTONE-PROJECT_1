import exp from 'express'
import { verifyToken } from '../MIDDLEWARES/verifyToken.js'
import { authentication } from '../SERVICES/autthService.js'
import { UserTypeModel } from '../MODELS/userModel.js'
import { checkUser } from '../MIDDLEWARES/checkUser.js'


export const adminRoute=exp.Router()

// read all articls(optional)

// block 
adminRoute.post('/block',verifyToken,async(req,res)=>{
    let userId=req.body.id
    //find and get userDoc
    let user=await UserTypeModel.findById(userId)
    if(!user){
        return req.status(404).json({message:'user not found'})
    }
    //chaneg the state, save and send res
    user.isActive=false
    await user.save()
    res.status(200).json({message:'User is blocked sucessfully'})
})
//  unblock auth , user
adminRoute.post('/unblock',verifyToken,async(req,res)=>{
    //get id
    let userId=req.body.id
    //find and get userDoc
    let user=await UserTypeModel.findById(userId)
    if(!user){
        return req.status(404).json({message:'user not found'})
    }
    //chaneg the state, save and send res
    user.isActive=true
    await user.save()
    res.status(200).json({message:'User is Unblocked sucessfully',payload:user})
})


