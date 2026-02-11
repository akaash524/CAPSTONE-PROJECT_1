import exp from 'express'
import jwt from 'jsonwebtoken'
import { register,authentication } from '../SERVICES/autthService.js';
import { ArticleModel } from '../MODELS/articleModel.js';
import { UserTypeModel } from '../MODELS/userModel.js';
import { checkAuthor } from '../MIDDLEWARES/checkAuthor.js';
import { verifyToken } from '../MIDDLEWARES/verifyToken.js';
export const authorRoute=exp.Router()

//reg author(public)
authorRoute.post('/users',async(req,res)=>{
    // get user bj from req
    let userObj=req.body;
    // call the reg function 
    const newUserObj=await register({...userObj,role:"AUTHOR"})  // mindbblocking ideaaa
    //send res
    res.status(201).json({
        message:"author created",
        payload:newUserObj
    })
})
//create article(protected)

authorRoute.post('/articles',verifyToken,checkAuthor,async(req,res)=>{
    //get article from user
    let article=req.body
    //check the author
    //middel ware
    //create article document
    const articleDoc=new ArticleModel(article)
    //save
    let createdArticleDoc=await articleDoc.save()
    //send res
    res.status(201).json({
        message:'article created',
        payload:createdArticleDoc
    })
})
//read article by auth id(protected)
authorRoute.get('/articles/:id',verifyToken,checkAuthor,async(req,res)=>{
    //get author id
    let authorId=req.params.id
    //read articls bu this author and active
    let articles=await ArticleModel.find({author:authorId,isArticleActive:true}).populate('author','firstName email')
    //send res
    res.status(200).json({
        message:"Articles found",
        payload:articles
    })

})
//edit article(protected)
authorRoute.put('/articles',verifyToken,checkAuthor,async(req,res)=>{
    let authorId=req.body.author
    let articleId=req.body.article
    let title=req.body.title
    let category=req.body.category
    let content=req.body.content

    let article=await ArticleModel.findOne({_id:articleId,author:authorId})
    if(!article){
        return res.status(401).json({message:'Article not found'})
    }
    // if(article.author!=authorId){
    //     return res.status(404).json({
    //         message:'Article not belong to author'
    //     })
    // }


    let updatedArticle=await ArticleModel.findByIdAndUpdate(
        articleId,
        {
            $set:{title,category,content}
        },
        {new:true}
    )

    res.status(201).json({
        message:'Article updated',
        payload:updatedArticle
    })

})
//(soft)delete article(protected)
authorRoute.put('/articles/delete',checkAuthor,async(req,res)=>{
    let authorId=req.body.author
    let articleId=req.body.article

    let article=await ArticleModel.findOne({_id:articleId,author:authorId})
    if(!article){
        return res.status(401).json({message:'Article not found'})
    }
    let updatedArticle=await ArticleModel.findByIdAndUpdate(
        articleId,
        {
            $set:{isArticleActive:false}
        },
        {new:true}
    )

    res.status(201).json({
        message:'Article soft deleted',
        payload:updatedArticle
    })

})
//read articls of author