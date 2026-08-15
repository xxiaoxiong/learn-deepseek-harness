import type { Metadata } from "next";
import type { Locale } from "@/lib/content";

export const SITE_URL = "https://learn-deepseek-harness.vercel.app";
export const SOCIAL_IMAGE = "/readme-hero-v2.png";

const sharedKeywords = [
  "DeepSeek Harness",
  "deepseek-harness",
  "AI agent",
  "agent architecture",
  "agent runtime",
  "source code analysis",
  "Cordis",
  "plugin system",
  "tool execution pipeline",
  "SessionEvent",
  "TypeScript",
];

const localeLabel = {
  zh: "DeepSeek Harness 架构与源码课程",
  en: "DeepSeek Harness architecture and source course",
} satisfies Record<Locale, string>;

export function localizedMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  keywords: string[] = [],
): Metadata {
  const suffix = path ? `/${path.replace(/^\//, "")}` : "";
  const canonical = `/${locale}${suffix}`;
  const zhUrl = `/zh${suffix}`;
  const enUrl = `/en${suffix}`;

  return {
    title,
    description,
    keywords: [...sharedKeywords, ...keywords],
    alternates: {
      canonical,
      languages: {
        "zh-CN": zhUrl,
        en: enUrl,
        "x-default": zhUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Learn DeepSeek Harness",
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? ["en_US"] : ["zh_CN"],
      images: [
        {
          url: SOCIAL_IMAGE,
          width: 1280,
          height: 640,
          alt: localeLabel[locale],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SOCIAL_IMAGE],
    },
  };
}
