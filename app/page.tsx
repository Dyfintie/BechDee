import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Pop from "./components/Pop";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <section className="w-full">
        <Pop />
      </section>
      <Footer />
    </>
  );
}
