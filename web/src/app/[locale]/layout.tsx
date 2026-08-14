import { notFound } from "next/navigation";
import { DocumentLanguage } from "@/components/DocumentLanguage";

export function generateStaticParams() {
  return [{ locale: "zh" }, { locale: "en" }];
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "zh" && locale !== "en") notFound();
  return <div lang={locale === "zh" ? "zh-CN" : "en"}><DocumentLanguage locale={locale} />{children}</div>;
}

