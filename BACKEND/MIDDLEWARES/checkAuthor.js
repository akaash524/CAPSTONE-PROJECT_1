import { UserTypeModel } from "../MODELS/userModel.js"

export const checkAuthor=async (req,res,next)=>{
    //get authr oid 
    // let userdetails=req.body // post 
    // let userId=req.params.id //get 
    // verif author
    let authorId=req.body?.author||req.params?.id;
    // if(userdetails.author) authorId=userdetails.author
    // else authorId=userId
    
    const author=await UserTypeModel.findById(authorId)
    if(!author)
        return res.status(401).json({ message:"Author not found"})
    if(author.role!=='AUTHOR') 
        return res.status(403).json({message:'User is not Author'})
    if(!author.isActive)
        return res.status(403).json({message:'Author account is not active'})
    next()
}