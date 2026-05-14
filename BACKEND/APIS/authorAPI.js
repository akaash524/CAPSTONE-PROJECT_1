import exp from 'express'
import jwt from 'jsonwebtoken'
import { register,authentication } from '../SERVICES/autthService.js';
import { ArticleModel } from '../MODELS/articleModel.js';
import { UserTypeModel } from '../MODELS/userModel.js';
import { checkAuthor } from '../MIDDLEWARES/checkAuthor.js';
import { verifyToken } from '../MIDDLEWARES/verifyToken.js';
import { upload } from '../config/multer.js';
import cloudinary from '../config/cloudinary.js';
import { uploadToCloudinary } from '../config/cloudinaryUpload.js';
export const authorRoute=exp.Router()

//reg author(public)
authorRoute.post(
    "/users",
    upload.single("profileImageUrl"),
    async (req, res, next) => {

        let cloudinaryResult;

        try {

            let userObj = req.body;

            // upload image to cloudinary
            if (req.file) {
                cloudinaryResult = await uploadToCloudinary(req.file.buffer);
            }

            // register author
            const newUserObj = await register({
                ...userObj,
                role: "AUTHOR",
                profileImageUrl: cloudinaryResult?.secure_url,
            });

            // send response
            res.status(201).json({
                message: "author created",
                payload: newUserObj,
            });

        } catch (err) {

            // rollback uploaded image if DB save fails
            if (cloudinaryResult?.public_id) {
                await cloudinary.uploader.destroy(
                    cloudinaryResult.public_id
                );
            }

            next(err);
        }
    }
);
//create article(protected)
authorRoute.post('/articles',verifyToken('AUTHOR'),async(req,res)=>{
    //get article from user
    let article=req.body
    //check the author
    //middel ware
    //create article document
    console.log(article)
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
authorRoute.get('/articles/:id',verifyToken('AUTHOR'),async(req,res)=>{
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
authorRoute.put('/articles',verifyToken('AUTHOR'),async(req,res)=>{
    let authorId=req.user.userId
    let articleId=req.body.articleId
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
authorRoute.patch('/articles/delete/status',verifyToken('AUTHOR'),async(req,res)=>{
    let articleId=req.body.article
    let isArticleActive=req.body.isArticleActive
    let article=await ArticleModel.findById(articleId)
    
    if(!article){
        return res.status(401).json({message:'Article not found'})
    }
    if(article.author.toString()!==req.user.userId){
         return res.status(403).json({message:'Forbidden. You can only delete your article'})
    }
    if(article.isArticleActive===isArticleActive){
        return res.status(400).json({
            message:`Article is already ${isArticleActive ?"active":"deleted"}`
        })
    }

    article.isArticleActive=isArticleActive;
    await article.save()
    res.status(201).json({
        message:'Article soft deleted',
        payload:article
    })
})
//read articls of author