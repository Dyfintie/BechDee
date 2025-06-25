import connectMongoDB from "@/lib/mongodb";
import courseModel from "@/models/CourseModel";
import userModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import console from "console";
export async function GET() {
  try {
    await connectMongoDB();
    const courses = await courseModel.find({});
    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  console.log("Received POST request to /api/courses");
  try {
    await connectMongoDB();
    const formData = await req.formData();
    console.log("Form data received:", formData);
    const title = formData.get("title");
    const email = formData.get("email") || process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    // const instructor = formData.get("instructor");
    const instructor = formData.get("instructor") || process.env.NEXT_PUBLIC_ADMIN;
    const description = formData.get("description");
    const price = formData.get("price");
    const category = formData.get("category");
    const tags = formData.get("tags");
    const status = formData.get("status") || "available";
    const duration = formData.get("duration");
    const level = formData.get("level");
    const videoUrl = formData.get("videoUrl");
    const file = formData.get("file"); // thumbnail

    if (!title || !email || !instructor || !description || !file) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size exceeds limit (10MB)" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString("base64");

    const instructorInfo = await userModel.findOne({ email });
    const profilepic = instructorInfo?.sellerimg || "";

    const date = new Date();
    const date_created = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;

    await courseModel.create({
      title,
      email,
      instructor,
      description,
      price: Number(price),
      category: String(category),
      tags: String(tags),
      status: String(status),
      duration: String(duration),
      level: String(level),
      videoUrl: String(videoUrl),
      thumbnail: base64Image,
      profilepic,
      date_created,
    });

    return NextResponse.json(
      { message: "Course created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await courseModel.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Course deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
