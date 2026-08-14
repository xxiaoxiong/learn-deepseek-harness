import Link from "next/link";
import { ArrowRight, Blocks, Box, Database, PanelsTopLeft, Shield, Waves } from "lucide-react";
import { FlowLab } from "@/components/FlowLab";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { validLocale } from "@/lib/content";

const blocks = [
  { icon: PanelsTopLeft, id: "01", zh: "入口层", en: "Surfaces", items: "Web · Headless · ACP · SDK", textZh: "只负责协议与交互，最终进入同一个 Agent。", textEn: "Adapt protocols and interaction, then enter the same Agent." },
  { icon: Blocks, id: "02", zh: "组合层", en: "Composition", items: "Profile · Bundle · Patch · Scope", textZh: "用配置把插件树组装成不同产品。", textEn: "Compose plugin trees into products through configuration." },
  { icon: Waves, id: "03", zh: "运行主干", en: "Runtime spine", items: "Inbox · Turn · Step · Stream", textZh: "状态机持续认领输入、请求模型和结清工作。", textEn: "A state machine claims input, calls models, and settles work." },
  { icon: Box, id: "04", zh: "能力平面", en: "Capabilities", items: "LLM · Tools · Sandbox · Compaction", textZh: "每项能力都有定义、提供者与消费者。", textEn: "Every capability has a definition, provider, and consumer." },
  { icon: Database, id: "05", zh: "事实层", en: "Truth layer", items: "SessionEvent · Persistence · Replay", textZh: "append-only 日志保存所有模型可见事实。", textEn: "An append-only log preserves every model-visible fact." },
  { icon: Shield, id: "06", zh: "控制层", en: "Control plane", items: "Approval · Guard · Policy · Telemetry", textZh: "插件在事件接缝上约束和观察运行。", textEn: "Plugins constrain and observe execution at event seams." },
];

export default async function ArchitecturePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params; const locale = validLocale(raw);
  return <div className="page-shell"><SiteHeader locale={locale} /><main>
    <section className="subpage-hero section-pad architecture-hero"><div className="section-kicker">CURRENT ARCHITECTURE · SOURCE-ALIGNED</div><h1>{locale === "zh" ? "DeepSeek Harness 架构地图" : "DeepSeek Harness architecture map"}</h1><p>{locale === "zh" ? "它不是“一个循环加很多 if”，而是一棵在启动时组合、运行时协作、卸载时可逆的插件树。" : "It is not one loop with many if statements. It is a plugin tree composed at boot, cooperating at runtime, and reversible at disposal."}</p><div className="stat-strip"><span><b>Everything</b> is a Plugin</span><span><b>3</b> event domains</span><span><b>1</b> append-only truth</span><span><b>∞</b> compositions</span></div></section>
    <section className="architecture-grid section-pad">{blocks.map(({ icon: Icon, ...block }) => <article key={block.id}><div className="architecture-icon"><Icon size={20} /></div><small>{block.id}</small><h2>{locale === "zh" ? block.zh : block.en}</h2><code>{block.items}</code><p>{locale === "zh" ? block.textZh : block.textEn}</p></article>)}</section>
    <section className="flow-section section-pad"><div className="flow-copy"><div className="section-kicker">TURN FLOW · CLICK TO REPLAY</div><h2>{locale === "zh" ? "一次回答，如何经过整个系统" : "How one answer moves through the system"}</h2><p>{locale === "zh" ? "Turn 是一份要结清的任务，Step 是一次模型请求。工具调用可能让同一个 Turn 产生多个 Step。点击右侧事件逐步播放。" : "A turn is work to settle; a step is one model request. Tool calls can create several steps inside one turn. Replay the events on the right."}</p><Link href={`/${locale}/chapter/h09-turn-step`}>{locale === "zh" ? "深入 Turn 与 Step" : "Explore turns and steps"}<ArrowRight size={15} /></Link></div><FlowLab locale={locale} /></section>
  </main><Footer locale={locale} /></div>;
}

