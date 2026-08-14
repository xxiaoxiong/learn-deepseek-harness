import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { chapters, layers, pick, validLocale } from "@/lib/content";

const minutes: Record<string, number> = { mental: 20, composition: 30, spine: 45, capability: 45, extend: 40 };
export default async function TimelinePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params; const locale = validLocale(raw);
  return <div className="page-shell"><SiteHeader locale={locale} /><main className="timeline-page section-pad"><section className="subpage-title"><div className="section-kicker">ZERO TO SOURCE READER</div><h1>{locale === "zh" ? "约 3 小时，建立一套可迁移的 Agent 架构观" : "Build a transferable agent architecture model in about 3 hours"}</h1><p>{locale === "zh" ? "可以一次读完，也可以按五个学习会话推进。每层都有明确的“到这里你已经能做什么”。" : "Read it in one sitting or across five sessions. Every layer ends with a concrete capability."}</p></section><div className="timeline">{layers.map((layer, li) => { const items = chapters.filter(c => c.layer === layer.id); return <section className={`timeline-stop tone-${layer.color}`} key={layer.id}><div className="timeline-marker"><span>{layer.no}</span></div><div className="timeline-content"><div className="timeline-head"><div><small>SESSION {li + 1}</small><h2>{pick(layer.title, locale)}</h2><p>{pick(layer.desc, locale)}</p></div><span><Clock3 size={14} />≈ {minutes[layer.id]} min</span></div><div className="timeline-chapters">{items.map(c => <Link key={c.slug} href={`/${locale}/chapter/${c.slug}`}><code>{c.slug.split("-")[0]}</code><span>{pick(c.title, locale)}</span><ArrowRight size={14} /></Link>)}</div><div className="checkpoint"><b>{locale === "zh" ? "检查点" : "Checkpoint"}</b>{locale === "zh" ? ["能向非技术朋友解释 Harness", "能读懂 Cordis 插件与配置树", "能沿事件追踪一次完整 Turn", "能区分安全、上下文与委派边界", "能写工具与策略插件并组成 Bundle"][li] : ["Explain a harness to a non-technical friend", "Read Cordis plugins and config trees", "Trace a complete turn through events", "Separate safety, context, and delegation boundaries", "Build tool and policy plugins into a bundle"][li]}</div></div></section>;})}</div></main><Footer locale={locale} /></div>;
}

