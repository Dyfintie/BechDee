"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedTopicCard from "./CourseCard";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import Image from "next/image";
import Loading from "../Loading";
import ErrorPage from "../404";
import { CourseType } from "@/types/Course";

export default function ItemList() {
  const [topics, setTopics] = useState<CourseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("latest");
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/items", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setTopics(result.items);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const uniqueCategories = Array.from(
    new Set(
      topics
        .map((item: Itemtype & { category?: string }) => item.category)
        .filter(Boolean)
    )
  );

  const filteredTopics = topics.filter((topic: Itemtype) => {
    const matchesSearch =
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !selectedCategory || topic.category === selectedCategory;

    const notOwnItem = !name || topic.seller !== name;

    return matchesSearch && matchesCategory && notOwnItem;
  });

  const sortedTopics = [...filteredTopics].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto px-4 py-8 bg-custom min-h-screen w-full"
    >
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search Items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="card w-full hover:ring-black hover:ring-1 p-3 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-black"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>

        {/* <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="card w-full md:w-48 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 appearance-none"
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select> */}

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="card w-full md:w-48 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 appearance-none"
        >
          <option value="latest">Latest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <motion.div className="flex flex-wrap gap-6 justify-center max-w-full">
        <AnimatePresence>
          {sortedTopics.map((topic, index) => (
            <motion.div
              key={topic._id}
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: index * 0.3 }}
              className="max-w-sm w-full justify-between gap-3 lg:w-1/3 xl:w-1/4"
            >
              <AnimatedTopicCard key={topic._id} topic={topic} onHome={false} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* {filteredTopics.length > 0 && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Found {filteredTopics.length} item
          {filteredTopics.length > 1 ? "s" : ""} 🔎
        </p>
      )} */}

      {filteredTopics.length === 0 && (
        <>
          <p className="text-center text-gray-600 mt-8 text-lg">
            No Items on Sale 🥲
          </p>
          <Image
            src="/assests/404.gif"
            height={400}
            width={400}
            alt="404 Page"
            className="mx-auto shadow-md rounded-xl opacity-80"
            objectFit="contain"
            loading="lazy"
          />
        </>
      )}
    </motion.div>
  );
}
