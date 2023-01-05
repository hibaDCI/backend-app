import Post from "../models/Post.js";
export const createPost = async (req, res, next) => {
  const data = req.body;
  data.author = req.user;
  const newPost = await Post.create(data);
  res
    .status(200)
    .json({msg: "post created because you're authenticated", newPost});
};
