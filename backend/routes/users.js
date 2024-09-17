import { Router } from "express";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { mail } from "../utils/mail.js";
import jwt from "jsonwebtoken";

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

//login
router.post("/api/user/login", checkExisting, async (req, res) => {
  const { body, user } = req;
  const { password } = body;
  if (!user || !password) {
    return res.status(400).send({message : "Incorrect username or password" , success : false});
  }
  try {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const payload = {
        userId: user._id,
        username: user.username,
        email: user.email,
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, {
        expiresIn: "1d",
      });
      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          secure: false,
          maxAge: 3600000,
        })
        .send({ message: `Welcome Back ${user.firstName}`, user , success : true})
    } else {
      return res.status(400).send({message : "Incorrect username or password" , success : false});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({message : "Internal server error" , success : false});
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
    return res.status(400).send({message : `${missingField} is missing` , success : false });
  }
  if (req.user) {
    if(req.user.username == body.username){
      return res.status(400).send({message : "Username Already Taken" , success : false});
    }
    return res.status(400).send({message : "User already exists with this Email" , success : false});
  }
  try {
    const hash = await bcrypt.hash(body.password, 10);
    body.password = hash;
  } catch (error) {
    console.error(error);
    res.status(500).send({message : "Internal server error" , success : false});
  }
  const newUser = new User(body);
  try {
    const savedUser = await newUser.save();
    res
      .status(201)
      .send({ message: "Account Created Successfully", savedUser , success : true });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong");
  }
});

//check available usernames
router.post("/api/user/signin/username", async (req, res) => {
  const {
    body: { username },
  } = req;
  if (!username) {
    return res.status(400).send("Something is Missing");
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(200).send("Username available");
    } else {
      return res.status(400).send("Username already taken");
    }
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

//forgot password
router.post("/api/user/forgotpassword", checkExisting, async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(400).send("Incorrect Email");
  }
  const content = {
    to: user.email,
    subject: "Reset your Password",
    text: "Your OTP for verification is : ",
    html: "<h1>3456</h1>",
  };
  try {
    const sendMail = await mail(content);
    res.status(200).send("Reset password link has been sent to your gmail");
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});
export default router;
