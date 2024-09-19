import { Router } from "express";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { mail, otpFormat } from "../utils/mail.js";
import jwt from "jsonwebtoken";
import { generateOTP } from "../utils/otpGenerate.js";

const router = Router();
//check if the user already exists in database
const checkExisting = async (req, res, next) => {
  const {
    body: { username, email },
  } = req;
  const user =
    (await User.findOne({ username })) || (await User.findOne({ email }));
  if (user) {
    req.user = user;
  }
  next();
};

//check
const checkExistingForEmail = async (req, res, next) => {
  const {
    body: { username, email },
  } = req;
  const user = await User.findOne({ email });
  if (user) {
    req.user = user;
  }
  next();
};

//login
router.post("/api/user/login", checkExisting, async (req, res) => {
  const { body, user } = req;
  const { password } = body;
  if (!user || !password) {
    return res
      .status(400)
      .send({ message: "Incorrect username or password", success: false });
  }
  try {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .send({ message: "Incorrect username or password", success: false });
    }
    const payload = {
      user,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY_JWT);
    if (!user.verified) {
      return res
        .status(200)
        .cookie("token", token)
        .send({
          message: `Welcome Back ${user.firstName},\n Your OTP was not Verifed , you may lose your account within 72 Hrs `,
          user,
          success: true,
        });
    }
    return res
      .status(200)
      .cookie("token", token)
      .send({
        message: `Welcome Back ${user.firstName} `,
        user,
        success: true,
      });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
});

//signin
router.post("/api/user/signin", checkExisting, async (req, res) => {
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
  try {
    const hash = await bcrypt.hash(body.password, 10);
    body.password = hash;
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Internal server error", success: false });
  }
  try {
    const newUser = new User(body);
    const savedUser = await newUser.save();
    const otp = generateOTP();
    const userWithOtp = await User.findOneAndUpdate(
      { username: savedUser.username },
      {
        otp,
      },
      { new: true }
    );

    const content = {
      to: savedUser.email,
      subject: "Account Creation",
      text: "Your OTP for verification is : ",
      html: otpFormat(savedUser.username, otp),
    };
    try {
      const sendMail = await mail(content);
      return res
        .status(200)
        .send({ message: "OTP has been sent to your mail", success: true });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .send({ message: "Internal Server Error", success: false });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ message: "Something went wrong", success: false });
  }
});

router.post("/api/user/signin/verifyOtp", checkExisting, async (req, res) => {
  const { user } = req;
  const { otp } = req.body;
  if (!user) {
    return res
      .status(400)
      .send({ message: "OTP verification Failed", success: false });
  }
  if (user.otp == otp) {
    try {
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
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .send({ message: "Internal Server Error", success: false });
    }
  } else {
    return res
      .status(400)
      .send({ message: "OTP Verification Failed", success: false });
  }
});

//forgot password
router.post("/api/user/forgotpassword", checkExisting, async (req, res) => {
  const { user } = req;
  if (!user) {
    return res
      .status(400)
      .send({ message: "Incorrect Email or Username", success: false });
  }
  const otp = generateOTP();
  const userWithOtp = await User.findOneAndUpdate(
    { email: user.email },
    {
      otp,
    },
    { new: true }
  );
  const content = {
    to: user.email,
    subject: "Reset your Password",
    text: "Your OTP for verification is : ",
    html: otpFormat(user.username, otp),
  };

  try {
    const sendMail = await mail(content);
    return res.status(200).send({
      message: "Reset password link has been sent to your gmail",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.post(
  "/api/user/forgotpassword/verifyOtp",
  checkExisting,
  async (req, res) => {
    const { user } = req;
    const { otp, newPassword } = req.body;
    if (!user) {
      return res
        .status(400)
        .send({ message: "OTP verification Failed", success: false });
    }
    if (user.otp == otp) {
      try {
        const hash = await bcrypt.hash(newPassword, 10);
        const userUpdatedWithNewPassword = await User.findOneAndUpdate(
          { username: user.username },
          { password: hash, otp: "" },
          { new: true }
        );
        return res
          .status(201)
          .send({ message: "Password Updated Successfully", success: true });
      } catch (error) {
        console.log(error);
        return res
          .status(400)
          .send({ message: "Internal Server Error", success: false });
      }
    } else {
      return res
        .status(400)
        .send({ message: "OTP Verification Failed", success: false });
    }
  }
);

router.patch("/api/user/profile", checkExistingForEmail, async (req, res) => {
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
  try {
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
    }
    else{
      const findUser = await User.findOne({username : body.username});
      if(findUser){
        return res.status(400).send({message : "Username already taken" , success : false})
      }
      else{
        const updatedUser = await User.findOneAndUpdate(
          { email: user.email },
          {
            firstName: body.firstName,
            middleName: body.middleName,
            lastName: body.lastName,
            city: body.city,
            state: body.state,
            country: body.country,
            username : body.username
          },
          { new: true }
        );
        return res
        .status(200)
        .send({ message: "Profile Updated Successfully", success: true });
      }
    }



    
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ message: "Internal Server Error", success: false });
  }
});

export default router;
