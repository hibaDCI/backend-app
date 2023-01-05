import express from "express";
import mongoose from "mongoose";
// to read the cookie from the request
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
//! using passport authenticate
import passport from "passport";
import userRouter from "./routers/userRouter.js";
import postRouter from "./routers/postRouter.js";
import configureJwtStrategy from "./middleware/passport-jwt-config.js";
const app = express();
dotenv.config();
// / * db connection */;
mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jz6ge.mongodb.net/${process.env.DB_NAME}`
  )
  .then(() => console.log(" DB connection successfully connected 🙂"))
  .catch((error) => console.log(error));

/*express and cors middlewares */
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
//! use passport and initialize it in our server
app.use(passport.initialize());
//! call the passport configuration

configureJwtStrategy(passport);

// /uploads/images/namewithdatadiffernt
app.use("/uploads", express.static("uploads"));

///routers

app.use("/api/auth", userRouter);
app.use("/api/post", postRouter);
app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .json({msg: error.message || "there is an error"});
});

app.listen(5000, () => console.log("the server is up and running on 5000"));
