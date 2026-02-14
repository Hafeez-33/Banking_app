"use client";

import { FeaturesGrid } from "@/components/landing/features-grid";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Navbar } from "@/components/landing/navbar";
import { Security } from "@/components/landing/security";
import { Stats } from "@/components/landing/stats";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeaturesGrid />
      <Security />
      <Stats />
      <Footer />
    </main>
  )
}




