"use client";

import { useState } from "react";
import { Check, ChevronRight, Play, RotateCcw } from "lucide-react";
import { Locale } from "@/lib/content";

const flow = [
  { code: "turn/start", zh: "认领输入", en: "Claim input" },
  { code: "agent/pre-step", zh: "允许插件改写", en: "Let plugins rewrite" },
  { code: "step/start", zh: "组装上下文", en: "Assemble context" },
  { code: "agent/request", zh: "请求模型", en: "Request model" },
  { code: "tool/call", zh: "执行工具管线", en: "Run tool pipeline" },
  { code: "step/end", zh: "判断是否欠工作", en: "Check remaining work" },
  { code: "turn/end", zh: "关闭并落盘", en: "Close and persist" },
];

export function FlowLab({ locale }: { locale: Locale }) {
  const [step, setStep] = useState(0);
  const done = step === flow.length - 1;
  return (
    <div className="flow-lab">
      <div className="flow-header">
        <div><span className="window-dots">● ● ●</span><strong>agent-turn.trace</strong></div>
        <button onClick={() => setStep(done ? 0 : Math.min(step + 1, flow.length - 1))}>{done ? <RotateCcw size={15} /> : <Play size={15} />}{done ? (locale === "zh" ? "重放" : "Replay") : (locale === "zh" ? "下一事件" : "Next event")}</button>
      </div>
      <div className="flow-body">
        {flow.map((item, index) => (
          <button key={item.code} onClick={() => setStep(index)} className={`flow-row ${index === step ? "current" : ""} ${index < step ? "passed" : ""}`}>
            <span className="event-index">{index < step ? <Check size={13} /> : String(index + 1).padStart(2, "0")}</span>
            <code>{item.code}</code>
            <span>{locale === "zh" ? item.zh : item.en}</span>
            {index === step && <ChevronRight size={15} />}
          </button>
        ))}
      </div>
      <div className="flow-caption">
        <span>SESSION EVENT</span>
        <p>{locale === "zh" ? `现在：${flow[step].zh}。这一事实会成为可回放事件的一部分。` : `Now: ${flow[step].en}. This fact becomes part of the replayable event stream.`}</p>
      </div>
    </div>
  );
}
