import { model, Schema } from "mongoose";

const user = new Schema({
  username: String,
  password: String,
  email: String,
  deviceId: String,
});

export default model("Users", user);
