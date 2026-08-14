"use client";

import { useState } from "react";
import { Blocks, Database, Layers3, PanelsTopLeft, Route, ShieldCheck } from "lucide-react";
import { architecturePlanes, Locale, pick } from "@/lib/content";

const icons = { layers: Layers3, route: Route, blocks: Blocks, shield: ShieldCheck, database: Database, panels: PanelsTopLeft };

export function SystemMap({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const plane = architecturePlanes[active];
  const Icon = icons[plane.icon as keyof typeof icons];
  return (
    <div className="system-lab">
      <div className="lab-topline"><span>{locale === "zh" ? "六平面架构地图" : "Six-plane architecture atlas"}</span><span className="status"><i /> SOURCE ALIGNED</span></div>
      <div className="system-track" role="tablist" aria-label="Architecture planes">
        {architecturePlanes.map((item, index) => {
          const ItemIcon = icons[item.icon as keyof typeof icons];
          return <button type="button" role="tab" aria-selected={active === index} key={item.id} className={`system-node ${active === index ? "active" : ""}`} onClick={() => setActive(index)}><span className="node-icon"><ItemIcon size={18} /></span><small>0{index + 1}</small><b>{pick(item.title, locale)}</b></button>;
        })}
      </div>
      <div className="lab-detail" role="tabpanel">
        <span className="detail-icon"><Icon size={22} /></span>
        <div><small>{plane.tag}</small><h3>{pick(plane.title, locale)}</h3><p>{pick(plane.description, locale)}</p><div className="package-list">{plane.packages.map(item => <code key={item}>{item}</code>)}</div></div>
      </div>
    </div>
  );
}
