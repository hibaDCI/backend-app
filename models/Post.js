import mongoose from "mongoose";

const {Schema, model} = mongoose;

const postSchema = new Schema({
  title: String,
  date: {type: Date, default: Date.now},
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  desc: String,
});

const Post = model("Post", postSchema);

export default Post;
