"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Loader2 } from "lucide-react";

export default function AddTopicWithImage() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [price, setPrice] = useState("");
  const [sellernumber, setSellerNumber] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [location, setLocation] = useState("");
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const seller = searchParams.get("name");
  const [isNumberRequired, setIsNumberRequired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    reverseGeocode();
  }, []);

  useEffect(() => {
    const fetchSellerNumber = async () => {
      try {
        const res = await fetch(`api/seller/${email}`);
        if (!res.ok) throw new Error("Failed to fetch seller data");
        const data = await res.json();
        const number = data.sellernumber || "";
        setSellerNumber(number);
        setIsNumberRequired(!number);
      } catch (e) {
        console.error("Error in useEffect:", e);
        setUploadError("Oops! Could not upload the item. Please try again.");
        setIsNumberRequired(true);
      }
    };
    if (email) fetchSellerNumber();
  }, [email]);

  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      });
    });
  };

  const reverseGeocode = async (): Promise<string> => {
    try {
      setIsGettingLocation(true);
      setLocationError("");

      const position = await getCurrentPosition();
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      setLatitude(lat);
      setLongitude(lon);

      const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed reverse geocoding");

      const data = await res.json();
      const display = `${data.city || data.locality || "Unknown"}, ${
        data.principalSubdivision || ""
      }, ${data.countryName || ""}`;

      setLocation(display);
      return display;
    } catch (err) {
      console.error("Geolocation failed:", err);
      setLocationError(
        "⚠️ Location permission denied or API error. Please allow location access to continue."
      );
      setLatitude(0);
      setLongitude(0);
      return "";
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(selectedFile ? URL.createObjectURL(selectedFile) : "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !content || !file) {
      alert("Title, content, and an image are required.");
      return;
    }

    // Force location before submit
    if (!location || !latitude || !longitude) {
      alert("Location access is required. Please click 'Use my location'.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("seller", seller);
    formData.append("email", email);
    formData.append("content", content);
    formData.append("file", file);
    formData.append("sellernumber", sellernumber);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("latitude", latitude.toString());
    formData.append("longitude", longitude.toString());

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        router.push("/items");
      } else {
        throw new Error("Failed to upload item");
      }
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-custom mt-16">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="title" className="font-semibold text-2xl">
                Title
              </label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="card w-full px-4 py-2 border border-gray-300 rounded-md text-xl"
                type="text"
                placeholder="Enter Item Title"
                required
              />
            </div>

            {isNumberRequired && (
              <div>
                <label htmlFor="number" className="text-md font-medium mb-1">
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
                  className="card w-full px-4 py-2 border border-gray-300 rounded-md text-xl"
                  placeholder="Enter 10-digit phone number"
                  required
                />
              </div>
            )}

            <div>
              <label htmlFor="content" className="font-medium text-2xl">
                Description
              </label>
              <input
                id="content"
                type="text"
                value={content}
                className="card w-full px-4 py-2 border border-gray-300 rounded-md text-lg"
                placeholder="Enter Item description"
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="image" className="text-xl font-semibold">
                  Upload Image
                </label>
                <input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="card w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileChange}
                  className="hidden card w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
                />

                <button
                  type="button"
                  onClick={() => document.getElementById("image").click()}
                  className="btn rounded-md mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200  font-semibold"
                >
                  Take Photo
                </button>
                {preview && (
                  <div className="mt-4">
                    <Image
                      width={500}
                      height={500}
                      src={preview}
                      alt="Preview"
                      className="max-w-full h-auto max-h-96 object-contain rounded-md"
                    />
                  </div>
                )}
              </div>

              <div className="flex-1 mt-4 md:mt-0">
                <label htmlFor="Price" className="block text-xl font-semibold">
                  Price
                </label>
                <input
                  id="Price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="card w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter Item Price"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="Location" className="text-xl font-semibold">
                Location
              </label>
              <div className="relative">
                <input
                  id="Location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="card w-full px-4 py-2 pr-12 border border-gray-300 rounded-md"
                  placeholder={
                    isGettingLocation
                      ? "Getting your location..."
                      : "Enter Item Location"
                  }
                  required
                />
                <button
                  type="button"
                  onClick={reverseGeocode}
                  disabled={isGettingLocation}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
                  title="Use my current location"
                >
                  {isGettingLocation ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Use my location</span>
                    </div>
                  )}
                </button>
              </div>
              {locationError && (
                <p className="mt-1 text-sm text-red-600">{locationError}</p>
              )}
            </div>

            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-900 text-white font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition duration-300"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Uploading..." : "Upload Item"}
                {uploadError && (
                  <p className="text-red-600 text-sm font-semibold mt-2">
                    {uploadError}
                  </p>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
