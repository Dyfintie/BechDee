"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = { name, email, mobile, message };
      console.log("Form submitted:", formData);
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
      const data = await response.json();
      console.log("Form submitted:", data);
      setName("");
      setEmail("");
      setMobile("");
      setMessage("");
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to send message. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <main className="max-w-xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 👇 Heading and Subtext */}
          <div className="mb-10 text-center">
            <h4 className="text-3xl font-bold text-gray-800">
              Way to Strength
            </h4>
            <p className="mt-2 text-lg font-medium text-gray-600">
              Kudam counselling is a one-to-one session which is booked by
              sending a query. Within 24 hours, the session is booked.
            </p>
          </div>

          {/* 👇 Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="name" className="text-lg font-medium">
                Name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="card w-full px-4 py-2 border border-gray-300 rounded-md text-lg"
                type="text"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="text-lg font-medium">
                Email
              </label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="card w-full px-4 py-2 border border-gray-300 rounded-md text-lg"
                type="email"
                placeholder="Your email"
                required
              />
            </div>

            <div>
              <label htmlFor="mobile" className="text-lg font-medium">
                Mobile Number
              </label>
              <input
                id="mobile"
                value={mobile}
                onChange={(e) =>
                  setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                className="card w-full px-4 py-2 border border-gray-300 rounded-md text-lg"
                type="tel"
                placeholder="10-digit mobile number"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="text-lg font-medium">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="card w-full px-4 py-2 border border-gray-300 rounded-md text-lg"
                placeholder="Your message..."
                rows={5}
                required
              />
            </div>

            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn bg-black text-white font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition duration-300"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
