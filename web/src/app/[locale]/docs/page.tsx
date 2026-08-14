import { BookMarked, ExternalLink } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { validLocale } from "@/lib/content";

const terms = [
  ["Harness", "围绕模型提供工具、上下文、状态与控制的运行底座。", "The runtime around a model that provides tools, context, state, and control."],
  ["Cordis", "DeepSeek Harness 使用的插件组合框架，管理服务、事件、作用域与 effect。", "The composition framework managing services, events, scopes, and effects."],
  ["Context (ctx)", "插件发现服务、注册能力与监听事件的共享协作面。", "The collaboration surface for discovering services, registering capabilities, and listening to events."],
  ["Effect", "归属于插件生命周期、卸载时可自动撤销的副作用。", "A side effect owned by a plugin lifecycle and automatically unwound on disposal."],
  ["Profile", "一套具名的 Harness 产品组合，声明要叠加哪些 Bundle。", "A named Harness product composition listing its bundles."],
  ["Bundle", "可分发的 Cordis 配置行与插件代码集合。", "A distributable set of Cordis configuration rows and plugin code."],
  ["Patch", "按稳定 ID 替换或插入配置行的覆盖层。", "An overlay that replaces or inserts config rows by stable ID."],
  ["SessionEvent", "追加到会话日志的持久事实，是 UI、回放和上下文的共同真源。", "A durable fact appended to the session log—the shared truth for UI, replay, and context."],
  ["Turn", "从认领输入开始，到系统不再欠任何工作结束的任务边界。", "Work from claiming input until the system owes nothing further."],
  ["Step", "Turn 内的一次模型请求，以及这次响应触发的工具调用。", "One model request inside a turn plus tool calls triggered by its response."],
  ["Waterfall", "监听器通过 next() 委托下游，并可改写权威结果的事件模式。", "An event mode where listeners delegate with next() and may transform the authoritative result."],
  ["Capability seam", "由服务定义、提供者与消费者构成的可替换能力边界。", "A replaceable boundary formed by a service definition, provider, and consumer."],
];
export default async function DocsPage({ params }: { params: Promise<{ locale: string }> }) { const { locale: raw } = await params; const locale = validLocale(raw); return <div className="page-shell"><SiteHeader locale={locale} /><main className="docs-page section-pad"><section className="subpage-title"><div className="section-kicker">PLAIN-LANGUAGE GLOSSARY</div><h1>{locale === "zh" ? "术语不应该成为门槛" : "Jargon should not be a gate"}</h1><p>{locale === "zh" ? "先用一句人话建立概念，再到真实源码里校准细节。" : "Start with one plain sentence, then calibrate against the source."}</p></section><div className="glossary-grid">{terms.map(([name, zh, en], index) => <article key={name}><span>{String(index + 1).padStart(2, "0")}</span><BookMarked size={18} /><h2>{name}</h2><p>{locale === "zh" ? zh : en}</p></article>)}</div><a className="official-doc-card" href="https://github.com/deepseek-ai/deepseek-harness/tree/master/docs" target="_blank" rel="noreferrer"><div><small>PRIMARY SOURCE</small><h2>{locale === "zh" ? "继续阅读官方文档" : "Continue with the official docs"}</h2><p>{locale === "zh" ? "本项目负责搭桥，官方仓库始终是事实真源。" : "This project builds the bridge; upstream remains the source of truth."}</p></div><ExternalLink /></a></main><Footer locale={locale} /></div>; }
