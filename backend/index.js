import express from 'express'
import connectDB from './utils/connectDB.js';
import userRouter from './routes/users.js';
import dotenv from 'dotenv'
import nodemailer from "nodemailer"
dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'Gmail', // For Gmail, use 'Gmail', otherwise use the service name or 'SMTP'
    auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.PASSWORD   // Your email password or app-specific password
    }
});


const app = express()
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use(userRouter);
app.get('/' , (req , res)=>{
    console.log(req.query);
    res.sendStatus(201);
})

app.listen(PORT , ()=>{
    connectDB();
    console.log(`Server is listening on ${PORT}`);
}) 