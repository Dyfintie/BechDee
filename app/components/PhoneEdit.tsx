import { useState } from "react";
import { Phone, Pencil, Check } from "lucide-react";

const PhoneEdit = ({
  seller,
}: {
  seller: { sellernumber?: string; email?: string };
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(seller.sellernumber || "");
  const [tempPhone, setTempPhone] = useState(phoneNumber);

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/seller/${seller.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: seller.email,
          newNumber: tempPhone,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setPhoneNumber(tempPhone);
        setIsEditing(false);
      } else {
        console.error("Failed to update:", data?.error);
        alert("Error updating number: " + data?.error);
      }
    } catch (error) {
      console.error("API error:", error);
      alert("An error occurred while updating.");
    }
  };

  return (
    <div className="flex items-center gap-3  p-2">
      <Phone className="w-5 h-5 text-green-600" />
      <div className="flex flex-col">
        <p className="text-sm text-gray-500">Phone</p>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={tempPhone}
              onChange={(e) => setTempPhone(e.target.value)}
              className="border px-2 py-1 rounded text-sm w-40"
              placeholder="Enter phone number"
            />
            <button
              onClick={handleSave}
              className="text-green-600 hover:text-green-800"
              title="Save"
            >
              <Check className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <p className="font-medium text-gray-900 text-sm">
              {phoneNumber || "Go Sell something !!"}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="px-2 py-0.5 rounded-md border-2 border-black dark:border-white uppercase bg-white text-black transition duration-200 text-sm shadow-md"
              title="Edit"
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneEdit;
