import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutUsSection } from "./components/AboutUsSection";
import { ServicesSection } from "./components/ServicesSection";
import { TechStackSection } from "./components/TechStackSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { StatsStrip } from "./components/StatsStrip";
import { InquirySection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar />
      <HeroSection />
      <AboutUsSection />
      <ServicesSection />
      <TechStackSection />
      <ProjectsSection />
      <StatsStrip />
      <InquirySection />
      <Footer />
    </main>
  );
}