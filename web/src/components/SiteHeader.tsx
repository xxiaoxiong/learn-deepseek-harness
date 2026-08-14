import Link from "next/link";
import { Github, Languages } from "lucide-react";
import { Locale, nav } from "@/lib/content";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = nav[locale];
  const other = locale === "zh" ? "en" : "zh";
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href={`/${locale}`} aria-label="Learn DeepSeek Harness home">
          <span className="brand-mark"><i /><i /><i /></span>
          <span>Learn <b>DeepSeek Harness</b></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href={`/${locale}/architecture`}>{t.architecture}</Link>
          <Link href={`/${locale}/compare`}>{t.compare}</Link>
          <Link href={`/${locale}/timeline`}>{t.timeline}</Link>
          <Link href={`/${locale}/docs`}>{t.docs}</Link>
        </nav>
        <div className="header-actions">
          <Link className="icon-link" href={`/${other}`} aria-label="Switch language"><Languages size={16} /><span>{locale === "zh" ? "EN" : "中文"}</span></Link>
          <a className="icon-link github-link" href="https://github.com/xxiaoxiong/learn-deepseek-harness" target="_blank" rel="noreferrer"><Github size={16} /><span>{t.github}</span></a>
        </div>
      </div>
    </header>
  );
}

