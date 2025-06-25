"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/Loading";
import { Itemtype } from "@/types/Item";
interface Seller {
  sellername: string;
  sellerimg: string;
  sellernumber?: string;
}
const ViewitemPage = () => {
  const params = useParams();
  const id = params?.id;
  const [topic, setTopic] = useState<Itemtype | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [seller, setSeller] = useState<Seller | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/items/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch topic");
        }

        const result = await response.json();
        setTopic(result.item);
        setSeller(result.seller);
      } catch (error) {
        console.error("Error fetching topic:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, apiUrl]);

  if (isLoading || !topic) {
    return <Loading />;
  }

  return (
    <div className="mt-20 min-h-screen bg-gray-50">
      <div className="max-w-1/2 mx-auto px-4 sm:px-6 lg:px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          <div className=" card bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="mb-6">
                <Image
                  width={400}
                  height={600}
                  src={`data:image/png;base64,${topic.file}`}
                  alt={topic.title}
                  className="w-full h-80 sm:h-80 object-cover rounded-lg"
                  priority
                />
              </div>

              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl sm:text-3xl font-bold text-gray-900"
                >
                  {topic.title}
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl font-bold text-green-600"
                >
                  ₹{topic.price || "999.99"}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3"
                >
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      Description
                    </h3>
                    <p className="mt-1 text-gray-900 leading-relaxed">
                      {topic.content}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Seller
                      </h3>
                      <p className="mt-1 text-gray-900 font-medium">
                        {/* {seller.sellername || "Devika"} */}
                        Devika
                      </p>
                      {/* <Image
                        src={`data:image/png;base64,${seller.sellerimg}`}
                        alt={seller.sellername}
                        width={50}
                        height={50}
                        className=" card rounded-full"
                      /> */}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Location
                      </h3>
                      <p className="mt-1 text-gray-900">
                        {topic.location || "Online"}
                      </p>
                    </div>
                    {/* <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Category
                      </h3>
                      <p className="mt-1 text-gray-900">
                        {topic.category || "Electronics"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Condition
                      </h3>
                      <p className="mt-1 text-gray-900">
                        {topic.condition || "Like New"}
                      </p>
                    </div> */}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="card flex flex-col items-center justify-center h-full space-y-4 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800">Contact Seller</h2>
            <p className="text-gray-600">SUS QR 🤔</p>
            <Link
              href={`upi://pay?pa=${process.env.NEXT_PUBLIC_PAY_ID}&pn=${process.env.NEXT_PUBLIC_PAY_NAME}&am=1&cu=INR`}
            >
              <Image
                src="/assests/qr.jpg"
                alt="Gpay QR Code"
                width={200}
                height={200}
                className="rounded-lg border border-gray-300"
              />
            </Link>
            <a
              href="https://wa.me/+919650117150?text=Hello,%20I%20would%20like%20to%20book%20a%20therapy%20session."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewitemPage;
