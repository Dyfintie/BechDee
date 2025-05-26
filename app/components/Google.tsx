"use client";
import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  return (
    <button
      className="text-xl text-black font-semibold"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      Continue with Google
    </button>
  );
}
