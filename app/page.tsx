"use client";

import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import PostForm from "./components/PostForm";
import Footer from "./components/Footer";

export default function Home() {
  function scrollToCraft() {
    document.getElementById("craft")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection onTryClick={scrollToCraft} />
      <FeaturesSection />
      <PostForm />
      <Footer />
    </main>
  );
}
