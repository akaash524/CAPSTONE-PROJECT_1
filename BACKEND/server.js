import exp from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import { userRoute } from './APIS/userAPI.js'
import { authorRoute } from './APIS/authorAPI.js'
import { adminRoute } from './APIS/adminAPI.js'
import cookieParser from 'cookie-parser'
import { commonRouter } from './APIS/commonAPI.js'
config()
const app=exp()

// add body paersar middleware
app.use(exp.json())
//add cookei parser middle ware 
app.use(cookieParser())
// connect API's
app.use('/user-api',userRoute)
app.use('/author-api',authorRoute)
app.use('/admin-api',adminRoute)
app.use('/common-api',commonRouter)
app.use('/admin-api',adminRoute)

const connectDB=async()=>{
    try{
        await connect(process.env.DB_URL)
        console.log("Succesfully connected to DB")
        //start http port
        app.listen(process.env.PORT,()=>console.log(`Server started...${process.env.PORT}`))
    }catch(err){
        console.log("Error in Db connction",err)
    }
}
connectDB()
//dealing with invalid path
app.use((req,res,next)=>{
    res.json({message:`${req.url} is Invalid path`})
})

//error handler middle ware
app.use((err,req,res,next)=>{
    console.log("Err:",err)
    res.json({message:"Error",reason:err.message})
})