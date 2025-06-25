import connectMongoDB from "../../lib/mongodb";
import userModel from "../../models/UserModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();
  await connectMongoDB();
  const user = await userModel.findOne({ email: email });
  // console.log(user);
  if (!user) {
    return NextResponse.json({ message: "Incorrect email" }, { status: 403 });
  }
  if (user.password === password) {
    return NextResponse.json(
      { message: "Sucessfully logged in" },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: "Incorrect password" },
      { status: 403 }
    );
  }
}
