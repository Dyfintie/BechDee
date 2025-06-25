"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  CurrencyRupee,
  Edit,
  AccessTime,
  TrendingUp,
  Person,
} from "@mui/icons-material";
import RemoveBtn from "./RemoveBtn";
import { formatDate } from "@/lib/utils";

export default function CourseCard({ topic, onHome }) {
  const getLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-300";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "advanced":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getLevelIcon = (level) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return "🌱";
      case "intermediate":
        return "🚀";
      case "advanced":
        return "⭐";
      default:
        return "📚";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{
        scale: 1.03,
        boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.8)",
      }}
      className="bg-orange-100 border-2 border-black rounded-[22px] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden font-work-sans flex flex-col h-[580px] group"
    >
      {/* Image Section with Overlay */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={`data:image/png;base64,${topic.thumbnail}`}
          alt={topic.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />

        {/* Date Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg border border-black/20">
          <span className="text-xs font-medium text-gray-700">
            {formatDate(topic.date_created)}
          </span>
        </div>

        {/* Level Badge */}
        <div
          className={`absolute top-3 left-3 px-3 py-1 rounded-full border text-xs font-semibold ${getLevelColor(
            topic.level
          )}`}
        >
          <span className="mr-1">{getLevelIcon(topic.level)}</span>
          {topic.level}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-5 flex flex-col">
        {/* Title */}
        <div className="mb-3">
          <h2 className="text-xl font-bold text-black line-clamp-2 leading-tight group-hover:text-gray-800 transition-colors">
            {topic.title}
          </h2>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 line-clamp-3 mb-4 leading-relaxed">
          {topic.description}
        </p>

        {/* Course Details */}
        <div className="space-y-3 mb-4">
          {/* Duration */}
          {topic.duration && (
            <div className="flex items-center text-sm text-gray-600">
              <AccessTime fontSize="small" className="mr-2 text-blue-600" />
              <span className="font-medium">Duration: </span>
              <span className="ml-1">{topic.duration} weeks</span>
            </div>
          )}

          {/* Instructor */}
          {topic.instructor && (
            <div className="flex items-center text-sm text-gray-600">
              <Person fontSize="small" className="mr-2 text-purple-600" />
              <span className="font-medium">Instructor: </span>
              <span className="ml-1">{topic.instructor}</span>
            </div>
          )}
        </div>

        {/* Price Section */}
        {topic.price ? (
          <div className="mb-4">
            <div className="bg-white/60 backdrop-blur-sm border-2 border-black/10 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-green-700 flex items-center justify-center">
                <CurrencyRupee fontSize="medium" className="mr-1" />
                {topic.price}
              </div>
              <div className="text-xs text-gray-600 mt-1">Course Fee</div>
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <div className="bg-white/60 backdrop-blur-sm border-2 border-black/10 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-green-700 flex items-center justify-center">
                FREE
              </div>
            </div>
          </div>
        )}

        {/* Spacer to push buttons to bottom */}
        <div className="flex-1"></div>

        {/* Action Buttons */}
        <div className="space-y-3 mt-auto">
          {/* Primary Action Button */}
          <motion.button
            onClick={() => (window.location.href = `/course/${topic._id}`)}
            className="w-full px-6 py-3 border-2 border-black rounded-xl uppercase bg-green-200 text-black text-sm font-bold transition duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <CurrencyRupee fontSize="small" className="mr-2" />
            Book Now
            <TrendingUp fontSize="small" className="ml-2" />
          </motion.button>

          {/* Edit/Remove Buttons for Admin */}
          {onHome && (
            <div className="flex gap-2">
              <div className="flex-1">
                <RemoveBtn id={topic._id} type="course" />
              </div>
              <Link href={`/edit/${topic._id}`} className="flex-1">
                <motion.button
                  className="w-full px-4 py-2 border-2 border-black bg-white text-black text-sm rounded-xl font-semibold transition duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0)] hover:translate-x-[-1px] hover:translate-y-[-1px] flex items-center justify-center"
                  title="Edit Course"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Edit fontSize="small" className="mr-1" />
                  Edit
                </motion.button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
