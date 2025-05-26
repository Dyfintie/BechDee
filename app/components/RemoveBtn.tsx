"use client";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";
export default function RemoveBtn({ id }) {
  const router = useRouter();

  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/items?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete item");
      }
      window.location.reload();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed. Try again.");
    }
  };

  return (
    <button onClick={removeTopic} className="btn  rounded-md text-red-400">
      <DeleteIcon />
    </button>
  );
}
