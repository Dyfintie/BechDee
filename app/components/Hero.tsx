"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="bg-custom min-h-screen w-full flex flex-col md:flex-row items-center justify-between p-5 gap-8 overflow-hidden">
      <motion.div
        initial={{ y: -100, opacity: 1 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="w-full md:w-1/2 space-y-6 text-center md:text-left bg-custom rounded-[22px] transition-all duration-500 p-6 sm:p-10"
      >
        <motion.h1
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="pt-24 md:pt-5 font-bold font-work-sans text-4xl sm:text-5xl lg:text-6xl text-green-700 px-2"
        >
          Bech
          <motion.span
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="text-primary px-1"
          >
            Dee
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-black px-2"
        >
          Books, cooler, fan bechna hai?
          <span className="text-green-600">Becho Befikar</span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="text-lg sm:text-xl text-black max-w-xl mx-auto md:mx-0 p-2"
        >
          Looking to sell your books, cooler, or fan? List them now and connect
          with eager buyers in seconds. Why wait? Start selling today and turn
          your unused items into cash!
        </motion.p>
      </motion.div>

      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src="/assests/hero.jpeg"
          alt="Hero Image"
          width={700}
          height={300}
          className="w-full h-auto rounded-xl object-cover max-w-[500px] card"
          priority
        />
      </div>
    </div>
  );
};

export default Hero;
