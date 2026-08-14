"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FlowStep, Locale, pick } from "@/lib/content";

export function MechanismFlow({ steps, locale }: { steps: FlowStep[]; locale: Locale }) {
  const [active, setActive] = useState(0);
  const step = steps[active];
  return <div className="mechanism-flow">
    <div className="mechanism-tabs" role="tablist">{steps.map((item, index) => <div className="mechanism-tab-wrap" key={`${item.code}-${index}`}><button type="button" role="tab" aria-selected={active === index} className={active === index ? "active" : ""} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, "0")}</span><code>{item.code}</code></button>{index < steps.length - 1 && <ArrowRight aria-hidden="true" />}</div>)}</div>
    <div className="mechanism-detail" role="tabpanel"><CheckCircle2 /><div><small>{locale === "zh" ? `第 ${active + 1} 步 / 共 ${steps.length} 步` : `Step ${active + 1} of ${steps.length}`}</small><h3>{pick(step.title, locale)}</h3><p>{pick(step.detail, locale)}</p></div></div>
  </div>;
}
