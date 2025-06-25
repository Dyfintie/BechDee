"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import {
  HiPencilAlt,
  HiUser,
  HiCalendar,
  HiClock,
  HiArrowRight,
} from "react-icons/hi";
import { formatDate } from "@/lib/utils";

export default function BlogCard({ topic, onHome }) {
  const readingTime = Math.ceil(topic.description.length / 200); // Estimate reading time

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden font-work-sans card border border-gray-100 group h-[520px] flex flex-col"
    >
      {/* Image Section with Overlay */}
      <div className="relative h-52 w-full overflow-hidden">
        <Link href={`/blog/${topic._id}`}>
          <Image
            src={`data:image/png;base64,${topic.file}`}
            alt={topic.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Reading Time Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <div className="flex items-center text-xs font-medium text-gray-700">
              <HiClock className="mr-1" />
              {readingTime} min read
            </div>
          </div>

          {/* Category Badge (if you want to add categories later) */}
          <div className="absolute top-4 left-4 bg-blue-500/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-semibold text-white">Blog</span>
          </div>
        </Link>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 flex flex-col">
        <Link href={`/blog/${topic._id}`} className="flex-1 flex flex-col">
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
            {topic.title}
          </h2>

          {/* Author and Date */}
          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
            <div className="flex items-center">
              <HiUser className="mr-1 text-gray-400" />
              <span className="font-medium">{topic.author}</span>
            </div>
            <div className="flex items-center">
              <HiCalendar className="mr-1 text-gray-400" />
              <span>{formatDate(topic.date_created)}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed flex-1">
            {topic.description}
          </p>

          {/* Read More Link */}
          <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors">
            <span>Read More</span>
            <HiArrowRight className="ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </Link>

        {/* Admin Actions */}
        {!onHome && (
          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <RemoveBtn id={topic._id} type="blog" />
            </motion.div>
            <Link href={`/editTopic/${topic._id}`}>
              <motion.button
                className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 group/edit"
                title="Edit Blog Post"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <HiPencilAlt
                  size={20}
                  className="text-blue-600 group-hover/edit:text-blue-700 transition-colors"
                />
              </motion.button>
            </Link>
          </div>
        )}
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </motion.div>
  );
}
