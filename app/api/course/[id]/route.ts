import connectMongoDB from "@/lib/mongodb";
import courseModel from "@/models/CourseModel";
import userModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    await connectMongoDB();

    const course = await courseModel.findById(id);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const instructor = await userModel.findOne({
      sellername: course.instructor,
    });
    return NextResponse.json({ course, instructor }, { status: 200 });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await connectMongoDB();

    const formData = await req.formData();
    const updates: any = {
      title: formData.get("title"),
      description: formData.get("description"),
      price: formData.get("price"),
      category: formData.get("category"),
      tags: formData.get("tags"),
      status: formData.get("status"),
      duration: formData.get("duration"),
      level: formData.get("level"),
      videoUrl: formData.get("videoUrl"),
    };

    const file = formData.get("file");
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      updates.thumbnail = buffer.toString("base64");
    }

    await courseModel.findByIdAndUpdate(id, updates, { new: true });

    return NextResponse.json({ message: "Course updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await connectMongoDB();

    const deleted = await courseModel.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Course deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
