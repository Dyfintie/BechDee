import connectMongoDB from "@/lib/mongodb";
import ItemModel from "models/ItemModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { email } = await params;
    await connectMongoDB();
    const items = await ItemModel.find({ email });
    if (!items) {
      return NextResponse.json({ error: "items not found" }, { status: 404 });
    }
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching items data:", error);
    return NextResponse.json(
      { error: "Failed to fetch items data" },
      { status: 500 }
    );
  }
}
