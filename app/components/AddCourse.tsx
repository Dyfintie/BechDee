"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AddCourseWithImage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState("beginner");
  const [videoUrl, setVideoUrl] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const instructor = searchParams.get("name");
  const router = useRouter();

  const triggerFileInput = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
      fileInput.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    if (selectedFile.size > 4 * 1024 * 1024) {
      setUploadError("Image size is larger than 4MB");
      setFile(null);
      setPreview("");
      return;
    }
    setUploadError("");
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !description || !file) {
      alert("Title, description, and image are required.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("instructor", instructor || "");
    formData.append("email", email || "");
    formData.append("description", description);
    formData.append("duration", duration);
    formData.append("level", level);
    formData.append("videoUrl", videoUrl);
    formData.append("price", price);
    formData.append("file", file);

    try {
      const res = await fetch("/api/course", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        throw new Error("Failed to upload course");
      }
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
              <label className="font-semibold text-2xl">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="card w-full px-4 py-2 border border-gray-300 rounded-md text-xl"
                type="text"
                placeholder="Enter Course Title"
                required
              />
            </div>

            <div>
              <label className="font-medium text-2xl">Description</label>
              <textarea
                value={description}
                className="card w-full px-4 py-2 border border-gray-300 rounded-md text-lg"
                placeholder="Enter Course Description"
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                required
              />
            </div>

            <div>
              <label className="text-xl font-semibold">Duration</label>
              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="card w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., 4 weeks"
              />
            </div>

            <div>
              <label className="text-xl font-semibold">Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="card w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="text-xl font-semibold">Video URL</label>
              <input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="card w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="https://yourvideo.com"
              />
            </div>

            <div>
              <label className="text-xl font-semibold">Course Image</label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={triggerFileInput}
                className="btn mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 font-semibold rounded-md"
              >
                Choose Image
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
              {uploadError && (
                <p className="text-red-600 text-lg font-semibold mt-2">
                  {uploadError}
                </p>
              )}
            </div>

            <div>
              <label className="text-xl font-semibold">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="card w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter Course Price"
              />
            </div>

            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn bg-gray-900 text-white font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition duration-300"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Uploading..." : "Upload Course"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
