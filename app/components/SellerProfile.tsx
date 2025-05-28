"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Loading from "@/Loading";
import { Card, CardContent } from "@/components/ui/card";
import CircularProgress from "@mui/material/CircularProgress";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import AnimatedTopicCard from "./AnimatedTopicCard";
import PhoneEdit from "./PhoneEdit";
interface SellerData {
  id: string;
  sellername: string;
  email: string;
  sellernumber: string;
  // location: string;
  sellerimg: string;
}

interface SellerItem {
  _id: string;
  title: string;
  email: string;
  seller: string;
  file: string;
  content: string;
  price: number;
  location: string;
  category: string;
  tags: string;
  status: string;
}

const SellerProfile = ({ email }) => {
  const [activeTab, setActiveTab] = useState("items");
  const [sellerItems, setSellerItems] = useState<SellerItem[]>([]);
  const [seller, setSellerData] = useState<SellerData | null>(null);
  useEffect(() => {
    const fetchSellerItems = async () => {
      try {
        const response = await fetch(`/api/login/${email}`);
        // if (!response.ok) throw new Error("Failed to fetch seller items");
        const data = await response.json();

        setSellerItems(data);
      } catch (error) {
        console.error("Error fetching seller items:", error);
      }
    };
    fetchSellerItems();
  }, [email]);
  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const response = await fetch(`/api/seller/${email}`);
        if (!response.ok) throw new Error("Failed to fetch seller data");
        const data = await response.json();

        setSellerData(data);
      } catch (error) {
        console.error("Error fetching seller data:", error);
      }
    };

    fetchSellerData();
  }, [email]);

  if (!seller) {
    return <Loading />;
  }

  return (
    <div className="mt-24 min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="card mb-8 overflow-hidden bg-gradient-to-r from-white to-green-50/50 border-0 shadow-xl">
            <CardContent className=" p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex flex-col items-center justify-center lg:items-start">
                  <div className="flex-row justify-center items-center">
                    <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                      <AvatarImage
                        src={`data:image/png;base64,${seller?.sellerimg}`}
                        alt={seller?.sellername || "Seller Avatar"}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-500 text-white text-3xl">
                        A
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="ml-5 text-center lg:text-left">
                    <h1 className=" text-3xl font-bold text-gray-900 mb-2">
                      {seller.sellername}
                    </h1>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium text-gray-900">
                            {seller.email}
                          </p>
                        </div>
                      </div>
                      <PhoneEdit seller={seller} />
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium text-gray-900">
                            {/* {seller.location} */}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {/* <div className="flex gap-4 mt-6">
                    <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact Seller
                    </Button>
                  </div> */}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {sellerItems.length > 0 ? (
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsContent value="items">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sellerItems.map((item, index) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <AnimatedTopicCard topic={item} onHome={true} />
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center animate-fadeIn">
              <CircularProgress />
              Loading...
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SellerProfile;
