import mongoose, { Schema, Document } from "mongoose";

export interface BlogType extends Document {
  title: string;
  description: string;
  file?: string;
  date_created: string;
}

const blogSchema = new Schema<BlogType>({
  title:String,
  description:String,
  file:String,
  date_created:String,
});

const BlogModel =
  mongoose.models.blogs || mongoose.model<BlogType>("blogs", blogSchema);
export default BlogModel;
