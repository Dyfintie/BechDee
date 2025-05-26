import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema({
  title: String,
  email: String,
  seller: String,
  file: String,
  profilepic: String,
  content: String,
  price: Number,
  location: String,
  category: String,
  tags: String,
  status: {
    type: String,
    default: "on sale",
  },
  date_created: String,
});
const itemModel = mongoose.models.items || mongoose.model("items", itemSchema);
export default itemModel;
