import { model, Schema } from "mongoose";

const post = new Schema({
  userId: String,
  title: String,
  description: String,
  likeCount: Number,
  viewCount: Number,
  bannerImage: String,
  profileImage: String,
});

export default model("Posts", post);
