"use client";
import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  return (
    <button
      className="text-xl text-black font-semibold"
      onClick={() => signIn("github", { callbackUrl: "/" })}
    >
      Continue with GitHub
    </button>
  );
}
