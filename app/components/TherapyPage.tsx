"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface TherapyCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  isReversed?: boolean;
  index: number;
}

const TherapyCard = ({
  title,
  description,
  imageUrl,
  imageAlt,
  isReversed = false,
  index,
}: TherapyCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      x: isReversed ? 50 : -50,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.2,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      x: isReversed ? -50 : 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.2 + 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-24 ${
        isReversed ? "lg:grid-flow-col-dense" : ""
      }`}
    >
      {/* Content Section */}
      <div className={`space-y-6 ${isReversed ? "lg:col-start-2" : ""}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-sans">
            {title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6"></div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
          className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-justify font-sans"
          style={{ lineHeight: 1.4 }}
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
          className="pt-4"
        >
          <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Learn More
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Image Section */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={imageVariants}
        className={`relative ${isReversed ? "lg:col-start-1" : ""}`}
      >
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={imageAlt}
            width={600}
            height={400}
            className="w-full h-auto object-cover"
            style={{ width: "90%", height: "auto" }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-indigo-600/10 rounded-2xl"></div>
        </div>

        {/* Decorative elements */}
        <div
          className={`absolute -top-4 ${
            isReversed ? "-left-4" : "-right-4"
          } w-20 h-20 bg-blue-500/10 rounded-full blur-xl`}
        ></div>
        <div
          className={`absolute -bottom-6 ${
            isReversed ? "-right-6" : "-left-6"
          } w-24 h-24 bg-indigo-500/10 rounded-full blur-xl`}
        ></div>
      </motion.div>
    </motion.div>
  );
};

const TherapiesOffered = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const therapies = [
    {
      title: "Talk Therapy",
      description:
        "This is the first therapy the counselor and client will have. In this the individual will express the thoughts going on mind and heart.",
      imageUrl:
        "https://d502jbuhuh9wk.cloudfront.net/orgData/65c77500e4b0d8a03ab0fa90/pages/assets/images/ygBsehowtherapyworks.png",
      imageAlt: "How therapy works - counselor and client session",
    },
    {
      title: "Cognitive Behavioral Therapy",
      description:
        "This therapy focuses on the individual cognition and behavior.",
      imageUrl:
        "https://d502jbuhuh9wk.cloudfront.net/orgData/65c77500e4b0d8a03ab0fa90/pages/assets/images/Uc10wmind.png",
      imageAlt: "Mind illustration representing cognitive behavioral therapy",
    },
    {
      title: "Art Therapy",
      description:
        "This therapy uses creative expression as a powerful tool for healing and self-discovery. Through various art forms like drawing, painting, and sculpting, individuals can explore emotions, process experiences, and communicate feelings that may be difficult to express through words alone.",
      imageUrl:
        "https://d502jbuhuh9wk.cloudfront.net/orgData/65c77500e4b0d8a03ab0fa90/pages/assets/images/jIM6Zarttherapy2.jpg",
      imageAlt: "Art therapy session with creative materials and artwork",
    },
    {
      title: "Mandala Therapy",
      description:
        "This therapy focuses on creating circular, symmetrical designs that represent wholeness and unity. Mandala creation is a meditative practice that helps individuals center themselves, reduce stress, and explore their inner world through symbolic art and mindful creation.",
      imageUrl:
        "https://d502jbuhuh9wk.cloudfront.net/orgData/65c77500e4b0d8a03ab0fa90/pages/assets/images/Yg6nzmandalaarttherapy2.png",
      imageAlt: "Mandala art therapy with circular patterns and designs",
    },
  ];

  return (
    <section className="w-full bg-white dark:bg-gray-900 py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={
            isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
          }
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            style={{ letterSpacing: "2px", marginBottom: "0px" }}
          >
            Therapies offered
          </motion.h1>

          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            animate={
              isHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-sans"
            style={{ marginTop: "0px" }}
          >
            Therapy is a course of action or tasks attempted which act like a
            guide to an individual.
          </motion.h3>
        </motion.div>

        {/* Therapy Cards */}
        <div className="space-y-0">
          {therapies.map((therapy, index) => (
            <TherapyCard
              key={therapy.title}
              title={therapy.title}
              description={therapy.description}
              imageUrl={therapy.imageUrl}
              imageAlt={therapy.imageAlt}
              isReversed={index % 2 === 1}
              index={index}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 lg:mt-24"
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Begin Your Healing Journey?
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Our experienced therapists are here to support you every step of
              the way. Contact us today to schedule your consultation.
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg">
              Schedule Consultation
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TherapiesOffered;
