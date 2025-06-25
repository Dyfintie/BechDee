import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Pop from "./components/Pop";
import Footer from "./components/Footer";
import Vision from "./components/Vision";
import Form from "./components/Form";
// import { motion } from "framer-motion";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <section className="w-full">
        <Pop />
      </section> */}
      <Vision />
      <Form />
      <Footer />
    </>
  );
}
