"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="relative">
        <Image src="/assests/favicon.jpg" width={80} height={80} alt="Logo" />
      </div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="mt-8 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
        style={{ maxWidth: "200px" }}
      />
      <div className="mt-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold bg-gradient-to-r text-black  mb-2"
        >
          Bechde
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-md text-gray-800 mt-2"
        >
          Saman BechDE!!
        </motion.p>
      </div>
    </div>
  );
};

export default Loading;
