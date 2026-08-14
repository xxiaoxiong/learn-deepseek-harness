import Link from "next/link";
import { ArrowRight, Check, Minus, X } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { validLocale } from "@/lib/content";

const minimalCode = ["while (true) {", "  const reply = await model(messages, tools)", "  messages.push(reply)", "  if (!reply.toolCalls) break", "  for (const call of reply.toolCalls) {", "    messages.push(await tools[call.name](call.args))", "  }", "}"].join("\n");
const harnessCode = ["profile / bundle / patch", "        ↓ compose", "Context + scoped effects", "        ↓ drive", "Inbox → Turn → Step", "        ↓ publish", "SessionEvent + agent/*", "        ↓ project", "Web · CLI · ACP · SDK"].join("\n");
const rows = [
  ["状态真源", "内存 messages 数组", "append-only SessionEvent + projection", "State truth", "In-memory messages array", "Append-only SessionEvent + projection"],
  ["一次执行", "一次循环迭代", "Inbox → Turn → 1..n Step → settlement", "Execution unit", "One loop iteration", "Inbox → Turn → 1..n steps → settlement"],
  ["工具结果", "直接 push 文本", "守卫管线 + 配对债务 + 统一结算", "Tool result", "Push text directly", "Guard pipeline + paired debt + settlement"],
  ["权限", "工具内部 if", "Preset → approval → monotonic guard", "Permission", "If inside each tool", "Preset → approval → monotonic guard"],
  ["长上下文", "截断旧消息", "Compaction + surface + spill + pair balance", "Long context", "Drop old messages", "Compaction + surface + spill + pair balance"],
  ["替换实现", "改调用处", "Service definition → provider → consumer", "Replace implementation", "Edit call sites", "Service definition → provider → consumer"],
  ["后台协作", "另写一套队列", "Subagent / Job / Workflow / Schedule contracts", "Background work", "Build another queue", "Subagent / Job / Workflow / Schedule contracts"],
  ["产品组合", "复制配置或分支", "Profile + Bundle + Patch + scoped disposal", "Product composition", "Copy config or fork", "Profile + Bundle + Patch + scoped disposal"],
];

export default async function ComparePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params; const locale = validLocale(raw);
  return <div className="page-shell"><SiteHeader locale={locale} /><main className="compare-page section-pad"><section className="subpage-title"><div className="section-kicker">DESIGN TRADE-OFFS · SIDE BY SIDE</div><h1>{locale === "zh" ? "30 行 Agent Loop 没有错，只是没有回答生产问题" : "A 30-line agent loop is not wrong—it answers a smaller question"}</h1><p>{locale === "zh" ? "最小循环最适合学习“模型如何调用工具”；Harness 解决的是失败、恢复、治理、替换和多人长期维护。复杂度没有消失，它被分配到了有契约的边界。" : "A tiny loop is ideal for learning tool calls. A harness addresses failure, recovery, governance, replacement, and long-term maintenance. Complexity moves into contracted boundaries."}</p></section>
    <div className="compare-code"><section><header><X />{locale === "zh" ? "教学型最小循环" : "Teaching-sized loop"}</header><pre>{minimalCode}</pre><p>{locale === "zh" ? "局部因果非常清楚；随着持久化、审批、取消、恢复和多表面加入，所有责任开始争夺这个循环。" : "Local causality is clear. Add persistence, approval, cancellation, recovery, and surfaces, and every responsibility crowds the loop."}</p></section><section className="harness-code"><header><Check />DeepSeek Harness</header><pre>{harnessCode}</pre><p>{locale === "zh" ? "核心价值不是代码更少，而是每类变化都有自己的责任人、生命周期和测试边界。" : "The value is not fewer lines, but ownership, lifecycle, and test boundaries for each kind of change."}</p></section></div>
    <section className="comparison-table"><div className="table-row table-head"><span>{locale === "zh" ? "关注点" : "Concern"}</span><span>{locale === "zh" ? "最小 Agent" : "Minimal agent"}</span><span>DeepSeek Harness</span></div>{rows.map(row => <div className="table-row" key={row[0]}><strong>{locale === "zh" ? row[0] : row[3]}</strong><span><Minus />{locale === "zh" ? row[1] : row[4]}</span><span><Check />{locale === "zh" ? row[2] : row[5]}</span></div>)}</section>
    <section className="decision-note"><div><small>USE THE SMALLEST SYSTEM THAT ANSWERS YOUR QUESTION</small><h2>{locale === "zh" ? "什么时候应该升级为 Harness？" : "When should you graduate to a harness?"}</h2></div><p>{locale === "zh" ? "当你需要跨进程恢复、多个客户端、可审计审批、可替换能力或多人并行维护时，明确边界开始比局部代码量更重要。" : "When you need cross-process recovery, multiple clients, auditable approval, replaceable capabilities, or parallel maintenance, explicit boundaries matter more than local line count."}</p><Link href={`/${locale}/chapter/h01-harness`}>{locale === "zh" ? "从第一原则开始" : "Start from first principles"}<ArrowRight /></Link></section>
  </main><Footer locale={locale} /></div>;
}
