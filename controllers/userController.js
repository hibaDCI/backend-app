import User from "../models/User.js";
import bcrypt from "bcrypt";
import authToken from "../helper/generateToken.js";
import {comparePass, hashedPasswordFun} from "../lib/auth.js";
import jwt from "jsonwebtoken";
// use sendGrid
import sgMail from "@sendgrid/mail";
export const signUp = async (req, res, next) => {
  console.log(req.body);
  console.log(req.file);

  try {
    const {email, password, username} = req.body;
    const foundUser = await User.findOne({email});

    if (foundUser) return res.status(203).json({msg: "you already in our app"});
    //? other way to create a new user
    //   const newUser = new User({ email, password, username });
    //   newUser.save()

    // const hashedPassword = await bcrypt.hash(password, 12);
    //! $2b$12$iLJbd5xlh4aGqyW0jPGIVeKqWDhPWU4gekyQYufFPBespfCmkU4k2
    const newUser = await User.create({
      email,
      //  hash and compare in seprate file
      // password: await hashedPasswordFun(password),
      // other way hash the password in the user schema
      password: password,
      username,
      userPic: "/uploads/images/" + req.file.filename,
    });
    // generate the jwt token
    const payload = {id: newUser._id};

    const token = jwt.sign(payload, process.env.SECRET, {expiresIn: "1h"});
    // send it with http

    res
      .cookie("access_token", token, {httpOnly: true})
      .json({msg: "you signUp successfully"});
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const {email, password} = req.body;

    if (!email || !password) {
      return res
        .status(401)
        .json({msg: "you should login your email and password"});
    }

    const user = await User.findOne({email});

    if (!user) {
      return res.status(404).json({msg: "you are not in our app"});
    }
    //  const isMatch = await bcrypt.compare(plainPass, databasePassword);
    if (await comparePass(password, user.password)) {
      //1- generate the jwt token by using a helper
      const token = await authToken.generateToken(user);
      // send it with http
      res
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 3600000 * 5,
          secure: true,
          sameSite: "none",
        })
        .json({msg: "you logged in successfully"});
      return;
    }
    res.status(403).json({msg: "make sure of your password and email"});
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  const allUser = await User.find();

  res.status(200).json({msg: "here we go", allUser});
};

//! send email by sendGrid when the user contact us

export const contactUs = async (req, res, next) => {
  const {username, email, message} = req.body;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    from: "hiba.al-aani@digitalcareerinstitute.org",
    to: email,
    subject: message,
    text: "very simple email sys ",
    html: `<strong>Hello there ${username}</strong>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("msg sent");
      res.json({msg: "Email Successfully send! Thanks."});
    })
    .catch((err) => console.log(err));
};
