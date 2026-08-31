import { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { ServicesSection } from "../components/ServicesSection";
import { TechStackSection } from "../components/TechStackSection";
import { StatsStrip } from "../components/StatsStrip";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Engineering Services & Capabilities | Programming Bridge",
  description:
    "Explore our full spectrum of software engineering capabilities: bespoke web & cloud, native mobile, AI/LLMs, and distributed microservices.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar />
      <ServicesSection isPage={true} />
      <TechStackSection />
      <StatsStrip />
      <Footer />
    </main>
  );
}
