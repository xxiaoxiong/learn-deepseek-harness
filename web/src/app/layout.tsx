import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://learn-deepseek-harness.vercel.app"),
  title: {
    default: "Learn DeepSeek Harness — 把 AI Agent 底座讲明白",
    template: "%s · Learn DeepSeek Harness",
  },
  description: "面向所有人的 DeepSeek Harness 深度解读：用 18 章、5 层课程理解 Cordis、插件、Agent Loop、事件日志与工具管线。",
  openGraph: {
    title: "Learn DeepSeek Harness",
    description: "Everything is a Plugin——从零读懂可组合的 AI Agent 底座。",
    images: ["/deepseek-harness-hero.png"],
  },
  twitter: { card: "summary_large_image", images: ["/deepseek-harness-hero.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

