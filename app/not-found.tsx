"use client";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 font-work-sans px-4 text-center">
      <Image
        src="/assets/404.gif" // Place your 404.gif under `public/assets/`
        alt="404 Not Found"
        width={400}
        height={300}
        className="rounded-xl shadow-md border-2 border-black"
        priority
      />
      <h1 className="mt-6 text-4xl font-bold text-black">
        Oops! Page not found
      </h1>
      <p className="mt-2 text-lg text-gray-700">
        The page you're looking for doesn't exist or was removed.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block px-6 py-2 bg-black text-white rounded-md border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0)] transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
}
