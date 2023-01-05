import express from "express";
import {
  contactUs,
  getAllUsers,
  login,
  signUp,
} from "../controllers/userController.js";
import authToken from "../helper/generateToken.js";
import upload from "../config/multer.js";
const router = express.Router();
//! to upload a file we nne to use upload middleware
router.post("/register", upload.single("userPic"), signUp);
router.post("/login", login);

router.get("/all", authToken.isAuthorized, getAllUsers);

router.post("/contactus", contactUs);
export default router;
