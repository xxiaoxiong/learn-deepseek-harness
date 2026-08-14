import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, GitFork, Layers3, RadioTower, ShieldCheck, Sparkles } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { SystemMap } from "@/components/SystemMap";
import { chapters, layers, nav, pick, upstreamSnapshot, validLocale } from "@/lib/content";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = validLocale(raw);
  const t = nav[locale];
  const promises = locale === "zh" ? [
    ["不是源码翻译", "先回答“为什么这样设计”，再解释事件顺序、边界和代价。"],
    ["不是过时快照", `逐条校准官方 ${upstreamSnapshot.shortCommit}：${upstreamSnapshot.packageFamilies} 个顶层包族、${upstreamSnapshot.docs} 份文档。`],
    ["不是读完就忘", "每章都有可点击机制图、不变量、反例、自测与下一章桥接。"],
  ] : [
    ["Not a source paraphrase", "We explain why the design exists before tracing events, boundaries, and trade-offs."],
    ["Not a floating snapshot", `Every claim is calibrated to upstream ${upstreamSnapshot.shortCommit}: ${upstreamSnapshot.packageFamilies} package families and ${upstreamSnapshot.docs} docs.`],
    ["Not passive reading", "Every chapter has an interactive mechanism, invariants, failure modes, a check, and an explicit bridge."],
  ];

  return <div className="page-shell">
    <SiteHeader locale={locale} />
    <main>
      <section className="hero section-pad">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={14} />{chapters.length} {locale === "zh" ? "章" : "chapters"} · {layers.length} {locale === "zh" ? "层" : "layers"} · upstream@{upstreamSnapshot.shortCommit}</div>
          <h1>{locale === "zh" ? <>把 Agent Harness<br /><span>读成一套可迁移的架构能力</span></> : <>Read an agent harness<br /><span>as a transferable architecture skill</span></>}</h1>
          <p>{locale === "zh" ? "从“为什么不只是一个 while 循环”开始，沿 Cordis 插件树、Turn / Step、事件事实、工具守卫、压缩投影、子代理与工作流，一直走到你能安全扩展自己的 Agent 产品。" : "Start with why this is more than a while loop, then travel through Cordis composition, turns and steps, event truth, guarded tools, compaction, projections, subagents, workflows, and finally your own safe extensions."}</p>
          <div className="hero-actions"><Link className="button primary" href={`/${locale}/chapter/h01-harness`}>{t.start}<ArrowRight size={17} /></Link><Link className="button secondary" href={`/${locale}/architecture`}><GitFork size={17} />{t.architecture}</Link></div>
          <div className="hero-proof"><span><BookOpenCheck />{locale === "zh" ? "通俗直觉" : "Plain intuition"}</span><span><RadioTower />{locale === "zh" ? "真实事件流" : "Real event flow"}</span><span><ShieldCheck />{locale === "zh" ? "源码可复核" : "Auditable sources"}</span></div>
        </div>
        <div className="hero-art"><div className="hero-art-frame"><Image src="/deepseek-harness-hero-light.png" alt={locale === "zh" ? "模块化 Agent Harness 的六个能力岛与中央推理核心" : "Six modular capability islands connected to a central reasoning core"} width={1536} height={1024} priority /></div><div className="snapshot-card"><span>{locale === "zh" ? "研究基线" : "Research baseline"}</span><b>deepseek-harness@{upstreamSnapshot.shortCommit}</b><small>{upstreamSnapshot.date} · developer preview</small></div></div>
      </section>

      <section className="promise-strip section-pad">{promises.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h2>{title}</h2><p>{text}</p></div></article>)}</section>

      <section className="atlas-preview section-pad"><div className="section-heading"><div><div className="section-kicker">ARCHITECTURE ATLAS</div><h2>{locale === "zh" ? "先看系统，再看文件" : "See the system before the files"}</h2></div><p>{locale === "zh" ? "49 个包族并不等于 49 个孤岛。用六个平面把复杂度重新装进可推理的抽屉。" : "Forty-nine package families are not forty-nine islands. Six planes put complexity into understandable drawers."}</p></div><SystemMap locale={locale} /></section>

      <section className="course section-pad" id="course"><div className="section-heading"><div><div className="section-kicker">GUIDED CURRICULUM</div><h2>{locale === "zh" ? "每章只跨一个台阶，但从不浅尝辄止" : "One conceptual step per chapter, without staying shallow"}</h2></div><Link className="text-link" href={`/${locale}/timeline`}>{locale === "zh" ? "查看完整学习路线" : "View the learning route"}<ArrowRight /></Link></div>
        <div className="layer-stack">{layers.map((layer) => { const items = chapters.filter(chapter => chapter.layer === layer.id); return <section className={`layer-block tone-${layer.color}`} key={layer.id}><div className="layer-intro"><span>{layer.no}</span><div><small>{pick(layer.outcome, locale)}</small><h3>{pick(layer.title, locale)}</h3><p>{pick(layer.desc, locale)}</p></div><b>{items.length} {t.chapters}</b></div><div className="chapter-grid">{items.map((chapter, index) => <Link className="chapter-card" href={`/${locale}/chapter/${chapter.slug}`} key={chapter.slug}><div className="card-meta"><span>{chapter.slug.split("-")[0].toUpperCase()}</span><small>{chapter.minutes} MIN · {chapter.sourceType.toUpperCase()}</small></div><h4>{pick(chapter.title, locale)}</h4><p>{pick(chapter.question, locale)}</p><div className="card-footer"><code>{pick(chapter.addition, locale)}</code><ArrowRight /></div></Link>)}</div></section>; })}</div>
      </section>

      <section className="closing-cta section-pad"><div><Layers3 /><span>FROM READER TO BUILDER</span></div><h2>{locale === "zh" ? "看懂一次运行，解释每个边界，最后做出自己的组合。" : "Trace one run, explain every boundary, then build your own composition."}</h2><p>{locale === "zh" ? "第一章只需要 12 分钟：先把 Harness 和 Agent Loop 的差别讲清楚。" : "Chapter one takes twelve minutes and starts by separating a harness from an agent loop."}</p><Link className="button primary" href={`/${locale}/chapter/h01-harness`}>{t.start}<ArrowRight /></Link></section>
    </main>
    <Footer locale={locale} />
  </div>;
}
