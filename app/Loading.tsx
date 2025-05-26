"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Package, CreditCard, Heart, Star } from "lucide-react";
import Image from "next/image";
const Loading = () => {
  const floatingIcons = [
    { Icon: ShoppingCart, delay: 0, x: -20, y: -30 },
    { Icon: Package, delay: 0.2, x: 20, y: -20 },
    { Icon: CreditCard, delay: 0.4, x: -15, y: 25 },
    { Icon: Heart, delay: 0.6, x: 25, y: 20 },
    { Icon: Star, delay: 0.8, x: 0, y: -40 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="relative">
        {/* Central Logo/Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl"
        >
          <motion.div
            animate={{ rotate: [0,100] }}
            transition={{
              duration: 3,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            }}
            className="text-white text-3xl md:text-4xl font-bold"
          >
            <Image
              src="/assests/favicon.jpg"
              width={50}
              height={50}
              alt="Logo"
            />
          </motion.div>
        </motion.div>

        {/* Floating Icons */}
        {floatingIcons.map(({ Icon, delay, x, y }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
              x: [0, x, x, 0],
              y: [0, y, y, 0],
            }}
            transition={{
              duration: 2,
              delay: delay,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 1,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
              <Icon className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Loading Progress Bar */}
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
          className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2"
        >
          Bechde
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-sm text-gray-600 mt-2"
        >
          Your marketplace for everything
        </motion.p>
      </div>

      {/* Loading Dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex space-x-2 mt-4"
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
            className="w-2 h-2 bg-green-500 rounded-full"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Loading;
