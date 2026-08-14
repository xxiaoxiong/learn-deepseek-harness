import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://learn-deepseek-harness.vercel.app"),
  title: { default: "Learn DeepSeek Harness — 从直觉到源码的 Agent 架构课", template: "%s · Learn DeepSeek Harness" },
  description: "28 章、6 层、逐机制深读 DeepSeek Harness：Cordis 插件树、Agent 生命周期、SessionEvent、工具守卫、压缩投影、子代理、工作流与扩展实战。",
  keywords: ["DeepSeek Harness", "AI Agent", "Agent architecture", "Cordis", "TypeScript", "open source", "教程"],
  openGraph: { title: "Learn DeepSeek Harness", description: "把复杂 Agent 底座读成一套可迁移的架构能力。", images: ["/deepseek-harness-hero-light.png"], type: "website" },
  twitter: { card: "summary_large_image", images: ["/deepseek-harness-hero-light.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
