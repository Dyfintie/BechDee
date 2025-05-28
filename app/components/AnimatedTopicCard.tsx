"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { CurrencyRupee, Edit } from "@mui/icons-material";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
export default function AnimatedTopicCard({ topic, onHome, distance }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.03 }}
      className="flex flex-col justify-between bg-orange-100 h-[500px] rounded-[22px] border-[3px] border-black shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden p-4 font-work-sans"
    >
      <div className="relative w-full h-44 rounded-xl overflow-hidden">
        <Image
          src={`data:image/png;base64,${topic.file}`}
          alt={topic.title}
          layout="fill"
          objectFit="cover"
          className="card rounded-md"
        />
      </div>

      <div className="pt-4 space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-black line-clamp-2">
            {topic.title}
          </h2>
          <p className="text-sm text-gray-500">
            {formatDate(topic.date_created)}
          </p>
        </div>

        <p className="text-sm text-gray-700 line-clamp-2">{topic.content}</p>

        {distance!=null ? (
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <DirectionsWalkIcon fontSize="small" />
            <span>{distance}m away</span>
          </div>
        ) : onHome ? (
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <DirectionsWalkIcon fontSize="small" />
            <span>Not available!</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <DirectionsWalkIcon fontSize="small" />
            <span>Enable location to view distance!</span>
          </div>
        )}

        {topic.price && (
          <div className="flex items-center text-lg font-semibold text-green-700">
            <CurrencyRupee className="mr-1" />
            <span>{topic.price}</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-3 p-2 mt-3">
        <Image
          width={50}
          height={50}
          src={
            `data:image/png;base64,${topic?.profilepic}` ||
            topic.seller[0].toUpperCase()
          }
          alt={topic.seller[0].toUpperCase()}
          className="card rounded-full border border-black"
        />
        <span className="font-semibold text-black">{topic.seller}</span>
        {onHome && (
          <div className="flex gap-2">
            <RemoveBtn id={topic._id} />
            <Link href={`/edit/${topic._id}`}>
              <button
                className="px-5 py-1  border-2 border-black dark:border-white uppercase bg-white text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] rounded-md"
                title="Edit"
              >
                <Edit />
              </button>
            </Link>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => (window.location.href = `/items/${topic._id}`)}
          className="w-full  px-8 py-0.5  border-2 border-black dark:border-white rounded-md uppercase bg-green-200 text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)]"
        >
          <CurrencyRupee className="inline mr-1" />
          Buy Now
        </button>
      </div>
    </motion.div>
  );
}
