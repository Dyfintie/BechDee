"use client";
import { useState } from "react";
import Image from "next/image";
import GoogleSignInButton from "../components/Google";
import GoogleIcon from "@mui/icons-material/Google";
import Login from "../components/Login";

export default function AuthPage() {
  const [show, setshow] = useState(false);

  return (
    <div className="font-work-sans min-h-screen bg-custom flex flex-col sm:flex-row items-center sm:items-stretch justify-center sm:justify-between">
      <div className="sm:flex flex-col justify-center items-center px-5 py-8 sm:w-1/2 w-full bg-custom max-w-full">
        <div className="flex flex-col pt-10 gap-6 w-full max-w-md">
          {!show && (
            <div className="card flex items-center justify-center gap-2 px-6 py-4 bg-white border border-gray-300 rounded-lg shadow hover:ring-2 hover:ring-black transition">
              <GoogleIcon style={{ color: "black" }} fontSize="medium" />
              <GoogleSignInButton />
            </div>
          )}

          {show && <Login />}
          <div className="text-center">
            <button
              onClick={() => setshow(!show)}
              className="text-sm font-semibold text-black underline hover:text-gray-700 transition"
            >
              {show ? "Hide Admin Login" : "Admin Login"}
            </button>
          </div>
        </div>
      </div>

      <div className="relative w-full sm:w-1/2 h-64 sm:h-screen">
        <Image
          src="/assests/hero.jpeg"
          alt="selling"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="rounded-t-lg sm:rounded-none"
        />
      </div>
    </div>
  );
}
