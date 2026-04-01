import exp from 'express'
import { authentication } from '../SERVICES/autthService.js'
import { compare,hash } from 'bcryptjs'
import { UserTypeModel } from '../MODELS/userModel.js'
import { verifyToken } from '../MIDDLEWARES/verifyToken.js'
export const commonRouter=exp.Router()

//login 

commonRouter.post('/login',async(req,res)=>{
    //get user cerd object 
    let userCred=req.body
    // call auth fun
    let { token , user}=await authentication(userCred);
    //sava as htttp cookie only 
    res.cookie("token",token,{
        httpOnly:true,
        sameSite:"lax",
        secure:false,
    })
    //send response
    res.status(200).json({
        message:"Login Success",
        payload:user
    })
})

// logout
commonRouter.get('/logout',async(req,res)=>{
    //logout for user,author and admin
    res.clearCookie('token',{
        httpOnly:true,
        secure:false,
        sameSite:'lax'
    })
    //send response
    res.status(200).json({
        message:'logged out succesfully'
    })
})


//update the password
commonRouter.put('/change-password',async(req,res)=>{
    //get all details 
    let {email,currentPassword,newPassword}=req.body
    //find and get the user
    let user=await UserTypeModel.findOne({email:email})
    //check the user existed
    if(!user){
        return res.status(404).json({maessage:'User Not found'})
    }
    //c ompare the passwords
    let check=await compare(currentPassword,user.password)
    //if not matched send res
    if(!check){
        return res.status(400).json({message:'Incorrect Old Password'})
    }
    //replace new password and save
    let newHashPassword=await hash(newPassword,10)
    user.password=newHashPassword
    await user.save()
    //send res
    res.status(200).json({message:'Password Updated Sucessfully'})

})


commonRouter.get('/check-auth',verifyToken('USER','AUTHOR','ADMIN'),(req,res)=>{
    res.status(200).json({
        message:'authenticated',
        payload:req.user
    })
})