import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()
export const verifyToken=async(req,res,next)=>{
    //read token from req
    let token=req.cookies.token
    console.log(token)
    if(!token){
        return res.status(200).json({
            message:'Unauthorised req, please Login'
        })
    }
    //verify the validity of token (decoding the token)
    let decodedToken=jwt.verify(token,process.env.JWT_SECRECT)
    //console.log(decodedToken)
    next()
    //forwad req to next middle ware or route

}