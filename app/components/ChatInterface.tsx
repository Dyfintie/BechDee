// "use client";
// import { useState, useEffect, useRef } from "react";
// import type React from "react";

// import { Send, Phone, Video, MoreVertical } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// interface Message {
//   id: string;
//   text: string;
//   sender: string;
//   timestamp: Date;
//   status: "sent" | "delivered" | "read";
// }

// interface ChatInterfaceProps {
//   sellerId: string;
//   productId: string;
// }

// const ChatInterface = ({ sellerId, productId }: ChatInterfaceProps) => {
//   const [messages, setMessages] = useState<Message[]>([
//     { 
//       id: "1",
//       text: "Hi! I'm interested in this item. Is it still available?",
//       sender: "buyer",
//       timestamp: new Date(Date.now() - 300000),
//       status: "read",
//     },
//     {
//       id: "2",
//       text: "Hello! Yes, it's still available. Would you like to know more about it?",
//       sender: "seller",
//       timestamp: new Date(Date.now() - 240000),
//       status: "read",
//     },
//     {
//       id: "3",
//       text: "Great! Can you tell me about the condition?",
//       sender: "buyer",
//       timestamp: new Date(Date.now() - 180000),
//       status: "read",
//     },
//   ]);

//   const [newMessage, setNewMessage] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       const message: Message = {
//         id: Date.now().toString(),
//         text: newMessage,
//         sender: "buyer",
//         timestamp: new Date(),
//         status: "sent",
//       };

//       setMessages((prev) => [...prev, message]);
//       setNewMessage("");

//       // Simulate seller typing and response
//       setTimeout(() => setIsTyping(true), 1000);
//       setTimeout(() => {
//         setIsTyping(false);
//         const sellerResponse: Message = {
//           id: (Date.now() + 1).toString(),
//           text: "Thanks for your message! I'll get back to you shortly.",
//           sender: "seller",
//           timestamp: new Date(),
//           status: "sent",
//         };
//         setMessages((prev) => [...prev, sellerResponse]);
//       }, 3000);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const formatTime = (date: Date) => {
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   };

//   return (
//     <div className="flex flex-col h-full">
//       {/* Chat Header */}
//       <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
//         <div className="flex items-center space-x-3">
//           <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
//             <span className="text-white font-medium text-sm">
//               {sellerId?.charAt(0).toUpperCase()}
//             </span>
//           </div>
//           <div>
//             <h3 className="font-medium text-gray-900">{sellerId}</h3>
//             <p className="text-sm text-gray-500">
//               Usually responds within an hour
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center space-x-2">
//           <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
//             <Phone className="h-5 w-5" />
//           </button>
//           <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
//             <Video className="h-5 w-5" />
//           </button>
//           <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
//             <MoreVertical className="h-5 w-5" />
//           </button>
//         </div>
//       </div>

//       {/* Messages Container */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         <AnimatePresence>
//           {messages.map((message) => (
//             <motion.div
//               key={message.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className={`flex ${
//                 message.sender === "buyer" ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
//                   message.sender === "buyer"
//                     ? "bg-blue-500 text-white rounded-br-md"
//                     : "bg-gray-100 text-gray-900 rounded-bl-md"
//                 }`}
//               >
//                 <p className="text-sm">{message.text}</p>
//                 <div
//                   className={`flex items-center justify-end mt-1 space-x-1 ${
//                     message.sender === "buyer"
//                       ? "text-blue-100"
//                       : "text-gray-500"
//                   }`}
//                 >
//                   <span className="text-xs">
//                     {formatTime(message.timestamp)}
//                   </span>
//                   {message.sender === "buyer" && (
//                     <div className="flex">
//                       <div
//                         className={`w-1 h-1 rounded-full ${
//                           message.status === "read"
//                             ? "bg-blue-200"
//                             : "bg-blue-300"
//                         }`}
//                       />
//                       <div
//                         className={`w-1 h-1 rounded-full ml-0.5 ${
//                           message.status === "read"
//                             ? "bg-blue-200"
//                             : "bg-blue-300"
//                         }`}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>

//         {/* Typing Indicator */}
//         {isTyping && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="flex justify-start"
//           >
//             <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-bl-md">
//               <div className="flex space-x-1">
//                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
//                 <div
//                   className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                   style={{ animationDelay: "0.1s" }}
//                 />
//                 <div
//                   className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                   style={{ animationDelay: "0.2s" }}
//                 />
//               </div>
//             </div>
//           </motion.div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       {/* Message Input */}
//       <div className="border-t bg-white p-4">
//         <div className="flex items-center space-x-3">
//           <div className="flex-1 relative">
//             <input
//               ref={inputRef}
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Type a message..."
//               className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>

//           <button
//             onClick={handleSendMessage}
//             disabled={!newMessage.trim()}
//             className={`p-3 rounded-full transition-colors ${
//               newMessage.trim()
//                 ? "bg-blue-500 text-white hover:bg-blue-600"
//                 : "bg-gray-100 text-gray-400 cursor-not-allowed"
//             }`}
//           >
//             <Send className="h-5 w-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;
