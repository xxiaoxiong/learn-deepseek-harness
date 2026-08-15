import type { Metadata } from "next";
import { SOCIAL_IMAGE } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://learn-deepseek-harness.vercel.app"),
  applicationName: "Learn DeepSeek Harness",
  title: { default: "Learn DeepSeek Harness — 架构与源码深度课程", template: "%s · Learn DeepSeek Harness" },
  description: "面向开发者的 DeepSeek Harness 架构与源码深度课程：28 章、6 层、64 个源码锚点，通俗拆解 Agent runtime、Cordis 插件系统、工具管线与可恢复执行。",
  authors: [{ name: "xxiaoxiong", url: "https://github.com/xxiaoxiong" }],
  creator: "xxiaoxiong",
  publisher: "Learn DeepSeek Harness",
  category: "developer education",
  referrer: "origin-when-cross-origin",
  keywords: ["DeepSeek Harness", "deepseek-harness", "AI agent", "agent architecture", "agent runtime", "source code analysis", "Cordis", "plugin system", "TypeScript", "教程"],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Learn DeepSeek Harness",
    description: "Architecture-first · Mechanism-first · Source-anchored.",
    siteName: "Learn DeepSeek Harness",
    images: [{ url: SOCIAL_IMAGE, width: 1280, height: 640, alt: "Learn DeepSeek Harness architecture course" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Learn DeepSeek Harness", description: "Architecture-first · Mechanism-first · Source-anchored.", images: [SOCIAL_IMAGE] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
