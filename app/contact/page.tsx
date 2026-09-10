import { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { ContactSection } from "../components/ContactSection";
import { TechStackSection } from "../components/TechStackSection";
import { StatsStrip } from "../components/StatsStrip";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Contact & Consultation | Programming Bridge",
  description:
    "Get in touch with our senior software engineering team. Share your requirements for a free architectural review and proposal within 2 hours.",
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://www.programmingbridge.org/contact#webpage",
      "url": "https://www.programmingbridge.org/contact",
      "name": "Contact & Technical Consultation | Programming Bridge",
      "description":
        "Get in touch with our senior software engineering team. Share your requirements for a free architectural review and proposal within 2 hours.",
      "mainEntity": {
        "@type": "Organization",
        "name": "Programming Bridge",
        "url": "https://www.programmingbridge.org",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Technical Sales & Consultation",
          "email": "official@programmingbridge.org",
          "telephone": "+92-315-5831940",
          "availableLanguage": ["English", "Urdu"]
        }
      }
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
          "name": "Contact",
          "item": "https://www.programmingbridge.org/contact"
        }
      ]
    }
  ]
};

export default function ContactPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactJsonLd),
        }}
      />
      <Navbar />
      <ContactSection isPage={true} />
      <TechStackSection />
      <StatsStrip />
      <Footer />
    </main>
  );
}
