import nodemailer from "nodemailer";

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
      html: content.html,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const otpFormat = (username , otp) => {
  const mail = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your OTP Code</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            }
            .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
            text-align: center;
            padding: 10px 0;
            }
            .header h1 {
            font-size: 24px;
            color: #333;
            }
            .content {
            text-align: center;
            margin: 20px 0;
            }
            .content p {
            font-size: 16px;
            color: #666;
            }
            .otp {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            padding: 10px;
            background-color: #f0f0f0;
            display: inline-block;
            letter-spacing: 5px;
            border-radius: 5px;
            }
            .footer {
            text-align: center;
            padding: 20px 0;
            font-size: 12px;
            color: #999;
            }
            .footer a {
            color: #333;
            text-decoration: none;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <div class="header">
            <h1>Your OTP Code</h1>
            </div>
            <div class="content">
            <p>Hello,${username}</p>
            <p>You requested an OTP to proceed. Please use the following One-Time Password (OTP) to complete your action:</p>
            <div class="otp">${otp}</div>
            <p>This OTP is valid for the next 10 minutes. Do not share this code with anyone.</p>
            </div>
            <div class="footer">
            <p>If you did not request this, please ignore this email.</p>
            <p>Thank you!<br>Your Company Name</p>
            <p><a href="#">Visit our website</a></p>
            </div>
        </div>
        </body>
        </html>
    `;
    return mail;
};
