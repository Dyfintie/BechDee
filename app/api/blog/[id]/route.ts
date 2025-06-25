import connectMongoDB from "@/lib/mongodb";
import blogModel from "@/models/BlogModel";
import { NextRequest, NextResponse } from "next/server";

// GET: Fetch a blog post by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    const blog = await blogModel.findById(params.id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

// PATCH: Update a blog post by ID
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();

    const formData = await req.formData();
    const updates: any = {
      title: formData.get("title"),
      description: formData.get("description"),
      author: formData.get("author"),
      content: formData.get("content"),
      category: formData.get("category"),
    };

    const file = formData.get("file");
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      updates.file = buffer.toString("base64");
    }

    await blogModel.findByIdAndUpdate(params.id, updates, { new: true });

    return NextResponse.json({ message: "Blog updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

// DELETE: Delete a blog post by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    const deleted = await blogModel.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
