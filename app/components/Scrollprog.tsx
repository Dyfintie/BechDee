"use client";
import { motion, useScroll } from "framer-motion";

const Scrollprog = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{
        scale: scrollYProgress,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 8,
        originX: 0,
        backgroundColor: "#FF0010",
      }}
    />
  );
};

export default Scrollprog;
