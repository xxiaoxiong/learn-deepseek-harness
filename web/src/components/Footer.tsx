import { Locale } from "@/lib/content";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="footer">
      <div>
        <strong>Learn DeepSeek Harness</strong>
        <p>{locale === "zh" ? "独立教学项目 · 以通俗语言解释真实架构" : "Independent teaching companion · Real architecture in plain language"}</p>
      </div>
      <p>{locale === "zh" ? "非 DeepSeek 官方项目 · 内容基于公开源码" : "Unofficial · Based on public source code"}</p>
    </footer>
  );
}

