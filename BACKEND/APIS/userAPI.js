import exp from 'express'
import { register,authentication } from '../SERVICES/autthService.js';
import { verifyToken } from '../MIDDLEWARES/verifyToken.js';
import { ArticleModel } from '../MODELS/articleModel.js';
import { UserTypeModel } from '../MODELS/userModel.js';
import { checkUser } from '../MIDDLEWARES/checkUser.js';
import { upload } from '../config/multer.js';
import cloudinary from '../config/cloudinary.js';
import { uploadToCloudinary } from '../config/cloudinaryUpload.js';
export const userRoute=exp.Router()

//create or reg user
userRoute.post("/users",upload.single("profileImageUrl"),async (req, res, next) => {
        let cloudinaryResult;
            try {
                let userObj = req.body;

                //  Step 1: upload image to cloudinary from memoryStorage (if exists)
                if (req.file) {
                cloudinaryResult = await uploadToCloudinary(req.file.buffer);
                }

                // Step 2: call existing register()
                const newUserObj = await register({
                ...userObj,
                role: "USER",
                profileImageUrl: cloudinaryResult?.secure_url,
                });

                res.status(201).json({
                message: "user created",
                payload: newUserObj,
                });

            } catch (err) {

                // Step 3: rollback 
                if (cloudinaryResult?.public_id) {
                await cloudinary.uploader.destroy(cloudinaryResult.public_id);
                }

                next(err); // send to your error middleware
            }

        }
        );


//read all articls(protected route)
userRoute.get('/articles',verifyToken('USER'),async(req,res)=>{
    //get all articles
    let articles=await ArticleModel.find({isArticleActive:true}).populate('comments.user','firstName email')
    //send response
    res.status(200).json({message:"Articles",payload:articles})
})
// add comment to an articls(protected route)
userRoute.post('/comment',verifyToken('USER'),async(req,res)=>{
    //get parameters
    let { articleId,comment} = req.body
    let user=req.user.userId
    // if(user!==req.user.userId){
    //     return res.status(403).json({message:'Forbidden'})
    // }
    //find article
    let updatedArticle=await ArticleModel.findByIdAndUpdate(
        {_id:articleId,isArticleActive:true},
        { $push:{comments:{user:user,comment:comment}}},
        {new:true,runValidators:true}
    ).populate("comments.user",'email firstName')
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

//no need check user already in cookies during login