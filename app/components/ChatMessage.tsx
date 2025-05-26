"use client";
import { motion } from "framer-motion";
import { Check, CheckCheck, Clock, Info } from "lucide-react";
import Image from "next/image";
interface ChatMessageProps {
  sender: string;
  message: string;
  isOwnMessage: boolean;
  isSystemMessage: boolean;
  timestamp?: Date;
  status?: "sending" | "sent" | "delivered" | "read";
  avatar?: string;
}

const ChatMessage = ({
  sender,
  message,
  isOwnMessage,
  timestamp = new Date(),
  status = "read",
  avatar,
}: ChatMessageProps) => {
  const isSystemMessage = sender === "system";

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getStatusIcon = () => {
    switch (status) {
      case "sending":
        return <Clock className="w-3 h-3 text-gray-400" />;
      case "sent":
        return <Check className="w-3 h-3 text-gray-400" />;
      case "delivered":
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case "read":
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  if (isSystemMessage) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex justify-center my-4"
      >
        <div className="bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 flex items-center space-x-2 shadow-sm">
          <Info className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            {message}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`flex ${
        isOwnMessage ? "justify-end" : "justify-start"
      } mb-4 group`}
    >
      <div
        className={`flex items-end space-x-2 max-w-xs sm:max-w-md ${
          isOwnMessage ? "flex-row-reverse space-x-reverse" : ""
        }`}
      >
        {/* Avatar */}
        {!isOwnMessage && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold shadow-md">
            {avatar ? (
              <Image
                src={avatar || "/placeholder.svg"}
                alt={sender}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              sender.charAt(0).toUpperCase()
            )}
          </div>
        )}

        {/* Message Container */}
        <div className={`relative ${isOwnMessage ? "ml-auto" : ""}`}>
          {/* Sender Name (for received messages) */}
          {!isOwnMessage && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 ml-3 font-medium">
              {sender}
            </p>
          )}

          {/* Message Bubble */}
          <div
            className={`relative px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 group-hover:shadow-md ${
              isOwnMessage
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md"
                : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-bl-md"
            }`}
          >
            {/* Message Text */}
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message}
            </p>

            {/* Timestamp and Status */}
            <div
              className={`flex items-center justify-end mt-2 space-x-1 ${
                isOwnMessage
                  ? "text-blue-100"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <span className="text-xs opacity-75">
                {formatTime(timestamp)}
              </span>
              {isOwnMessage && (
                <div className="opacity-75">{getStatusIcon()}</div>
              )}
            </div>

            {/* Message Tail */}
            <div
              className={`absolute bottom-0 w-3 h-3 ${
                isOwnMessage
                  ? "right-0 transform translate-x-1 translate-y-1"
                  : "left-0 transform -translate-x-1 translate-y-1"
              }`}
            >
              <div
                className={`w-full h-full transform rotate-45 ${
                  isOwnMessage
                    ? "bg-blue-600"
                    : "bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-700"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Own Message Avatar */}
        {isOwnMessage && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-sm font-semibold shadow-md">
            {avatar ? (
              <Image
                src={avatar || "/placeholder.svg"}
                alt="You"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              "You".charAt(0)
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
