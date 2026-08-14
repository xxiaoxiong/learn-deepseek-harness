"use client";

import Link from "next/link";
import { useState } from "react";
import { Github, Languages, Menu, X } from "lucide-react";
import { Locale, nav } from "@/lib/content";

export function SiteHeader({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const other = locale === "zh" ? "en" : "zh";
  const t = nav[locale];
  const links = [
    [`/${locale}/architecture`, t.architecture],
    [`/${locale}/timeline`, t.timeline],
    [`/${locale}/compare`, t.compare],
    [`/${locale}/docs`, t.docs],
  ];

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href={`/${locale}`} aria-label="Learn DeepSeek Harness home" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span><b>LEARN</b><em>DEEPSEEK HARNESS</em></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <Link className="icon-link" href={`/${other}`} aria-label="Switch language"><Languages size={16} /><span>{locale === "zh" ? "EN" : "中文"}</span></Link>
          <a className="icon-link github-link" href="https://github.com/xxiaoxiong/learn-deepseek-harness" target="_blank" rel="noreferrer"><Github size={16} /><span>GitHub</span></a>
          <button className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && <nav className="mobile-nav" aria-label="Mobile navigation">{links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<a href="https://github.com/xxiaoxiong/learn-deepseek-harness" target="_blank" rel="noreferrer">GitHub</a></nav>}
    </header>
  );
}
