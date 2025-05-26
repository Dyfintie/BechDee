import { NextRequest, NextResponse } from "next/server";
import sellerModel from "models/SellerModel";
import connectMongoDB from "@/lib/mongodb";

import fetch from "node-fetch"; // If you're on Node 18+, fetch is global

async function urlToBase64(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl);
  const buffer = await response.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  return `${base64}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, image } = body;

    if (!email || !name) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    await connectMongoDB();

    const existingSeller = await sellerModel.findOne({ email });
    if (existingSeller) {
      return new NextResponse("User already exists", { status: 200 });
    }

    let sellerimg = "";
    if (image) {
      sellerimg = await urlToBase64(image);
    }

    const newseller = await sellerModel.create({
      sellername: name,
      email,
      sellerimg,
    });
    console.log("New seller created:", newseller);

    return new NextResponse("User created successfully", { status: 201 });
  } catch (error) {
    console.error("Error in /api/login:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
