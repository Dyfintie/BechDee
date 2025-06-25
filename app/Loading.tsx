"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Brain, Heart, Smile, Leaf, Sun, Users } from "lucide-react";

const Loading = () => {
  // Animation variants for floating icons
  const iconVariants = {
    float: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [0.6, 0.8, 0.6],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Brain Icon - Top Left */}
        <motion.div
          variants={iconVariants}
          animate="float"
          className="absolute top-20 left-20 text-blue-300/40"
          style={{ animationDelay: "0s" }}
        >
          <Brain size={32} />
        </motion.div>

        {/* Heart Icon - Top Right */}
        <motion.div
          variants={pulseVariants}
          animate="pulse"
          className="absolute top-32 right-24 text-rose-300/40"
          style={{ animationDelay: "1s" }}
        >
          <Heart size={28} />
        </motion.div>

        {/* Smile Icon - Bottom Left */}
        <motion.div
          variants={iconVariants}
          animate="float"
          className="absolute bottom-32 left-32 text-yellow-300/40"
          style={{ animationDelay: "2s" }}
        >
          <Smile size={30} />
        </motion.div>

        {/* Leaf Icon - Bottom Right */}
        <motion.div
          variants={pulseVariants}
          animate="pulse"
          className="absolute bottom-20 right-20 text-green-300/40"
          style={{ animationDelay: "0.5s" }}
        >
          <Leaf size={26} />
        </motion.div>

        {/* Sun Icon - Top Center */}
        <motion.div
          variants={iconVariants}
          animate="float"
          className="absolute top-16 left-1/2 transform -translate-x-1/2 text-orange-300/40"
          style={{ animationDelay: "1.5s" }}
        >
          <Sun size={24} />
        </motion.div>

        {/* Users Icon - Bottom Center */}
        <motion.div
          variants={pulseVariants}
          animate="pulse"
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-purple-300/40"
          style={{ animationDelay: "2.5s" }}
        >
          <Users size={28} />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <Image src="/favicon.ico" width={80} height={80} alt="Logo" />

          {/* Subtle glow effect around logo */}
          <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl scale-150 animate-pulse"></div>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="mt-8 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full relative"
        style={{ maxWidth: "200px" }}
      >
        {/* Shimmer effect on progress bar */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse rounded-full"></div>
      </motion.div>

      {/* Text Content */}
      <div className="mt-6 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2"
        >
          MindCare
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-md text-gray-700 mt-2"
        >
          Your Journey to Wellness Begins Here
        </motion.p>

        {/* Subtle wellness indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex justify-center items-center space-x-2 mt-4"
        >
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;
