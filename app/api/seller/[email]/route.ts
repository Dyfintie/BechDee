import connectMongoDB from "@/lib/mongodb";
import sellerModel from "@/models/UserModel";
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
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, newNumber } = body;

    if (!email || !newNumber) {
      return NextResponse.json(
        { error: "Email and newNumber are required" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const updatedSeller = await sellerModel.findOneAndUpdate(
      { email },
      { sellernumber: newNumber }
    );

    if (!updatedSeller) {
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Phone number updated", seller: updatedSeller },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating phone number:", error);
    return NextResponse.json(
      { error: "Failed to update phone number" },
      { status: 500 }
    );
  }
}
