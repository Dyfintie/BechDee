// app/logout/route.ts (or server action if using newer Next.js)
import { signOut } from "../../../auth"; // your actual path

export async function GET() {
  await signOut(); // run server-side logout logic
  return Response.redirect("/", 302); // redirect to home after logout
}
