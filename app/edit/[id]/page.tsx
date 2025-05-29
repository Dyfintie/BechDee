"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Loader2 } from "lucide-react";
import Loading from "@/Loading";
export default function EditItemWithImage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [captureFromCamera, setCaptureFromCamera] = useState(false);
  const [preview, setPreview] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`/api/items/${id}`);
        if (!res.ok) throw new Error("Failed to fetch item");
        const data = await res.json();
        const itemdata = data.item;
        setTitle(itemdata.title);
        setContent(itemdata.content);
        setPrice(itemdata.price);
        setLocation(itemdata.location);
        setPreview(`data:image/png;base64,${itemdata.file}` || "");
      } catch (err) {
        console.error("Error fetching item:", err);
        setUploadError("Unable to load item for editing.");
      }
      setIsLoading(false);
    };
    if (id) fetchItem();
  }, [id]);

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
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      const url = `https://us1.locationiq.com/v1/reverse?key=${process.env.NEXT_PUBLIC_GeoKey}&lat=${latitude}&lon=${longitude}&format=json`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch location");
      setLocation(data.display_name);
      return data.display_name;
    } catch (err) {
      console.error("Location error:", err);
      setLocationError("Failed to fetch location. Enter manually.");
      return "";
    } finally {
      setIsGettingLocation(false);
    }
  };

  const triggerFileInput = (capture: boolean) => {
    setCaptureFromCamera(capture);

    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
      fileInput.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      console.warn("No file selected");
      return;
    }

    if (selectedFile.size > 4 * 1024 * 1024) {
      setUploadError("Image is size id larger than 4MB ");
      setFile(null);
      setPreview("");
      return;
    }

    setUploadError("");
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !price || !location) {
      alert("Please fill all required fields.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("price", price);
    formData.append("location", location);
    if (file) formData.append("file", file);

    try {
      const res = await fetch(`/api/items/${id}`, {
        method: "PATCH",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to update item");
      router.push("/items");
    } catch (err) {
      console.error("Submit error:", err);
      setUploadError("Update failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-custom mt-16">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6">Edit Item</h1>
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

            <div>
              <label htmlFor="content" className="font-medium text-2xl">
                Description
              </label>
              <input
                id="content"
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="card w-full px-4 py-2 border border-gray-300 rounded-md text-lg"
                placeholder="Enter Item description"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="image" className="text-xl font-semibold">
                  Upload Image
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  capture={captureFromCamera ? "environment" : undefined}
                  className="card w-full mt-2 px-3 py-2 border border-gray-300 rounded-md hidden"
                />
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => triggerFileInput(true)}
                    className="btn rounded-md mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 font-semibold"
                  >
                    Take Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerFileInput(false)}
                    className="btn rounded-md mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 font-semibold ml-2"
                  >
                    Choose from Gallery
                  </button>
                </div>
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
                <label htmlFor="price" className="block text-xl font-semibold">
                  Price
                </label>
                <input
                  id="price"
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
              <label htmlFor="location" className="text-xl font-semibold">
                Location
              </label>
              <div className="relative">
                <input
                  id="location"
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
                {isLoading ? "Updating..." : "Update Item"}
              </motion.button>
            </div>
            {uploadError && (
              <p className="text-red-600 text-sm font-semibold mt-2">
                {uploadError}
              </p>
            )}
          </form>
        </motion.div>
      </main>
    </div>
  );
}
