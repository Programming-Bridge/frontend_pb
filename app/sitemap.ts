import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.programmingbridge.org";
  const lastModified = new Date();

  const routes = [
    "",
    "/services",
    "/portfolio",
    "/projects",
    "/about",
    "/about/company",
    "/about/team",
    "/about/careers",
    "/contact",
    "/services/web-development",
    "/services/mobile-app-development",
    "/services/android-development",
    "/services/api-cloud",
    "/services/wordpress-cms",
    "/services/ai-automation",
    "/services/ui-ux-design",
    "/services/custom-software",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/services") ? 0.9 : 0.8,
  }));
}
