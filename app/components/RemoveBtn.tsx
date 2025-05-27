"use client";
import DeleteIcon from "@mui/icons-material/Delete";
export default function RemoveBtn({ id }) {
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
    <button
      onClick={removeTopic}
      className="px-5 py-1 border-2 border-black dark:border-white uppercase bg-white  transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] rounded-md text-red-600"
    >
      <DeleteIcon />
    </button>
  );
}
