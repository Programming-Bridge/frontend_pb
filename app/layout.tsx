import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { StoreProvider } from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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
  openGraph: {
    title: "Programming Bridge | Full-Stack Digital Engineering Studio",
    description:
      "Bespoke web applications, mobile platforms, and distributed cloud systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.className} min-h-screen bg-background text-foreground antialiased transition-colors duration-200`}
      >
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}
          >
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}