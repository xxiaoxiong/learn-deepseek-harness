import Link from "next/link";
import { ArrowRight, Box, Braces, Database, GitFork, ShieldCheck } from "lucide-react";
import { FlowLab } from "@/components/FlowLab";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { SystemMap } from "@/components/SystemMap";
import { upstreamSnapshot, validLocale } from "@/lib/content";

const domains = [
  ["session/event", "Durable truth", "可排序、可回放、模型可见的事实；持久化 transcript 和投影都从这里生长。", "Ordered, replayable, model-visible facts—the durable base for transcripts and projections."],
  ["agent/*", "Live runtime", "状态、流式增量、steer/cancel 等运行控制；观察当前执行但不冒充历史真源。", "State, stream deltas, steer/cancel, and live control—observes execution without pretending to be history."],
  ["capability events", "Open seams", "工具、审批、提示词、压缩等子系统公开的可组合接缝，插件在这里改写或拒绝。", "Composable seams exposed by tools, approval, prompt, compaction, and other capabilities."],
];

export default async function ArchitecturePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params; const locale = validLocale(raw);
  return <div className="page-shell"><SiteHeader locale={locale} /><main>
    <section className="subpage-hero section-pad architecture-hero"><div className="section-kicker">SOURCE-ALIGNED ARCHITECTURE · {upstreamSnapshot.shortCommit}</div><h1>{locale === "zh" ? "一张地图看懂 DeepSeek Harness" : "One atlas for the DeepSeek Harness system"}</h1><p>{locale === "zh" ? "这不是按目录复述文件，而是把启动时组合、运行时主干、能力替换、控制接缝、事实存储与客户端表面放到同一张因果地图里。" : "This is not a directory tour. It puts boot-time composition, runtime spine, replaceable capabilities, control seams, durable truth, and client surfaces into one causal map."}</p><div className="stat-strip"><span><b>{upstreamSnapshot.packageFamilies}</b> package families</span><span><b>3</b> event domains</span><span><b>6</b> reasoning planes</span><span><b>1</b> append-only truth</span></div></section>
    <section className="architecture-atlas section-pad"><SystemMap locale={locale} /></section>
    <section className="event-domains section-pad"><div className="section-heading"><div><div className="section-kicker">EVENT SEMANTICS</div><h2>{locale === "zh" ? "先问“属于哪个事件域”，再问“发生了什么”" : "Ask which event domain before asking what happened"}</h2></div><p>{locale === "zh" ? "把实时状态和持久事实混在一起，是读 Harness 最常见也最危险的误区。" : "Mixing live state with durable fact is the most common—and dangerous—reading mistake."}</p></div><div className="domain-grid">{domains.map(([name, label, zh, en], index) => <article key={name}><span>0{index + 1}</span><code>{name}</code><h3>{label}</h3><p>{locale === "zh" ? zh : en}</p></article>)}</div></section>
    <section className="flow-section section-pad"><div className="flow-copy"><div className="section-kicker">TURN FLOW · INTERACTIVE TRACE</div><h2>{locale === "zh" ? "一条用户输入，不只产生一次模型调用" : "One input does not mean one model call"}</h2><p>{locale === "zh" ? "Turn 是需要结清的工作单元；Step 是一次 LLM 请求。工具调用会留下“债务”，只有结果写回并继续推理，Turn 才能结束。" : "A turn is work that must settle; a step is one LLM request. Tool calls create debt, and the turn closes only after results return and reasoning continues."}</p><Link href={`/${locale}/chapter/h12-inbox-turn-step`}>{locale === "zh" ? "深读 Turn / Step" : "Deep dive into turn / step"}<ArrowRight /></Link></div><FlowLab locale={locale} /></section>
    <section className="architecture-principles section-pad"><article><GitFork /><h3>{locale === "zh" ? "组合，不继承" : "Compose, do not inherit"}</h3><p>{locale === "zh" ? "Profile、Bundle、Patch 和插件作用域共同决定产品形态。" : "Profiles, bundles, patches, and plugin scopes define the product."}</p></article><article><Braces /><h3>{locale === "zh" ? "契约，不穿透" : "Contract, do not pierce"}</h3><p>{locale === "zh" ? "消费者依赖 Service Definition，不直接 import Provider。" : "Consumers depend on service definitions, not providers."}</p></article><article><Database /><h3>{locale === "zh" ? "事件，不镜像" : "Events, not mirrors"}</h3><p>{locale === "zh" ? "客户端从 SessionEvent 投影，而不维护第二套权威状态。" : "Clients project SessionEvents instead of owning a second truth."}</p></article><article><ShieldCheck /><h3>{locale === "zh" ? "守卫，不旁路" : "Guard, do not bypass"}</h3><p>{locale === "zh" ? "工具的拒绝、取消和失败都必须沿同一管线结算。" : "Tool denial, cancellation, and failure settle through one pipeline."}</p></article></section>
  </main><Footer locale={locale} /></div>;
}
