import nodemailer from 'nodemailer'

export const mail = async (content) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 25,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });
    try {
        const verify = await transporter.verify();
        const info = await transporter.sendMail({
            from: process.env.EMAIL, 
            to: content.to, 
            subject: content.subject, 
            text: content.subject, 
            html: content.html 
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
