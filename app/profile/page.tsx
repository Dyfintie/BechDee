import SellerPage from "@/components/Seller";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="text-center mt-10 text-gray-500">
            Loading seller profile...
          </div>
        }
      >
        <SellerPage />
      </Suspense>
    </>
  );
}
