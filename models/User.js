import mongoose from "mongoose";
import {hashedPasswordFun} from "../lib/auth.js";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userPic: String,
});
// if we want to hash the password in the schema , it's work if modify or add new password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashedPasswordFun(this.password);
  next();
});

const User = mongoose.model("user", UserSchema);
export default User;
