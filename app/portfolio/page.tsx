import { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { ProjectsSection } from "../components/ProjectsSection";
import { TechStackSection } from "../components/TechStackSection";
import { StatsStrip } from "../components/StatsStrip";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies | Programming Bridge",
  description:
    "Explore our featured client engagements, enterprise platforms, native mobile solutions, and intelligent cloud systems.",
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar />
      <div className="pt-6">
        <ProjectsSection />
      </div>
      <TechStackSection />
      <StatsStrip />
      <ContactSection />
      <Footer />
    </main>
  );
}
