import connectMongoDB from "../../lib/mongodb";
import itemModel from "../../../models/ItemModel";
import sellerModel from "../../../models/SellerModel";
import { NextRequest, NextResponse } from "next/server";
import { console } from "inspector";
export async function GET() {
  try {
    await connectMongoDB();
    const items = await itemModel.find({});
    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error fetching item:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Internal Server Error: ${error.message}` },
        { status: 500 }
      );
    }
  }
}

export async function POST(req: NextRequest) {
  console.log("Received POST request to /api/items");
  try {
    await connectMongoDB();
    const formData = await req.formData();
    // console.log("Received form data:", formData);
    const title = formData.get("title");
    const email = formData.get("email");
    const content = formData.get("content");
    const file = formData.get("file");
    const seller = formData.get("seller");
    const price = formData.get("price");
    const location = formData.get("location");
    const category = formData.get("category");
    const tags = formData.get("tags");
    const status = formData.get("status");
    const sellernumber = formData.get("sellernumber");
    // console.log(title, email, content, file, seller, price, location);
    if (!title || !email || !content || !file) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    if (sellernumber) {
      await sellerModel.findOneAndUpdate({ email }, { $set: { sellernumber } });
    }
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size exceeds limit (10MB)" },
        { status: 400 }
      );
    }
    const sellerinfo = await sellerModel.findOne({ email });
    const date = new Date();
    const currentDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;

    console.log("Seller info:", sellerinfo);
    const profilepic = sellerinfo.sellerimg;

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString("base64");

    const item = await itemModel.create({
      title,
      email,
      seller: seller,
      file: base64Image,
      content,
      profilepic,
      price: Number(price),
      location,
      category: String(category),
      tags: String(tags),
      status: String(status),
      date_created: currentDate,
    });

    // console.log("Item created successfully");
    console.log("Item created successfully:", item);
    // Return a success response
    return NextResponse.json(
      { message: "Item created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating item:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await itemModel.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Deletion successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting item:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Internal Server Error: ${error.message}` },
        { status: 500 }
      );
    }
  }
}
