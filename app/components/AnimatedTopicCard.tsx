"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
export default function AnimatedTopicCard({ topic, onHome }) {
  const [isAuth, setAuth] = useState();

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

        <div className="flex items-center gap-1 text-sm text-gray-600">
          <LocationOnIcon fontSize="small" />
          <span>{topic.location}</span>
        </div>

        {topic.price && (
          <div className="flex items-center text-lg font-semibold text-green-700">
            <CurrencyRupeeIcon className="mr-1" />
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
          <div>
            <RemoveBtn
              id={topic._id}
              className="card ml-auto flex justify-end p-2 border-2 border-black rounded-md bg-red-200 text-black hover:bg-red-300 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0)]"
              title="Delete"
            />

            <Link href={`/editTopic/${topic._id}`}>
              <button className="btn rounded-md" title="Edit">
                <EditIcon />
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* <div className="flex justify-end gap-3 mt-3">
        <button
          onClick={() => RemoveBtn({ id: topic._id })}
          className="card flex justify-end p-2 border-2 border-black rounded-md bg-red-200 text-black hover:bg-red-300 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0)]"
          title="Delete"
        >
          DELETE
        </button>
        <Link href={`/editTopic/${topic._id}`}>
          <button
            className="card p-2 border-2 border-black rounded-md bg-yellow-200 text-black hover:bg-yellow-300 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0)]"
            title="Edit"
          >
            EDIT
          </button>
        </Link>
      </div> */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => (window.location.href = `/items/${topic._id}`)}
          className="w-full  px-8 py-0.5  border-2 border-black dark:border-white rounded-md uppercase bg-green-200 text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)]"
        >
          <CurrencyRupeeIcon className="inline mr-1" />
          Buy Now
        </button>
      </div>
    </motion.div>
  );
}
