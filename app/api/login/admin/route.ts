import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(req: Request) {
  const data = await req.json();
  const { username, password } = data;

  if (
    username === process.env.NEXT_PUBLIC_ADMIN &&
    password === process.env.NEXT_PUBLIC_ADMIN_PASS
  ) {
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "strict",
    });
    return res;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
export async function GET() {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "true";

  if (isAdmin) {
    return NextResponse.json({ isAdmin: true });
  }

  return NextResponse.json({ isAdmin: false }, { status: 401 });
}
