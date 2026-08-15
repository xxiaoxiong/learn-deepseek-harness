import type { MetadataRoute } from "next";
import { chapters } from "@/lib/content";
import { SITE_URL, SOCIAL_IMAGE } from "@/lib/seo";

const locales = ["zh", "en"] as const;
const staticPaths = ["", "/architecture", "/compare", "/timeline", "/docs"];
const lastModified = new Date("2026-08-15T00:00:00Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...staticPaths, ...chapters.map((chapter) => `/chapter/${chapter.slug}`)];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : path.startsWith("/chapter/") ? 0.8 : 0.9,
      alternates: {
        languages: {
          "zh-CN": `${SITE_URL}/zh${path}`,
          en: `${SITE_URL}/en${path}`,
        },
      },
      ...(path === "" ? { images: [`${SITE_URL}${SOCIAL_IMAGE}`] } : {}),
    })),
  );
}
