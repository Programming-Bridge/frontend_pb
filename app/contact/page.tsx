import { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { ContactSection } from "../components/ContactSection";
import { TechStackSection } from "../components/TechStackSection";
import { StatsStrip } from "../components/StatsStrip";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Contact & Consultation | Programming Bridge",
  description:
    "Get in touch with our senior software engineering team. Share your requirements for a free architectural review and proposal within 24 hours.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar />
      <div className="pt-6">
        <ContactSection />
      </div>
      <TechStackSection />
      <StatsStrip />
      <Footer />
    </main>
  );
}
