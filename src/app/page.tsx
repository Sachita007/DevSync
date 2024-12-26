"use client";
import React, { useState } from "react";
import { Header } from "./_homePage/Header";
import { Hero } from "./_homePage/Hero";
import { Features } from "./_homePage/Features";
import { HowItWorks } from "./_homePage/HowItWorks";
import { Demo } from "./_homePage/Demo";
import { Testimonials } from "./_homePage/Testimonials";
import { Pricing } from "./_homePage/Pricing";
import { Footer } from "./_homePage/Footer";


export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <Hero />
      <Features />
      <HowItWorks />
      <Demo />
      <Testimonials />
      <Pricing />
      <Footer />
    </div>
  );
}