"use client";
import { useRef } from "react";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import PostForm from "./components/PostForm";
import Footer from "./components/Footer";

export default function Home() {
  const craftRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <HeroSection onTryClick={() => craftRef.current?.scrollIntoView({ behavior: "smooth" })} />
      <FeaturesSection />
      <div ref={craftRef}><PostForm /></div>
      <Footer />
    </>
  );
}
