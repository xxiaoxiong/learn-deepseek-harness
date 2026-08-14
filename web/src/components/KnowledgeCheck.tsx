"use client";

import { useState } from "react";
import { ChevronDown, CircleHelp, Sparkles } from "lucide-react";
import { Locale } from "@/lib/content";

export function KnowledgeCheck({ question, answer, locale }: { question: string; answer: string; locale: Locale }) {
  const [open, setOpen] = useState(false);
  return <section className={`knowledge-check ${open ? "open" : ""}`}><div className="check-heading"><CircleHelp /><div><small>KNOWLEDGE CHECK</small><h2>{locale === "zh" ? "先停十秒，再揭晓答案" : "Pause for ten seconds before revealing"}</h2></div></div><p className="check-question">{question}</p><button type="button" onClick={() => setOpen(!open)} aria-expanded={open}><span>{open ? (locale === "zh" ? "收起答案" : "Hide answer") : (locale === "zh" ? "查看答案" : "Reveal answer")}</span><ChevronDown /></button>{open && <div className="check-answer"><Sparkles /><p>{answer}</p></div>}</section>;
}
