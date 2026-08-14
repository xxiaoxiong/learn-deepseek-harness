import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Lightbulb, Quote, Route, Terminal } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { chapters, layerFor, nav, pick, validLocale } from "@/lib/content";

export function generateStaticParams() {
  return ["zh", "en"].flatMap((locale) => chapters.map((chapter) => ({ locale, slug: chapter.slug })));
}

export default async function ChapterPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params;
  const locale = validLocale(raw);
  const index = chapters.findIndex((chapter) => chapter.slug === slug);
  if (index < 0) notFound();
  const chapter = chapters[index];
  const layer = layerFor(chapter.layer);
  const t = nav[locale];
  return (
    <div className="page-shell">
      <SiteHeader locale={locale} />
      <main className="chapter-page section-pad">
        <aside className="chapter-rail">
          <Link href={`/${locale}`}><ArrowLeft size={14} />{locale === "zh" ? "全部课程" : "All chapters"}</Link>
          <div className="rail-progress"><span style={{ height: `${((index + 1) / chapters.length) * 100}%` }} /></div>
          <small>{String(index + 1).padStart(2, "0")} / {chapters.length}</small>
        </aside>
        <article className="chapter-article">
          <header className={`chapter-hero tone-${layer.color}`}>
            <div className="chapter-label">LAYER {layer.no} · {pick(layer.title, locale)}</div>
            <h1>{pick(chapter.title, locale)}</h1>
            <p>{pick(chapter.subtitle, locale)}</p>
            <div className="addition"><Terminal size={15} /><code>{pick(chapter.addition, locale)}</code></div>
          </header>
          <section className="lesson-block analogy-block">
            <div className="lesson-icon"><Quote size={19} /></div>
            <div><span className="lesson-kicker">{t.analogy}</span><p>{pick(chapter.analogy, locale)}</p></div>
          </section>
          <section className="lesson-block mechanism-block">
            <div className="lesson-icon"><Route size={19} /></div>
            <div><span className="lesson-kicker">{t.mechanism}</span><p>{pick(chapter.mechanism, locale)}</p></div>
          </section>
          {chapter.code && <section className="code-window"><div className="code-title"><span>● ● ●</span><code>{chapter.slug}.ts</code></div><pre><code>{chapter.code}</code></pre></section>}
          <section className="takeaways">
            <div className="takeaway-title"><Lightbulb size={20} /><h2>{t.takeaway}</h2></div>
            <ol>{pick(chapter.takeaways, locale).map((item, i) => <li key={item}><span>{i + 1}</span>{item}</li>)}</ol>
          </section>
          <a className="source-anchor" href={`https://github.com/deepseek-ai/deepseek-harness/blob/master/${chapter.source}`} target="_blank" rel="noreferrer"><div><small>{t.source}</small><code>{chapter.source}</code></div><ExternalLink size={17} /></a>
          <nav className="chapter-nav">
            {index > 0 ? <Link href={`/${locale}/chapter/${chapters[index - 1].slug}`}><ArrowLeft size={16} /><span><small>{t.prev}</small>{pick(chapters[index - 1].title, locale)}</span></Link> : <span />}
            {index < chapters.length - 1 ? <Link className="next" href={`/${locale}/chapter/${chapters[index + 1].slug}`}><span><small>{t.next}</small>{pick(chapters[index + 1].title, locale)}</span><ArrowRight size={16} /></Link> : <Link className="next" href={`/${locale}/architecture`}><span><small>{t.next}</small>{t.architecture}</span><ArrowRight size={16} /></Link>}
          </nav>
        </article>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
