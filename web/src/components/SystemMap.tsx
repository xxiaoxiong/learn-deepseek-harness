"use client";

import { useState } from "react";
import { Box, BrainCircuit, Database, Layers3, Monitor, ShieldCheck, Wrench } from "lucide-react";
import { Locale } from "@/lib/content";

const nodes = [
  { id: "surface", icon: Monitor, zh: "入口", en: "Surface", detailZh: "Web、Headless、ACP 把输入送进同一个 Agent inbox。", detailEn: "Web, Headless, and ACP feed the same agent inbox." },
  { id: "agent", icon: BrainCircuit, zh: "Agent", en: "Agent", detailZh: "Turn 与 Step 状态机负责持续推进任务。", detailEn: "The turn/step state machine keeps work moving." },
  { id: "prompt", icon: Layers3, zh: "装配", en: "Assembly", detailZh: "系统提示词、上下文与工具 schema 每步重新装配。", detailEn: "Prompts, context, and tool schemas assemble every step." },
  { id: "model", icon: Box, zh: "模型", en: "Model", detailZh: "适配器把统一请求翻译给 DeepSeek 或其他模型。", detailEn: "Adapters translate one request vocabulary to any model." },
  { id: "tools", icon: Wrench, zh: "工具", en: "Tools", detailZh: "调用经过限制、权限、沙箱、执行与结果观察。", detailEn: "Calls cross restriction, approval, sandbox, execution, and observation." },
  { id: "log", icon: Database, zh: "日志", en: "Log", detailZh: "每个可见事实写成 SessionEvent，支持回放与持久化。", detailEn: "Every visible fact becomes a SessionEvent for replay and persistence." },
];

export function SystemMap({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(1);
  const current = nodes[active];
  return (
    <div className="system-lab">
      <div className="lab-topline"><span>{locale === "zh" ? "交互式系统地图" : "Interactive system map"}</span><span className="status"><i /> LIVE MODEL</span></div>
      <div className="system-track">
        {nodes.map((node, index) => {
          const Icon = node.icon;
          return (
            <button key={node.id} className={`system-node ${active === index ? "active" : ""}`} onClick={() => setActive(index)}>
              <span className="node-icon"><Icon size={19} /></span>
              <span>{locale === "zh" ? node.zh : node.en}</span>
              {index < nodes.length - 1 && <i className="connector" />}
            </button>
          );
        })}
      </div>
      <div className="lab-detail">
        <div><ShieldCheck size={18} /><strong>{locale === "zh" ? current.zh : current.en}</strong></div>
        <p>{locale === "zh" ? current.detailZh : current.detailEn}</p>
        <code>ctx.{current.id} · plugin-owned · reversible effect</code>
      </div>
    </div>
  );
}

