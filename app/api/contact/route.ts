import connectMongoDB from "@/lib/mongodb";
import contactModel from "@/models/ContactModel";
import { NextRequest, NextResponse } from "next/server";
export async function GET() {
  try {
    await connectMongoDB();
    const contacts = await contactModel.find({});
    return NextResponse.json({ contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Internal Server Error: ${error.message}` },
        { status: 500 }
      );
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const formData = await req.json();
    const { name, email, mobile, message } = formData;

    if (!name || !email || !mobile || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newContact = new contactModel({
      name,
      email,
      mobile,
      message,
    });

    await newContact.save();

    return NextResponse.json({ message: "Contact saved successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error saving contact:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Internal Server Error: ${error.message}` },
        { status: 500 }
      );
    }
  }
}