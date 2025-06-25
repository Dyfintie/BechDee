"use client";
import DeleteIcon from "@mui/icons-material/Delete";

interface RemoveBtnProps {
  id: string;
  type: "course" | "blog";
}

export default function RemoveBtn({ id, type }: RemoveBtnProps) {
  const removeItem = async () => {
    const confirmed = confirm("Are you sure you want to delete this?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/${type}?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      window.location.reload();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed. Try again.");
    }
  };

  return (
    <button
      onClick={removeItem}
      className="px-5 py-1 border-2 border-black dark:border-white uppercase bg-white transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] rounded-md text-red-600"
    >
      <DeleteIcon />
    </button>
  );
}
