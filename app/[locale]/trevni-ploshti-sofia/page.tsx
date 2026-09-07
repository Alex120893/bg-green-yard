import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoServicePage } from "@/components/SeoServicePage";
import { servicePages } from "@/lib/seo-pages";

const page = servicePages["trevni-ploshti-sofia"];
export const metadata: Metadata = { title: page.title, description: page.description, alternates: { canonical: "https://bg-greenyard.com/bg/trevni-ploshti-sofia" } };
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (locale !== "bg") notFound(); return <SeoServicePage page={page} />; }
