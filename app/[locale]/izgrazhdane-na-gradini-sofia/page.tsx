import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoServicePage } from "@/components/SeoServicePage";
import { servicePages } from "@/lib/seo-pages";

const page = servicePages["izgrazhdane-na-gradini-sofia"];
export const metadata: Metadata = { title: page.title, description: page.description, alternates: { canonical: "https://bg-greenyard.com/bg/izgrazhdane-na-gradini-sofia" } };
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (locale !== "bg") notFound(); return <SeoServicePage page={page} />; }
