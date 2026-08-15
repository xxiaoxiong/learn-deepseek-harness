import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  alternates: { canonical: "/zh", languages: { "zh-CN": "/zh", en: "/en", "x-default": "/zh" } },
};

export default function IndexPage() {
  redirect("/zh");
}
