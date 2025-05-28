"use client";
import { EditIcon } from "lucide-react";
export default function EditBtn({ id }) {
  const editTopic = async () => {
    try {
      const res = await fetch(`/api/items?id=${id}`, {
        method: "PATCH",
      });

      if (!res.ok) {
        throw new Error("Failed to Edit item");
      }
      window.location.reload();
    } catch (err) {
      console.error("Edit failed:", err);
      alert("Edit failed. Try again.");
    }
  };

  return (
    <button
      onClick={editTopic}
      className="px-5 py-1 border-2 border-black dark:border-white uppercase bg-white  transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] rounded-md text-red-600"
    >
      <EditIcon />
    </button>
  );
}
