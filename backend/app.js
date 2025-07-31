import 'dotenv/config'
import express from'express';
import path from "path"
import mongoose from "mongoose"
import cookieParser from "cookie-parser";
import {checkForAuthentiationCookie} from "./middlewares/authentication.js"
import  userRoute from "./routes/user.js"
import  blogRoute from "./routes/blog.js"
import Blog from './models/blog.js'
import cors from 'cors'

const app = express();
const PORT = process.env.PORT 
mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/blogify").then(e=>{
    console.log("MongoDB connected")
})
app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin: [
      "https://blog02-frontend.vercel.app" ,
      "http://localhost:5173" 
    ],
    credentials: true, 
  })
);
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.resolve("./public")));
app.use("/api/user", userRoute)

app.use(checkForAuthentiationCookie("token"))
app.use("/api/blogs", blogRoute)

app.get("/",async  (req,res)=>{
    const allBlogs = await Blog.find({});
   res.json({ user: req.user, blogs: allBlogs });
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})