import { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { AboutUsSection } from "../components/AboutUsSection";
import { TechStackSection } from "../components/TechStackSection";
import { StatsStrip } from "../components/StatsStrip";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "About Us | Programming Bridge",
  description:
    "Learn about our engineering philosophy, mission, senior software squads, and client delivery standards.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar />
      <AboutUsSection isPage={true} />
      <TechStackSection />
      <StatsStrip />
      <ContactSection />
      <Footer />
    </main>
  );
}
