import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeSync } from "./components/ThemeSync";
import { StoreProvider } from "./StoreProvider";
import { AppPreloader } from "./components/AppPreloader";
import { TawkTo } from "./components/TawkTo";
import { ChatBot } from "./components/ChatBot";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-PBENGINEER1";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.programmingbridge.org"),
  alternates: {
    canonical: "./",
  },
  title: "Programming Bridge | Full-Stack Digital Engineering Studio",
  description:
    "We design, build, and scale production-grade web applications, native mobile apps, and cloud infrastructures for startups and enterprise teams.",
  authors: [{ name: "Programming Bridge" }],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "any" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/icon.png"],
  },
  openGraph: {
    title: "Programming Bridge | Full-Stack Digital Engineering Studio",
    description:
      "Bespoke web applications, mobile platforms, and distributed cloud systems.",
    type: "website",
    siteName: "Programming Bridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Programming Bridge - Full-Stack Digital Engineering Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Programming Bridge | Full-Stack Digital Engineering Studio",
    description:
      "Bespoke web applications, mobile platforms, and distributed cloud systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Programming Bridge - Full-Stack Digital Engineering Studio",
      },
    ],
  },
};

const jsonLdOrgAndWebsite = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.programmingbridge.org/#organization",
      "name": "Programming Bridge",
      "url": "https://www.programmingbridge.org",
      "logo": "https://www.programmingbridge.org/logo.png",
      "sameAs": [
        "https://github.com/Programming-Bridge",
        "https://www.linkedin.com/company/139694030/"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Support",
        "email": "official@programmingbridge.org",
        "telephone": "+92-315-5831940",
        "availableLanguage": ["English", "Urdu"]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.programmingbridge.org/#website",
      "url": "https://www.programmingbridge.org",
      "name": "Programming Bridge",
      "description": "Full-Stack Digital Engineering Studio building bespoke web applications, mobile platforms, and distributed cloud systems.",
      "publisher": {
        "@id": "https://www.programmingbridge.org/#organization"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdOrgAndWebsite),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var syncKey = 'pb_theme_auto_v1';
                  var theme = localStorage.getItem('theme');
                  if (localStorage.getItem(syncKey) !== 'active') {
                    localStorage.setItem('theme', 'system');
                    localStorage.setItem(syncKey, 'active');
                    theme = 'system';
                  }
                  var mql = window.matchMedia('(prefers-color-scheme: dark)');
                  var isDark = theme === 'dark' || ((!theme || theme === 'system') && mql.matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.className} min-h-screen bg-background text-foreground antialiased transition-colors duration-200`}
      >
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            {/* Skip to Main Content Link (L-03 Accessibility) */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999999] focus:inline-flex focus:items-center focus:gap-2 focus:rounded-xl focus:bg-brand focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white focus:shadow-2xl focus:ring-4 focus:ring-brand/30 focus:outline-none transition-all"
            >
              Skip to main content
            </a>

            <ThemeSync />
            <AppPreloader />
            {children}
            <Analytics />
            <TawkTo />
            <ChatBot />

            {/* Google Analytics GA4 */}
            {gaMeasurementId && (
              <>
                <Script
                  strategy="afterInteractive"
                  src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
                />
                <Script
                  id="google-analytics-init"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${gaMeasurementId}', {
                        page_path: window.location.pathname,
                      });
                    `,
                  }}
                />
              </>
            )}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}