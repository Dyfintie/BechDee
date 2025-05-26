import connectMongoDB from "../../../lib/mongodb";
import itemModel from "../../../../models/ItemModel";
import sellerModel from "models/SellerModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
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
interface PatchParams {
  params: {
    id: string;
  };
}

interface PatchRequestBody {
  title: string;
  content: string;
}

export async function PATCH(
  req: Request,
  { params }: PatchParams
): Promise<Response> {
  try {
    await connectMongoDB();
    const { id } = params;
    const { title, content }: PatchRequestBody = await req.json();
    await itemModel.findByIdAndUpdate(id, { title, content });
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
