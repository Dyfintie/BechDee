"use client";
import SellerProfile from "../components/SellerProfile";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
export default function SellerPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  return (
    <>
      <div className="mt-5 max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={() => router.push("/items")}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to items
        </button>
      </div>
      <SellerProfile email={email} />
    </>
  );
}
