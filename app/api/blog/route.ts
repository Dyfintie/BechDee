import connectMongoDB from "@/lib/mongodb";
import BlogModel from "@/models/BlogModel";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await connectMongoDB();
    const blogs = await BlogModel.find({});
    console.log("Fetched blogs:", blogs);
    return NextResponse.json( {blogs} );
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectMongoDB();

    const formData = await req.formData();
    console.log("Received form data:", formData);
    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const file = formData.get("file");

    if (!title || !description || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "Missing required fields or invalid file" },
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

    const date = new Date();
    const currentDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;


    console.log("Creating new blog with data:", {
      title,
      description,
      file: base64Image,
      date_created: currentDate,
    });
    const newBlog = await BlogModel.create({
      title,
      description,
      file: base64Image,
      date_created: currentDate,
    });

    return NextResponse.json(
      { message: "Blog created", blog: newBlog },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: `Server Error: ${err.message}` },
      { status: 500 }
    );
  }
}


export async function DELETE(req: Request) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Deletion successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
