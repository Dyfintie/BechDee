"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/Loading";
import { Coursetype } from "@/types/Course";

const ViewCoursePage = () => {
  const params = useParams();
  const id = params?.id;
  const [course, setCourse] = useState<Coursetype | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const ADMIN_NAME = process.env.NEXT_PUBLIC_ADMIN || "Admin";
  const ADMIN_NUMBER = process.env.NEXT_PUBLIC_ADMIN_NUMBER;
  const PAY_ID = process.env.NEXT_PUBLIC_PAY_ID;
  const PAY_NAME = process.env.NEXT_PUBLIC_PAY_NAME;

  useEffect(() => {
    const fetchCourse = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/course/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch course");

        const result = await response.json();
        console.log("Fetched course:", result);
        setCourse(result.course);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchCourse();
  }, [id]);

  if (isLoading || !course) return <Loading />;

  return (
    <div className="mt-20 min-h-screen bg-gray-50">
      <div className="max-w-1/2 mx-auto px-4 sm:px-6 lg:px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Left Card */}
          <div className="card bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="mb-6">
                <Image
                  width={400}
                  height={600}
                  src={`data:image/png;base64,${course.thumbnail}`}
                  alt={course.title}
                  className="w-full h-80 object-cover rounded-lg"
                  priority
                />
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-gray-900"
              >
                {course.title}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold text-green-600 mt-2"
              >
                ₹{course.price || "Free"}
              </motion.div>
              <p className="mt-4 text-gray-700 leading-relaxed">
                {course.description}
              </p>
              <div className="mt-4 border-t pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase">
                    Instructor
                  </h3>
                  <p className="mt-1 text-gray-900 font-semibold">
                    {ADMIN_NAME}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase">
                    Category
                  </h3>
                  <p className="mt-1 text-gray-900">
                    {course.category || "General"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="card flex flex-col courses-center justify-center h-full bg-white p-6 rounded-xl shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Join Course</h2>
            <p className="text-gray-600 text-center">
              Scan QR to enroll or contact instructor
            </p>
            <Link
              href={`upi://pay?pa=${PAY_ID}&pn=${PAY_NAME}&am=${course.price}&cu=INR`}
            >
              <Image
                src="/assets/qr.jpg"
                alt="QR Code"
                width={200}
                height={200}
                className="rounded-lg border"
              />
            </Link>
            <a
              href={`https://wa.me/${ADMIN_NUMBER}?text=Hi, I'm interested in your course: ${course.title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCoursePage;
