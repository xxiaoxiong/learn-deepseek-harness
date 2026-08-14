import { Check, Minus, X } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { validLocale } from "@/lib/content";

const rows = [
  ["上下文 / Context", "messages 数组", "append-only SessionEvent + 可重建投影"],
  ["工具 / Tools", "手写函数列表", "作用域注册表 + schema 自动装配"],
  ["安全 / Safety", "调用前一个 if", "pre-execute + monotonic guard + sandbox"],
  ["模型 / Models", "SDK 写死", "LlmAdapter 插件 seam"],
  ["扩展 / Extension", "修改主循环", "在事件接缝旁挂插件"],
  ["界面 / UI", "读取临时状态", "订阅可回放 session/event"],
  ["配置 / Config", "环境变量 + 条件分支", "Profile + Bundle + Patch"],
  ["卸载 / Disposal", "重启进程", "Effect 自动逆向撤销"],
];

export default async function ComparePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params; const locale = validLocale(raw);
  return <div className="page-shell"><SiteHeader locale={locale} /><main className="compare-page section-pad">
    <section className="subpage-title"><div className="section-kicker">SIDE-BY-SIDE</div><h1>{locale === "zh" ? "从 30 行 Agent Loop 到插件化 Harness" : "From a 30-line agent loop to a plugin harness"}</h1><p>{locale === "zh" ? "最小循环适合学习“会调用工具”，生产 Harness 解决的是“长期可演进、可恢复、可治理”。" : "A tiny loop teaches tool use. A production harness solves evolvability, recovery, and governance."}</p></section>
    <div className="compare-code"><section><header><X size={17} />{locale === "zh" ? "最小循环" : "Minimal loop"}</header><pre>{`while (true) {\n  const reply = await model(messages, tools)\n  messages.push(reply)\n  if (!reply.toolCalls) break\n  for (const call of reply.toolCalls) {\n    messages.push(await tools[call.name](call.args))\n  }\n}`}</pre><p>{locale === "zh" ? "优点：直观、易学。代价：状态、权限、重试和扩展逐渐挤进同一个循环。" : "Clear and teachable, but state, policy, retries, and extensions eventually crowd the loop."}</p></section><section className="harness-code"><header><Check size={17} />DeepSeek Harness</header><pre>{`profile\n  └─ bundle: dsh-base\n      ├─ plugin: session\n      ├─ plugin: system-prompt\n      ├─ plugin: agent-loop\n      ├─ plugin: tools\n      ├─ plugin: approval\n      └─ plugin: sandbox`}</pre><p>{locale === "zh" ? "复杂度没有消失，而是被分配到有契约、有生命周期、可独立替换的边界。" : "Complexity remains, but moves into contracted, lifecycle-owned, replaceable boundaries."}</p></section></div>
    <section className="comparison-table"><div className="table-row table-head"><span>{locale === "zh" ? "关注点" : "Concern"}</span><span>{locale === "zh" ? "最小 Agent" : "Minimal agent"}</span><span>DeepSeek Harness</span></div>{rows.map(([name, basic, harness]) => <div className="table-row" key={name}><strong>{name}</strong><span><Minus size={14} />{basic}</span><span><Check size={14} />{harness}</span></div>)}</section>
  </main><Footer locale={locale} /></div>;
}

