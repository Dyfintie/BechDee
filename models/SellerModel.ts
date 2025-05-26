import mongoose, { Schema } from "mongoose";

const sellerSchema = new Schema({
  sellername: String,
  sellernumber: Number,
  sellerimg: String,
  email: String,
});

// const sellerModel = mongoose.model("seller", sellerSchema);
const sellerModel =
  mongoose.models.seller || mongoose.model("seller", sellerSchema);
export default sellerModel;
