"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import DefaultEditor from "react-simple-wysiwyg";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { MapPin, Loader2 } from "lucide-react";

export default function AddTopicWithImage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [sellernumber, setSellerNumber] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("on sale");
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const seller = searchParams.get("name");
  const [isNumberRequired, setIsNumberRequired] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      });
    });
  };
  useEffect(() => {
    const fetchSellerNumber = async () => {
      try {
        const res = await fetch(`api/seller/${email}`);
        if (!res.ok) throw new Error("Failed to fetch seller data");

        const data = await res.json();

        const number = data.sellernumber || "";
        setSellerNumber(number);
        setIsNumberRequired(!(number));
      } catch (e) {
        console.error("Error in useEffect:", e);
        setIsNumberRequired(true); // Fall back to requiring input
      }
    };

    if (email) fetchSellerNumber();
  }, [email]);

  const reverseGeocode = async (): Promise<string> => {
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;
    try {
      setIsGettingLocation(true);
      setLocationError("");
      const url = `https://us1.locationiq.com/v1/reverse?key=${process.env.NEXT_PUBLIC_GeoKey}&lat=${latitude}&lon=${longitude}&format=json`;
      console.log(process.env.NEXT_PUBLIC_GeoKey, latitude, longitude);
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error("Failed to fetch location from LocationIQ");
      }
      setLocation(data.display_name);
      return (
        data.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
      );
    } catch (err) {
      console.error("LocationIQ Reverse Geocoding Error:", err);
      setLocationError("Unable to get your location. Please enter manually.");
      return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`; // Fallback to coords
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    } else {
      setPreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !file) {
      alert("Title, content, and an image are required.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("seller", seller);
    formData.append("email", email);
    formData.append("status", status);
    formData.append("content", content);
    formData.append("file", file);
    // formData.append("profilepic", profilepic);
    formData.append("sellernumber", sellernumber);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("category", category);
    formData.append("tags", tags);

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        router.push("/items");
      } else {
        throw new Error("Failed to create a topic");
      }
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-custom">
      <header className="bg-custom border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Add the item to SELL !
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-custom"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="title"
                className="block text-md font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="w-full px-4 py-2 border border-gray-300 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2  focus:ring-gray-900 transition duration-200 text-xl"
                type="text"
                placeholder="Enter Item Title"
                required
              />
            </div>
            {isNumberRequired && (
              <div>
                <label
                  htmlFor="number"
                  className="block text-md font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  id="number"
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  pattern="\d*"
                  value={sellernumber}
                  onChange={(e) => {
                    const digitsOnly = e.target.value.replace(/\D/g, "");
                    if (digitsOnly.length <= 10) setSellerNumber(digitsOnly);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-200 text-xl"
                  placeholder="Enter 10-digit phone number"
                  required
                />
              </div>
            )}

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Content
              </label>
              <DefaultEditor
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></DefaultEditor>
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-md font-medium text-gray-700 mb-1"
              >
                Upload Image (10 MB max)
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border hover:bg-gray-200 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-200"
                required
              />
              {preview && (
                <div className="mt-4">
                  <Image
                    width={500}
                    height={500}
                    src={preview || "/placeholder.svg"}
                    alt="Preview"
                    className="max-w-full h-auto max-h-96 object-contain rounded-md"
                  />
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="Price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price
              </label>
              <input
                id="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-200"
                placeholder="Enter Item Price"
                required
              />
            </div>

            <div>
              <label
                htmlFor="Location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location
              </label>
              <div className="relative">
                <input
                  id="Location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-200"
                  placeholder={
                    isGettingLocation
                      ? "Getting your location..."
                      : "Enter Item Location"
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => {
                    reverseGeocode();
                  }}
                  disabled={isGettingLocation}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  title="Use my current location"
                >
                  {isGettingLocation ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <div className="flex  ">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm text-gray-600">
                        Use my location
                      </span>
                    </div>
                  )}
                </button>
              </div>
              {locationError && (
                <p className="mt-1 text-sm text-red-600">{locationError}</p>
              )}
              {isGettingLocation && (
                <p className="mt-1 text-sm text-blue-600">
                  Getting your location...
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-900 text-custom font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Uploading..." : "Upload Item"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
