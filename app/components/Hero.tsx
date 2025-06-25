"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="bg-[url(/assests/hero.jpg)]  bg-cover bg-center bg-no-repeat min-h-screen w-full flex flex-col md:flex-row items-center justify-between p-5 gap-8">
      <motion.div
        initial={{ y: -100, opacity: 1 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="w-full md:w-1/2 space-y-6 text-center md:text-left bg-custom bg-opacity-40 rounded-[22px] transition-all duration-500 p-6 sm:p-10"
      >
        <motion.h1
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="pt-24  md:pt-5 font-bold font-work-sans text-4xl sm:text-5xl lg:text-6xl text-black px-2"
        >
          KuDam
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-black px-2"
        >
          Footsteps to Strength
          {/* <span className="text-green-600">Becho Befikar</span> */}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="text-lg sm:text-xl text-black max-w-xl mx-auto md:mx-0 p-2"
        >
          Kudam counselling, take the first step towards a brighter future.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Hero;
