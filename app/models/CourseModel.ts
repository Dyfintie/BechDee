import mongoose, { Schema, Document } from "mongoose";

export interface CourseType extends Document {
  title: string;
  instructor: string;
  email: string;
  thumbnail?: string;
  profilepic?: string;
  description?: string;
  price?: number;
  category?: string;
  tags?: string;
  status?: string;
  date_created?: string;
  duration?: string;
  level?: "beginner" | "intermediate" | "advanced";
  videoUrl?: string;
}

const courseSchema = new Schema<CourseType>({
  title: String,
  instructor: String,
  email: String,
  thumbnail: String,
  profilepic: String,
  description: String,
  price: Number,
  category: String,
  tags: String,
  status: {
    type: String,
    default: "available",
  },
  date_created: {
    type: String,
    default: () => new Date().toISOString(),
  },
  duration: String,
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner",
  },
  videoUrl: String,
});

const courseModel =
  mongoose.models.courses ||
  mongoose.model<CourseType>("courses", courseSchema);

export default courseModel;
