"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AddBlogWithImage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.size > 4 * 1024 * 1024) {
      setUploadError("Image must be under 4MB");
      setFile(null);
      setPreview("");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setUploadError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !file) {
      setUploadError("All fields and an image are required.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload");
        const data = await res.json();
        console.log("Blog uploaded successfully:", data);

      router.push("/admin");
    } catch (err) {
      console.error(err);
      setUploadError("Failed to upload blog. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-custom mt-16">
      <main className="max-w-3xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="text-2xl font-semibold">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="card w-full px-4 py-2 border border-gray-300 rounded-md text-xl"
                placeholder="Enter blog title"
                required
              />
            </div>

            <div>
              <label className="text-2xl font-semibold">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="card w-full px-4 py-2 border border-gray-300 rounded-md text-lg"
                placeholder="Enter blog content/summary"
                rows={6}
                required
              />
            </div>

            <div>
              <label className="text-2xl font-semibold">Blog Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="card w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
                required
              />
              {preview && (
                <div className="mt-4">
                  <Image
                    src={preview}
                    alt="Preview"
                    width={600}
                    height={400}
                    className="rounded-lg object-contain max-h-96 w-full"
                  />
                </div>
              )}
            </div>

            {uploadError && (
              <p className="text-red-600 text-md font-medium">{uploadError}</p>
            )}

            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition duration-300"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Uploading..." : "Publish Blog"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
