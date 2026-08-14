"use client";

import { useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { Locale } from "@/lib/content";

const flow = [
  ["inbox/claim", "认领一条输入", "Claim one input", "同一时刻只有一个 Turn 拥有消费权。", "Only one turn owns consumption at a time."],
  ["turn/start", "开启结算单元", "Open settlement unit", "Turn 会持续到所有工具债务被结清。", "The turn stays open until tool debt is settled."],
  ["request/header", "冻结 Epoch 快照", "Freeze epoch snapshot", "模型、工具、提示词与限制形成完整请求头。", "Model, tools, prompt, and limits form a complete request header."],
  ["step/start", "发起模型请求", "Start model request", "一个 Turn 可以因工具循环包含多个 Step。", "A turn may contain multiple steps because of tool loops."],
  ["assistant/*", "流式累积内容", "Accumulate stream", "增量块进入实时状态，完成项进入会话事实。", "Deltas enter live state; completed items become session facts."],
  ["tool/pipeline", "执行守卫管线", "Run guarded pipeline", "pre、审批、around、post、归一化与结算依次发生。", "Pre, approval, around, post, normalization, and settlement run in order."],
  ["step/finish", "关闭本次请求", "Finish model step", "若仍有工具结果，循环进入下一个 Step。", "If tool results remain, the loop enters another step."],
  ["turn/finish", "结清整个 Turn", "Settle the turn", "落盘最终状态、用量、错误和控制事件。", "Persist final state, usage, errors, and control events."],
];

export function FlowLab({ locale }: { locale: Locale }) {
  const [current, setCurrent] = useState(0);
  const item = flow[current];
  return <div className="flow-lab">
    <div className="flow-header"><div><span className="window-dots">● ● ●</span><strong>agent-turn.trace</strong></div><button type="button" onClick={() => setCurrent(0)}><RotateCcw size={14} /> replay</button></div>
    <div className="flow-body">{flow.map((entry, index) => <button type="button" key={entry[0]} onClick={() => setCurrent(index)} className={`flow-row ${index === current ? "current" : ""} ${index < current ? "passed" : ""}`}><span className="event-index">{index < current ? <Check size={13} /> : String(index + 1).padStart(2, "0")}</span><code>{entry[0]}</code><span>{locale === "zh" ? entry[1] : entry[2]}</span></button>)}</div>
    <div className="flow-caption"><span>{String(current + 1).padStart(2, "0")}</span><div><b>{locale === "zh" ? item[1] : item[2]}</b><p>{locale === "zh" ? item[3] : item[4]}</p></div></div>
  </div>;
}
