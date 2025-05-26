import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Pop from "./components/Pop";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen w-full bg-custom pt-11 md:pt-5 ">
        <Hero />
      </section>
      <section className="w-full">
        <Pop />
      </section>
      <Footer />
    </>
  );
}
