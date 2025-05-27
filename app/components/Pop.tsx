"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedTopicCard from "./AnimatedTopicCard";
// import ErrorPage from "../404";
// import Loading from "../Loading";

type Topic = {
  _id: string;
  [key: string]: string;
};

const Pop = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  
  // const [onHome, setOnhome] = useState(true);
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
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error instanceof Error) {
          console.log("Error message:", error);
        } else {
          
        }
      }
    };

    fetchData();
  }, []);

  const firstThreeTopics = topics.slice(0, 3);

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <motion.div className=" font-work-sans py-12 bg-custom ">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="mt-28 md:mt-10 text-3xl font-bold  text-black mb-6 text-center">
          Items on sale
        </h2>

        <motion.div className="flex flex-wrap gap-6 justify-center">
          <AnimatePresence>
            {firstThreeTopics.map((topic, index) => (
              <motion.div
                key={topic._id}
                initial={{ y: 200, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                // transition={{ delay: 0.5, duration: 1 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
                className="max-w-sm w-full justify-between gap-3 lg:w-1/3 xl:w-1/4"
              >
                <AnimatedTopicCard
                  key={topic._id}
                  topic={topic}
                  onHome={false}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Pop;
