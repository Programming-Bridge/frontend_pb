import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeSync } from "./components/ThemeSync";
import { StoreProvider } from "./StoreProvider";
import { AppPreloader } from "./components/AppPreloader";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.programmingbridge.org"),
  title: "Programming Bridge | Full-Stack Digital Engineering Studio",
  description:
    "We design, build, and scale production-grade web applications, native mobile apps, and cloud infrastructures for startups and enterprise teams.",
  keywords: [
    "Software Engineering",
    "Web Development",
    "Next.js",
    "React 19",
    "Node.js",
    "Mobile Apps",
    "Kotlin",
    "AI Engineering",
    "Cloud Architecture",
  ],
  authors: [{ name: "Programming Bridge" }],
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
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Programming Bridge Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Programming Bridge | Full-Stack Digital Engineering Studio",
    description:
      "Bespoke web applications, mobile platforms, and distributed cloud systems.",
    images: ["/logo.png"],
  },
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
            <ThemeSync />
            <AppPreloader />
            {children}
            <Analytics />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}