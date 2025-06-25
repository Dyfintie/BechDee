"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share,
  Bookmark,
  Heart,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";

const BlogPage = ({ topic }) => {
  const router = useRouter();
  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const wordCount = text.split(" ").length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  return (
    <div className="min-h-screen bg-custom">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50"
      >
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-black transition-colors duration-200 font-medium"
          >
            <ArrowLeft className="mr-2 w-5 h-5" /> Back
          </button>
        </div>
      </motion.nav>

      <article className="max-w-4xl mx-auto px-6 py-12">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-8 font-serif">
            {topic.title}
          </h1>

          <div className="flex items-center text-sm text-gray-600 space-x-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(topic.date_created)}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {calculateReadingTime(topic.description)} min read
            </div>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative w-full h-[60vh] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={`data:image/png;base64,${topic.file}`}
              alt={topic.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="prose prose-xl prose-gray max-w-none"
        >
          <div className="text-xl leading-relaxed text-gray-800 font-serif space-y-6">
            {topic.description.split("\n\n").map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="text-justify leading-8"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </article>
    </div>
  );
};

export default BlogPage;
