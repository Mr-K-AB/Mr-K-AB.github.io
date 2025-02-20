import { motion } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Summary from "@/components/Summary";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ProjectShowcase from "@/components/ProjectShowcase";
import { fadeIn } from "@/styles/animations";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <Header />
        <main className="container mx-auto px-4">
          <Hero />
          <Summary />
          <Experience />
          <Skills />
          <ProjectShowcase />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}