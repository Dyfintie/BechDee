import connectMongoDB from "../../../lib/mongodb";
import itemModel from "../../../../models/ItemModel";
import sellerModel from "../../../../models/SellerModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    await connectMongoDB();
    const item = await itemModel.findOne({ _id: id });
    const seller = await sellerModel.findOne({ sellername: item.seller });
    return NextResponse.json({ item, seller }, { status: 200 });
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
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    const { id } = await params;
    const formData = await req.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const file = formData.get("file");
    const price = formData.get("price");
    const location = formData.get("location");
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64Image = buffer.toString("base64");
      await itemModel.findByIdAndUpdate(id, {
        title,
        content,
        file: base64Image,
        price,
        location,
      });
    } else {
      await itemModel.findByIdAndUpdate(id, {
        title,
        content,
        price,
        location,
      });
    }

    return NextResponse.json(
      { message: "Updation Successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating item:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Internal Server Error: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await connectMongoDB();
    await itemModel.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Deletion successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
