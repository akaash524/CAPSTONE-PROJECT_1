import exp from 'express'
import { register,authentication } from '../SERVICES/autthService.js';
import { verifyToken } from '../MIDDLEWARES/verifyToken.js';
import { ArticleModel } from '../MODELS/articleModel.js';
import { UserTypeModel } from '../MODELS/userModel.js';
import { checkUser } from '../MIDDLEWARES/checkUser.js';
export const userRoute=exp.Router()

//create or reg user
userRoute.post('/users',async(req,res)=>{
    // get user bj from req
    let userObj=req.body;
    // call the reg function 
    const newUserObj=await register({...userObj,role:"USER"})  // mindbblocking ideaaa
    //send res
    res.status(201).json({
        message:"user created",
        payload:newUserObj
    })
})

//read all articls(protected route)
userRoute.get('/articles/:id',verifyToken,checkUser,async(req,res)=>{
    //get all articles
    let articles=await ArticleModel.find({isArticleActive:true}).populate('author','firstName email')
    //send response
    res.status(200).json({message:"Articles",payload:articles})
})
// add comment to an articls(protected route)
userRoute.post('/comment',verifyToken,checkUser,async(req,res)=>{
    //get parameters
    let { user,articleId,newComment} = req.body
    //find article
    let updatedArticle=await ArticleModel.findByIdAndUpdate(
        articleId,
        {
            $push:{comments:{user:user,comment:newComment}}
        },
        {new:true}
    )
    //if not found
    if(!updatedArticle) 
        res.status(401).json({message:'Article Not Found'})
    //push new comments
    //article.comments.push({user:user,comment:newComment})
    //let updatedArticleDoc=await article.save()
    res.status(200).json({
        message:'Commnet Added',
        payload:updatedArticle
    })
})