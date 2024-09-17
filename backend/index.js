import express from 'express'
import connectDB from './utils/connectDB.js';
import userRouter from './routes/users.js';
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const app = express()
const corsOptions = {
    origin : 'http://localhost:5173',
    credentials : true
}
app.use(cors(corsOptions))
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use(userRouter);

app.get('/' , (req , res)=>{
    res.sendStatus(201);
})

app.listen(PORT , ()=>{
    connectDB();
    console.log(`Server is listening on ${PORT}`);
}) 