"use client";
import SellerProfile from "../components/SellerProfile";
import { useSearchParams } from "next/navigation";

export default function SellerPage() {
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  return (
    <>
      <SellerProfile  email={email} />
    </>
  );
}
