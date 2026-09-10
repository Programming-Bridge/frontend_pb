import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Programming Bridge | Full-Stack Digital Engineering Studio",
    short_name: "Programming Bridge",
    description:
      "We design, build, and scale production-grade web applications, native mobile apps, and cloud infrastructures for startups and enterprise teams.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0F12",
    theme_color: "#008A4B",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
