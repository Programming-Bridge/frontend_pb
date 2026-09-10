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

const portfolioJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://www.programmingbridge.org/portfolio#webpage",
      "url": "https://www.programmingbridge.org/portfolio",
      "name": "Portfolio & Case Studies | Programming Bridge",
      "description":
        "Explore our featured client engagements, enterprise platforms, native mobile solutions, and intelligent cloud systems.",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.programmingbridge.org"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Portfolio",
          "item": "https://www.programmingbridge.org/portfolio"
        }
      ]
    }
  ]
};

export default function PortfolioPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioJsonLd),
        }}
      />
      <Navbar />
      <ProjectsSection isPage={true} />
      <TechStackSection />
      <StatsStrip />
      <ContactSection />
      <Footer />
    </main>
  );
}
