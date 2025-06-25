import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: String,
  userimg: String,
  email: String,
});
const userModel =
  mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
