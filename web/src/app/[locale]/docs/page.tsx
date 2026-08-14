import Link from "next/link";
import { ArrowRight, BookMarked, ExternalLink, FileCode2, GitCommitHorizontal } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { chapters, layers, pick, upstreamSnapshot, validLocale } from "@/lib/content";

const terms = [
  ["Harness", "把模型变成可运行产品的上下文、状态、工具、控制和交互底座。", "The context, state, tools, control, and interaction substrate that turns a model into an operating product."],
  ["Context", "Cordis 的作用域容器：服务、事件、配置和可逆副作用都挂在这里。", "Cordis's scoped container for services, events, config, and reversible effects."],
  ["Effect", "插件创建的资源及其回收函数；安装和卸载因此对称。", "A plugin-owned resource plus its disposer, making setup and teardown symmetric."],
  ["Fiber", "一次带父子关系、取消与回收语义的异步工作单元。", "An async work unit with parentage, cancellation, and cleanup semantics."],
  ["Profile", "一个可命名的产品组合入口，选择 Bundle 并承载用户 Patch。", "A named product composition that selects bundles and carries user patches."],
  ["EpochHeader", "某一步模型请求实际看到的模型、工具、提示词与限制的完整快照。", "The complete snapshot of model, tools, prompt, and limits seen by one model request."],
  ["Turn", "认领一条输入后必须结清的工作单元，可能包含多个 Step。", "A settlement unit that claims one input and may contain multiple steps."],
  ["Step", "一次模型请求及其流式响应；工具循环会开启新的 Step。", "One model request and stream; a tool loop starts another step."],
  ["SessionEvent", "仅追加、可回放、模型可见的会话事实，不等同于 UI 展示顺序。", "Append-only, replayable, model-visible session truth—not the same as UI display order."],
  ["Surface", "从事件日志计算出的模型上下文视图；压缩会改 Surface，不改历史事实。", "The model-context view projected from the log; compaction changes the surface, not history."],
  ["Capability seam", "服务定义、Provider、Consumer 和策略消费者共同构成的替换边界。", "A replacement boundary formed by a service definition, providers, consumers, and policy consumers."],
  ["Tool debt", "模型发出工具调用后必须返回匹配结果，Turn 才能合法结束。", "The obligation to return a matching result after a model emits a tool call."],
  ["Projection", "从事件增量计算的读模型，使用水位避免重复或错序消费。", "An event-derived read model using watermarks to avoid duplicate or out-of-order consumption."],
  ["Spill", "把超大内容移出上下文，仅留下不透明定位符，按需再读回。", "Moving oversized content out of context and leaving an opaque locator for later retrieval."],
  ["Provider", "能力接口的一种实现，拥有自己的配置、SDK 与资源生命周期。", "One implementation of a capability contract, owning its config, SDK, and resource lifecycle."],
];

export default async function DocsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params; const locale = validLocale(raw);
  return <div className="page-shell"><SiteHeader locale={locale} /><main className="docs-page section-pad"><section className="subpage-title"><div className="section-kicker">GLOSSARY + SOURCE INDEX</div><h1>{locale === "zh" ? "从人话词典，直达官方源码" : "From plain-language glossary to official source"}</h1><p>{locale === "zh" ? "术语负责建立共同语言，源码锚点负责约束解释边界。所有解读固定到一个可复核快照。" : "Terms create a shared language; source anchors constrain interpretation. Every explanation is pinned to an auditable snapshot."}</p><div className="source-snapshot"><GitCommitHorizontal /><div><small>UPSTREAM RESEARCH SNAPSHOT</small><code>{upstreamSnapshot.commit}</code><span>{upstreamSnapshot.date} · {upstreamSnapshot.docs} docs · {upstreamSnapshot.packageFiles} package files</span></div></div></section>
    <section className="glossary-section"><div className="section-heading"><div><div className="section-kicker">PLAIN-LANGUAGE GLOSSARY</div><h2>{locale === "zh" ? "15 个词，消除阅读摩擦" : "Fifteen terms that remove reading friction"}</h2></div></div><div className="glossary-grid">{terms.map(([name, zh, en], index) => <article key={name}><span>{String(index + 1).padStart(2, "0")}</span><BookMarked /><h3>{name}</h3><p>{locale === "zh" ? zh : en}</p></article>)}</div></section>
    <section className="source-catalog"><div className="section-heading"><div><div className="section-kicker">CURATED SOURCE MAP</div><h2>{locale === "zh" ? "按学习层级组织，而不是把目录倒给你" : "Organized by learning layer, not dumped as a tree"}</h2></div><p>{locale === "zh" ? "每个文件只在它最能回答的问题旁出现。点击章节，先看解释；点击文件，直接核验。" : "Each file appears beside the question it answers best. Read the chapter, then verify the source."}</p></div><div className="source-layer-list">{layers.map(layer => { const layerChapters = chapters.filter(chapter => chapter.layer === layer.id); return <section key={layer.id}><header><span>{layer.no}</span><div><h3>{pick(layer.title, locale)}</h3><p>{pick(layer.outcome, locale)}</p></div></header><div>{layerChapters.map(chapter => <article key={chapter.slug}><Link href={`/${locale}/chapter/${chapter.slug}`}><b>{chapter.slug.split("-")[0].toUpperCase()}</b><span>{pick(chapter.title, locale)}</span><ArrowRight /></Link><div>{chapter.sources.slice(0, 2).map(source => <a key={`${chapter.slug}-${source.path}`} href={`https://github.com/deepseek-ai/deepseek-harness/blob/master/${source.path}`} target="_blank" rel="noreferrer"><FileCode2 /><code>{source.path}</code><ExternalLink /></a>)}</div></article>)}</div></section>; })}</div></section>
    <a className="official-doc-card" href="https://github.com/deepseek-ai/deepseek-harness/tree/master/docs" target="_blank" rel="noreferrer"><div><small>PRIMARY SOURCE</small><h2>{locale === "zh" ? "教学项目搭桥，官方仓库定案" : "This project builds the bridge; upstream settles the facts"}</h2><p>{locale === "zh" ? "DeepSeek Harness 仍处于 developer preview。遇到接口、事件名和默认配置差异，请以当前官方提交为准。" : "DeepSeek Harness remains in developer preview. For contract, event-name, or default changes, use the current official commit."}</p></div><ExternalLink /></a>
  </main><Footer locale={locale} /></div>;
}
