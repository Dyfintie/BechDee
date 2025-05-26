import connectMongoDB from "@/lib/mongodb";
import sellerModel from "models/SellerModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { email } = await params;
    await connectMongoDB();
    const seller = await sellerModel.findOne({ email });
    if (!seller) {
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });
    }
    return NextResponse.json(seller);
  } catch (error) {
    console.error("Error fetching seller data:", error);
    return NextResponse.json(
      { error: "Failed to fetch seller data" },
      { status: 500 }
    );
  }
}
