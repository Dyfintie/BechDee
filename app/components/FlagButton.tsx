"use client";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export default function FloatingButton({ tab }: { tab: "blogs" | "courses" }) {
  const router = useRouter();

  const handleClick = () => {
    if (tab === "blogs") {
      router.push("/addblog");
    } else {
      router.push("/addcourse");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 p-4 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition duration-300"
      title={`Add ${tab === "blogs" ? "Blog" : "Course"}`}
    >
      <Plus className="w-6 h-6" />
    </button>
  );
}
