import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, ArrowRight, BookOpen, Check, Clock3, Code2, ExternalLink, GitBranch, Lightbulb, Quote, Route, ShieldCheck, Terminal } from "lucide-react";
import { Footer } from "@/components/Footer";
import { KnowledgeCheck } from "@/components/KnowledgeCheck";
import { MechanismFlow } from "@/components/MechanismFlow";
import { SiteHeader } from "@/components/SiteHeader";
import { chapters, layerFor, nav, pick, upstreamSnapshot, validLocale } from "@/lib/content";

export function generateStaticParams() { return chapters.map(chapter => ({ slug: chapter.slug })); }

export default async function ChapterPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params;
  const locale = validLocale(raw);
  const chapter = chapters.find(item => item.slug === slug);
  if (!chapter) notFound();
  const index = chapters.indexOf(chapter);
  const layer = layerFor(chapter.layer);
  const t = nav[locale];
  const previous = chapters[index - 1];
  const next = chapters[index + 1];

  return <div className="page-shell"><SiteHeader locale={locale} /><main className="chapter-page section-pad">
    <aside className="chapter-rail"><span>{String(index + 1).padStart(2, "0")}</span><div className="rail-progress"><i style={{ height: `${((index + 1) / chapters.length) * 100}%` }} /></div><small>{String(chapters.length).padStart(2, "0")}</small></aside>
    <article className="chapter-article">
      <nav className="chapter-breadcrumb"><Link href={`/${locale}`}>{locale === "zh" ? "课程" : "Course"}</Link><span>/</span><Link href={`/${locale}/timeline`}>{pick(layer.title, locale)}</Link><span>/</span><b>{chapter.slug.split("-")[0].toUpperCase()}</b></nav>
      <header className={`chapter-hero tone-${layer.color}`}><div className="chapter-label">LAYER {layer.no} · {pick(layer.title, locale)}</div><h1>{pick(chapter.title, locale)}</h1><p>{pick(chapter.subtitle, locale)}</p><div className="chapter-meta"><span><Clock3 />{chapter.minutes} min</span><span><BookOpen />{chapter.sources.length} {locale === "zh" ? "处源码锚点" : "source anchors"}</span><span><GitBranch />upstream@{upstreamSnapshot.shortCommit}</span></div><div className="addition"><Terminal size={15} /><code>{pick(chapter.addition, locale)}</code></div></header>

      <section className="chapter-question"><span>{locale === "zh" ? "本章要解决的问题" : "The question this chapter resolves"}</span><h2>{pick(chapter.question, locale)}</h2></section>

      <section className="lesson-block analogy-block"><div className="lesson-icon"><Quote /></div><div><span className="lesson-kicker">{t.analogy}</span><p>{pick(chapter.analogy, locale)}</p></div></section>

      <section className="chapter-section"><div className="chapter-section-title"><Route /><div><span>MECHANISM</span><h2>{t.mechanism}</h2></div></div><div className="mechanism-copy">{pick(chapter.mechanism, locale).map((paragraph, pIndex) => <p key={pIndex}>{paragraph}</p>)}</div><MechanismFlow steps={chapter.flow} locale={locale} /></section>

      <section className="reasoning-grid"><div className="invariant-panel"><div className="panel-title"><ShieldCheck /><div><span>INVARIANTS</span><h2>{locale === "zh" ? "无论怎么扩展，都不能破坏" : "What extensions must preserve"}</h2></div></div><ul>{pick(chapter.invariants, locale).map(item => <li key={item}><Check />{item}</li>)}</ul></div><div className="pitfall-panel"><div className="panel-title"><AlertTriangle /><div><span>FAILURE MODES</span><h2>{locale === "zh" ? "最容易踩中的坑" : "The tempting wrong turns"}</h2></div></div><ul>{pick(chapter.pitfalls, locale).map(item => <li key={item}><span>×</span>{item}</li>)}</ul></div></section>

      {chapter.code && <section className="code-window"><div className="code-title"><span>● ● ●</span><code>{chapter.slug}.ts</code><i><Code2 /> TypeScript</i></div><pre><code>{chapter.code}</code></pre></section>}

      <section className="source-section"><div className="chapter-section-title"><GitBranch /><div><span>VERIFY IN SOURCE</span><h2>{locale === "zh" ? "不要相信结论，去源码里复核" : "Do not trust the conclusion—verify it"}</h2></div></div><p>{locale === "zh" ? `以下链接均对应官方 deepseek-harness@${upstreamSnapshot.shortCommit} 的概念位置；master 可能继续演进。` : `These anchors map to concepts at official deepseek-harness@${upstreamSnapshot.shortCommit}; master may continue to evolve.`}</p><div className="source-grid">{chapter.sources.map((item, sourceIndex) => <a key={`${item.path}-${item.symbol}`} className="source-anchor" href={`https://github.com/deepseek-ai/deepseek-harness/blob/master/${item.path}`} target="_blank" rel="noreferrer"><span>0{sourceIndex + 1}</span><div><small>{item.symbol}</small><code>{item.path}</code><p>{pick(item.note, locale)}</p></div><ExternalLink /></a>)}</div></section>

      <KnowledgeCheck question={pick(chapter.checkpoint.question, locale)} answer={pick(chapter.checkpoint.answer, locale)} locale={locale} />

      <section className="chapter-bridge"><Lightbulb /><div><small>{locale === "zh" ? "为什么下一章紧接在这里" : "Why the next chapter follows"}</small><p>{pick(chapter.bridge, locale)}</p></div></section>

      <nav className="chapter-nav">{previous ? <Link href={`/${locale}/chapter/${previous.slug}`}><ArrowLeft /><span><small>{t.prev}</small><b>{pick(previous.title, locale)}</b></span></Link> : <Link href={`/${locale}`}><ArrowLeft /><span><small>{t.prev}</small><b>{locale === "zh" ? "课程首页" : "Course home"}</b></span></Link>}{next ? <Link className="next" href={`/${locale}/chapter/${next.slug}`}><span><small>{t.next}</small><b>{pick(next.title, locale)}</b></span><ArrowRight /></Link> : <Link className="next" href={`/${locale}/architecture`}><span><small>{t.next}</small><b>{t.architecture}</b></span><ArrowRight /></Link>}</nav>
    </article>
  </main><Footer locale={locale} /></div>;
}
