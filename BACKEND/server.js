import exp from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import { userRoute } from './APIS/userAPI.js'
import { authorRoute } from './APIS/authorAPI.js'
import { adminRoute } from './APIS/adminAPI.js'
import cookieParser from 'cookie-parser'
import { commonRouter } from './APIS/commonAPI.js'

import cors from 'cors'
config()
const app=exp()
//use cors
app.use(cors({origin:['http://localhost:5173'],credentials:true}))
// add body paersar middleware
app.use(exp.json())
//add cookei parser middle ware 
app.use(cookieParser())
// connect API's
app.use('/user-api',userRoute)
app.use('/author-api',authorRoute)
app.use('/admin-api',adminRoute)
app.use('/common-api',commonRouter)

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
app.use((err, req, res, next) => {

  console.log("Error name:", err.name);
  console.log("Error code:", err.code);
  console.log("Full error:", err);

  // mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // mongoose cast error
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} ${value} already exists`,
    });
  }

  // ✅ HANDLE CUSTOM ERRORS
  if (err.status) {
    return res.status(err.status).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // default server error
  res.status(500).json({
    message: "error occurred",
    error: "Server side error",
  });
});