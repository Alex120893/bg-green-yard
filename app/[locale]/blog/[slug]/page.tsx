import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/lib/seo-pages";
export function generateStaticParams() { return posts.map(({ slug }) => ({ locale: "bg", slug })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> { const { locale, slug } = await params;
  if (locale !== "bg") notFound(); const post = posts.find((item) => item.slug === slug); if (!post) return {}; return { title: post.title, description: post.description, alternates: { canonical: `https://bg-greenyard.com/bg/blog/${slug}` } }; }
export default async function PostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) { const { locale, slug } = await params;
  if (locale !== "bg") notFound(); const post = posts.find((item) => item.slug === slug); if (!post) notFound(); return <main><article className="bg-white py-16 md:py-24"><div className="mx-auto max-w-3xl px-4 md:px-6"><Link href="/bg/blog" className="text-sm font-semibold text-brand">← Всички статии</Link><h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">{post.title}</h1><p className="mt-5 text-lg text-muted">{post.description}</p><div className="mt-10 space-y-5 text-lg leading-relaxed text-foreground/80">{post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><section className="mt-12 rounded-3xl bg-surface p-7"><h2 className="text-2xl font-bold">Нуждаете се от професионална грижа?</h2><p className="mt-3 text-muted">Свържете се с BG.GREEN_YARD за оглед и оферта в София.</p><Link href="/bg/contact" className="mt-5 inline-flex rounded-full bg-brand px-6 py-3 font-semibold text-white">Получи оферта</Link></section></div></article></main>; }
