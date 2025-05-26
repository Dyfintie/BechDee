"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedTopicCard from "./AnimatedTopicCard";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import Image from "next/image";
import Loading from "../Loading";
import ErrorPage from "../404";
import { Avatar, AvatarImage } from "./ui/avatar";
type Topic = {
  _id: string;
  title: string;
  // add other properties as needed
};

export default function TopicsList() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const name = searchParams.get("name");
  useEffect(() => {
    const fetchData = async () => {
      try {
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
        console.log(error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  // Extract unique locations from topics (assuming each topic has a 'location' property)
  const uniqueLocations = Array.from(
    new Set(topics.map((topic: any) => topic.location).filter(Boolean))
  );

  const filteredTopics = topics.filter((topic: any) => {
    const matchesSearch = topic.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesLocation =
      !selectedLocation || topic.location === selectedLocation;

    const notOwnItem = !name || topic.seller !== name;

    return matchesSearch && matchesLocation && notOwnItem;
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
      // whileHover={{ scale: 1.3 }}
      className="mx-auto px-4 py-8 bg-custom min-h-screen w-full"
    >
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search Items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="card w-full hover:ring-black hover:ring-1 p-3 pl-10 rounded-md border border-gray-300 focus:outline-none  focus:ring-black"
          />
          <Search className=" absolute left-3 top-3 text-gray-400" size={20} />
        </div>
        <div className="relative">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="card w-full md:w-48 p-3 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2  appearance-none"
          >
            <option className="card" value="">
              All Locations
            </option>
            {uniqueLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          <MapPin className="absolute left-4 top-5 text-gray-400" size={20} />
        </div>
      </div>
      <motion.div className="flex flex-wrap gap-6 justify-center max-w-full">
        <AnimatePresence>
          {filteredTopics.map((topic, index) => (
            <motion.div
              key={topic._id}
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: index * 0.3 }}
              // className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              className="max-w-sm w-full justify-between gap-3 lg:w-1/3 xl:w-1/4"
            >
              <AnimatedTopicCard key={topic._id} topic={topic} onHome={false} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {filteredTopics.length === 0 && (
        <>
          <p className="text-center text-gray-600 mt-8 text-lg">
            No such destinations found.
          </p>
          <Image
            src="/assests/404.gif"
            height={400}
            width={400}
            alt="404 Page"
            className="mx-auto shadow-md rounded-xl opacity-80 "
            objectFit="contain"
            loading="lazy"
          />
        </>
      )}
    </motion.div>
  );
}
