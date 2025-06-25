"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import Image from "next/image";
import Loading from "../Loading";
import ErrorPage from "../404";
import BlogCard from "@/components/BlogCard";
import AnimatedTopicCard from "@/components/CourseCard";
import { Blogtype } from "@/types/Blog";
import { Itemtype } from "@/types/Item";
import FloatingButton from "@/components/FlagButton";

type Tab = "blogs" | "courses";

export default function Dashboard() {
  const [blogs, setBlogs] = useState<Blogtype[]>([]);
  const [courses, setCourses] = useState<Itemtype[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [tab, setTab] = useState<Tab>("courses");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [blogsRes, coursesRes] = await Promise.all([
          fetch("/api/blog"),
          fetch("/api/course"),
        ]);

        if (!blogsRes.ok || !coursesRes.ok) throw new Error("Fetch failed");

        const blogsData = await blogsRes.json();
        const coursesData = await coursesRes.json();
        
        setBlogs(blogsData.blogs); 
        setCourses(coursesData.courses);
        setIsLoading(false);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const getFiltered = () => {
    const list = tab === "blogs" ? blogs || [] : courses || [];
    return list.filter((item: any) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;

  const filteredItems = getFiltered();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto pt-24 px-4 py-8 bg-custom min-h-screen w-full"
    >
      <div className="mb-8 flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="relative flex-grow w-full md:w-auto">
          <input
            type="text"
            placeholder={`Search ${tab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="card w-full hover:ring-black hover:ring-1 p-3 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-black"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>

        <div className="flex gap-2 mt-2 md:mt-0">
          <button
            className={`px-4 py-2 rounded-md font-semibold ${
              tab === "blogs" ? "bg-black text-white" : "bg-gray-200"
            }`}
            onClick={() => setTab("blogs")}
          >
            Blogs
          </button>
          <button
            className={`px-4 py-2 rounded-md font-semibold ${
              tab === "courses" ? "bg-black text-white" : "bg-gray-200"
            }`}
            onClick={() => setTab("courses")}
          >
            Courses
          </button>
        </div>
      </div>

      <motion.div className="flex flex-wrap gap-6 justify-center max-w-full">
        <AnimatePresence>
          {filteredItems?.map((item: any, index: number) => (
            <motion.div
              key={item._id}
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 + index * 0.05 }}
              className="max-w-sm w-full justify-between gap-3 lg:w-1/3 xl:w-1/4"
            >
              {tab === "blogs" ? (
                <BlogCard topic={item} onHome={false} />
              ) : (
                <AnimatedTopicCard topic={item} onHome={true} />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ✅ Floating Button moved OUTSIDE AnimatePresence */}
      <FloatingButton tab={tab} />

      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-16">
          <p className="text-center text-gray-700 text-xl font-semibold mb-4">
            No {tab === "blogs" ? "blogs" : "courses"} available at the moment.
          </p>
          <Image
            src="/assests/404.gif" // Swap to a more relevant placeholder if desired
            alt="Empty State"
            width={300}
            height={300}
            className="opacity-70"
          />
        </div>
      )}
    </motion.div>
  );
}
