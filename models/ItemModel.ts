import mongoose, { Schema, Document } from "mongoose";

export interface ItemType extends Document {
  title: string;
  email: string;
  seller: string;
  file?: string;
  profilepic?: string;
  content?: string;
  price?: number;
  location?: string;
  latitude: number;
  longitude: number;
  category?: string;
  tags?: string;
  status?: string;
  date_created?: string;
}

const itemSchema = new Schema<ItemType>({
  title: String,
  email: String,
  seller: String,
  file: String,
  profilepic: String,
  content: String,
  price: Number,
  location: String,
  latitude: Number,
  longitude: Number,
  category: String,
  tags: String,
  status: {
    type: String,
    default: "on sale",
  },
  date_created: String,
});

const itemModel =
  mongoose.models.items || mongoose.model<ItemType>("items", itemSchema);

export default itemModel;
