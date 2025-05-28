"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedTopicCard from "./AnimatedTopicCard";
import { useSearchParams } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import Image from "next/image";
import Loading from "../Loading";
import ErrorPage from "../404";
import { Itemtype } from "../types/Item";

export default function ItemList() {
  const [topics, setTopics] = useState<Itemtype[]>([]);
  const [userCoords, setUserCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationError, setLocationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const searchParams = useSearchParams();
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

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const position = await getCurrentPosition();
        setUserCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      } catch (err) {
        console.error("Geolocation error:", err);
        setLocationError("Unable to access location.");
      }
      console.log(userCoords);
    };

    fetchUserLocation();
  }, []);

  const uniqueLocations = Array.from(
    new Set(
      topics
        .map((topic: Itemtype & { location?: string }) => topic.location)
        .filter(Boolean)
    )
  );

  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 3600000,
      });
    });
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371000;
    const toRad = (value: number) => (value * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const filteredTopics = topics.filter((topic: Itemtype) => {
    const matchesSearch = topic.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesLocation =
      !selectedLocation || topic.location === selectedLocation;

    const notOwnItem = !name || topic.seller !== name;

    return matchesSearch && matchesLocation && notOwnItem;
  });

  const sortedTopics = [...filteredTopics].sort((a, b) => {
    const aDistance =
      a.latitude && a.longitude && userCoords
        ? calculateDistance(
            userCoords.latitude,
            userCoords.longitude,
            Number(a.latitude),
            Number(a.longitude)
          )
        : Infinity;
    const bDistance =
      b.latitude && b.longitude && userCoords
        ? calculateDistance(
            userCoords.latitude,
            userCoords.longitude,
            Number(b.latitude),
            Number(b.longitude)
          )
        : Infinity;
    return aDistance - bDistance;
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
          {sortedTopics.map((topic, index) => {
            const distance =
              userCoords && topic.latitude && topic.longitude
                ? calculateDistance(
                    userCoords.latitude,
                    userCoords.longitude,
                    Number(topic.latitude),
                    Number(topic.longitude)
                  )
                : null;

            return (
              <motion.div
                key={topic._id}
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: index * 0.3 }}
                className="max-w-sm w-full justify-between gap-3 lg:w-1/3 xl:w-1/4"
              >
                <AnimatedTopicCard
                  key={topic._id}
                  topic={topic}
                  onHome={false}
                  distance={distance} // pass to card if needed
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
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
            className="mx-auto shadow-md rounded-xl opacity-80 "
            objectFit="contain"
            loading="lazy"
          />
        </>
      )}
    </motion.div>
  );
}
