import Link from "next/link";
import { ArrowRight, BookOpen, GitFork, Sparkles } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { SystemMap } from "@/components/SystemMap";
import { chapters, layers, layerFor, nav, pick, validLocale } from "@/lib/content";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = validLocale(raw);
  const t = nav[locale];
  return (
    <div className="page-shell">
      <SiteHeader locale={locale} />
      <main>
        <section className="hero section-pad">
          <div className="hero-grid" />
          <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={14} />{locale === "zh" ? "18 章 · 5 层 · 真实源码锚点" : "18 chapters · 5 layers · real source anchors"}</div>
            <h1>{locale === "zh" ? <>把 AI Agent 的<br /><em>底座</em>，讲明白。</> : <>Understand the <em>harness</em><br />beneath an AI agent.</>}</h1>
            <p>{locale === "zh" ? "DeepSeek Harness 把模型、工具、状态、安全与界面都变成可组合插件。这里不用术语堆砌，而是用类比、动画和源码路径带你一步步看懂。" : "DeepSeek Harness turns models, tools, state, safety, and UI into composable plugins. Learn it through analogies, interactive flows, and real source paths—not a wall of jargon."}</p>
            <div className="hero-actions">
              <Link className="button primary" href={`/${locale}/chapter/h01-harness`}>{t.start}<ArrowRight size={17} /></Link>
              <Link className="button secondary" href={`/${locale}/architecture`}><GitFork size={17} />{t.architecture}</Link>
            </div>
            <div className="hero-proof">
              <span><b>12,000+</b>{locale === "zh" ? "官方提交" : "upstream commits"}</span>
              <span><b>18</b>{t.chapters}</span>
              <span><b>2</b>{locale === "zh" ? "种语言" : "languages"}</span>
              <span><b>0→1</b>{locale === "zh" ? "学习路径" : "learning path"}</span>
            </div>
          </div>
          <div className="hero-visual"><SystemMap locale={locale} /></div>
        </section>

        <section className="manifesto section-pad">
          <div className="section-kicker">01 / MENTAL MODEL</div>
          <div className="manifesto-grid">
            <h2>{locale === "zh" ? <>模型是大脑。<br />Harness 是让它可靠工作的<em>身体与制度</em>。</> : <>The model is a brain.<br />The harness is its <em>body and operating system</em>.</>}</h2>
            <div><p>{locale === "zh" ? "只会调用模型 API，不等于拥有一个 Agent。真正的产品还要处理工具执行、失败恢复、权限、长期状态、界面与可观测性。" : "Calling a model API does not give you an agent. A product must also handle tools, recovery, permissions, durable state, surfaces, and observability."}</p><Link href={`/${locale}/compare`}>{locale === "zh" ? "看看聊天机器人与 Harness 的差别" : "Compare a chatbot with a harness"}<ArrowRight size={15} /></Link></div>
          </div>
        </section>

        <section className="course section-pad" id="course">
          <div className="section-heading"><div><div className="section-kicker">02 / CURRICULUM</div><h2>{locale === "zh" ? "一条不会把你丢在半路的学习曲线" : "A learning curve that will not abandon you"}</h2></div><p>{locale === "zh" ? "每章只新增一个核心概念。先直觉，再机制，最后回到源码。" : "One new idea per chapter: intuition first, mechanism second, source last."}</p></div>
          <div className="layer-stack">
            {layers.map((layer) => {
              const items = chapters.filter((chapter) => chapter.layer === layer.id);
              return (
                <section className={`layer-block tone-${layer.color}`} key={layer.id}>
                  <div className="layer-intro"><span>{layer.no}</span><div><h3>{pick(layer.title, locale)}</h3><p>{pick(layer.desc, locale)}</p></div><small>{items.length} {t.chapters}</small></div>
                  <div className="chapter-grid">
                    {items.map((chapter, index) => (
                      <Link className="chapter-card" href={`/${locale}/chapter/${chapter.slug}`} key={chapter.slug}>
                        <div className="card-meta"><span>{chapter.slug.split("-")[0].toUpperCase()}</span><small>{chapter.sourceType}</small></div>
                        <h4>{pick(chapter.title, locale)}</h4>
                        <p>{pick(chapter.subtitle, locale)}</p>
                        <code>+ {pick(chapter.addition, locale)}</code>
                        <ArrowRight className="card-arrow" size={17} />
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>

        <section className="closing-cta section-pad">
          <BookOpen size={28} />
          <h2>{locale === "zh" ? "不需要先成为框架专家。" : "You do not need to be a framework expert."}</h2>
          <p>{locale === "zh" ? "从第一章开始，20 分钟建立全局直觉。" : "Start at chapter one and build the big picture in 20 minutes."}</p>
          <Link className="button primary" href={`/${locale}/chapter/h01-harness`}>{t.start}<ArrowRight size={17} /></Link>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
