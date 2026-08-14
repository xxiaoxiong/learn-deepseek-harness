import Link from "next/link";
import { Github, Heart } from "lucide-react";
import { Locale, upstreamSnapshot } from "@/lib/content";

export function Footer({ locale }: { locale: Locale }) {
  return <footer className="footer"><div><Link className="footer-brand" href={`/${locale}`}><span className="brand-mark"><i /><i /><i /></span>Learn DeepSeek Harness</Link><p>{locale === "zh" ? "独立教学项目。解释力来自源码，判断边界以官方仓库为准。" : "An independent learning project. Explanations derive from source; upstream remains authoritative."}</p></div><div className="footer-meta"><span><Heart size={13} /> built for source readers</span><code>upstream@{upstreamSnapshot.shortCommit}</code><a href="https://github.com/xxiaoxiong/learn-deepseek-harness" target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a></div></footer>;
}
