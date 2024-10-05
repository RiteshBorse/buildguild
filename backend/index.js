import express from 'express'
import connectDB from './utils/connectDB.js';
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';

dotenv.config()

const app = express()
const corsOptions = {
    origin : 'http://localhost:5173',
    credentials : true
}
const PORT = process.env.PORT || 3000;
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

//Routes import
import userRouter from "./routes/user.routes.js"
import projectRouter from "./routes/project.routes.js"
import administrationRouter from './routes/administration.routes.js'
import uploadRouter from './routes/upload.routes.js'
//Routes Declaration
app.use("/api/v1/users" , userRouter)
app.use("/api/v1/projects", projectRouter)
app.use("/api/v1/administration" , administrationRouter)
app.use("/api/v1/upload", uploadRouter);
app.listen(PORT , ()=>{
    connectDB();
    console.log(`Server is listening on ${PORT}`);
}) 