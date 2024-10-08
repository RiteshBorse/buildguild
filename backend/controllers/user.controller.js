import { Router } from "express";
import { User } from "../models/User/user.model.js";
import bcrypt from "bcrypt";
import { mail, otpFormat } from "../utils/mail.js";
import jwt from "jsonwebtoken";
import { generateOTP } from "../utils/otpGenerate.js";
import { authenticate } from "../middleware/authentication.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

const login = asyncHandler(async (req, res) => {
  const { body, user } = req;
  const { password } = body;
  if (!user || !password) {
    return res
      .status(400)
      .send({ message: "Incorrect username or password", success: false });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .send({ message: "Incorrect username or password", success: false });
  }

  const payload = { user };

  const token = jwt.sign(payload, process.env.SECRET_KEY_JWT);
  return res
    .status(200)
    .cookie("token", token)
    .send({
      message: `Welcome Back ${user.firstName} `,
      user,
      success: true,
    });
});

const logout = asyncHandler((req, res) => {
  res.clearCookie("token");
  return res.status(200).send({ message: "Logout Successfull", success: true });
});

const signIn = asyncHandler(async (req, res) => {
  const { body } = req;
  const requiredFields = [
    "firstName",
    "middleName",
    "lastName",
    "city",
    "state",
    "country",
    "username",
    "email",
    "password",
  ];
  const missingField = requiredFields.find((field) => !req.body[field]);
  if (missingField) {
    return res
      .status(400)
      .send({ message: `${missingField} is missing`, success: false });
  }
  if (req.user) {
    if (req.user.username == body.username) {
      return res
        .status(400)
        .send({ message: "Username Already Taken", success: false });
    }
    return res
      .status(400)
      .send({ message: "User already exists with this Email", success: false });
  }
  const hash = await bcrypt.hash(body.password, 10);
  body.password = hash;
  const newUser = new User(body);
  const savedUser = await newUser.save();
  const otp = generateOTP();
  const userWithOtp = await User.findOneAndUpdate(
    { username: savedUser.username },
    { otp },
    { new: true }
  );

  const content = {
    to: savedUser.email,
    subject: "Account Creation",
    text: "Your OTP for verification is : ",
    html: otpFormat(savedUser.username, otp),
  };
  await mail(content);
  return res
    .status(200)
    .send({ message: "OTP has been sent to your mail", success: true });
});

const verifyOtpforSignIn = asyncHandler(async (req, res) => {
  const { user } = req;
  const { otp } = req.body;
  if (!user) {
    return res
      .status(400)
      .send({ message: "OTP verification Failed", success: false });
  }

  if (user.otp != otp) {
    return res
      .status(400)
      .send({ message: "OTP Verification Failed", success: false });
  }

  const otpVerified = await User.findOneAndUpdate(
    { username: user.username },
    { otp: "", verified: true },
    { new: true }
  );
  const payload = user.username;
  const token = jwt.sign(payload, process.env.SECRET_KEY_JWT);
  return res.status(201).cookie("token", token).send({
    message: "Account Created Successfully",
    success: true,
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { user } = req;
  if (!user) {
    return res
      .status(400)
      .send({ message: "Incorrect Email or Username", success: false });
  }
  const otp = generateOTP();
  const userWithOtp = await User.findOneAndUpdate(
    { email: user.email },
    { otp },
    { new: true }
  );
  const content = {
    to: user.email,
    subject: "Reset your Password",
    text: "Your OTP for verification is : ",
    html: otpFormat(user.username, otp),
  };

  await mail(content);
  return res.status(200).send({
    message: "Reset password link has been sent to your gmail",
    success: true,
  });
});

const verifyOtpforForgotPassword = asyncHandler(async (req, res) => {
  const { user } = req;
  const { otp, newPassword } = req.body;
  if (!user) {
    return res
      .status(400)
      .send({ message: "OTP verification Failed", success: false });
  }
  if (user.otp != otp) {
    return res
      .status(400)
      .send({ message: "OTP Verification Failed", success: false });
  }
  const hash = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate(
    { username: user.username },
    { password: hash, otp: "" },
    { new: true }
  );
  return res
    .status(201)
    .send({ message: "Password Updated Successfully", success: true });
});



const profile = asyncHandler(async (req, res) => {
  const { user, body } = req;
  if (!user) {
    return res.status(400).send({ message: "User not Found", success: false });
  }
  const isPasswordValid = await bcrypt.compare(body.password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .send({ message: "Incorrect username or password", success: false });
  }
  const requiredFields = [
    "firstName",
    "middleName",
    "lastName",
    "city",
    "state",
    "country",
    "username",
  ];
  const missingField = requiredFields.find((field) => !req.body[field]);
  if (missingField) {
    return res
      .status(400)
      .send({ message: `${missingField} is missing`, success: false });
  }

  if (user.username == body.username) {
    const updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      {
        firstName: body.firstName,
        middleName: body.middleName,
        lastName: body.lastName,
        city: body.city,
        state: body.state,
        country: body.country,
      },
      { new: true }
    );
    return res
      .status(200)
      .send({ message: "Profile Updated Successfully", success: true });
  } else {
    const findUser = await User.findOne({ username: body.username });
    if (findUser) {
      return res
        .status(400)
        .send({ message: "Username already taken", success: false });
    } else {
      const updatedUser = await User.findOneAndUpdate(
        { email: user.email },
        {
          firstName: body.firstName,
          middleName: body.middleName,
          lastName: body.lastName,
          city: body.city,
          state: body.state,
          country: body.country,
          username: body.username,
        },
        { new: true }
      );
      return res
        .status(200)
        .send({ message: "Profile Updated Successfully", success: true });
    }
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { user, body } = req;
  const validate = await bcrypt.compare(body.password, user.password);
  if (!validate) {
    return res.status(400).send({
      message: "Incorrect Password1",
      success: false,
    });
  }
  await User.findByIdAndDelete(user._id);
  return res.status(200).send({
    message: "Account Deleted Successfully",
    success: true,
  });
});

const resendOtp = asyncHandler(async(req, res) => {
  const { user } = req;
  const newOtp = generateOTP();
  
  const updatedOtp = await User.findOneAndUpdate(
    { username: user.username },
    { otp: newOtp },
    { new: true }
  );

  if (!updatedOtp) {
    return res
      .status(400)
      .send({ message: "Failed to resend OTP", success: false });
  }

  const content = {
    to: user.email,
    subject: "Resend OTP",
    text: `Your new OTP is: `,
    html: otpFormat(user.username, newOtp),
  };

  await mail(content);

  return res
    .status(200)
    .send({ message: "OTP has been sent to your email", success: true });
});


export {
  signIn,
  login,
  logout,
  verifyOtpforSignIn,
  forgotPassword,
  verifyOtpforForgotPassword,
  profile,
  deleteUser,
  resendOtp
};

export default router;
