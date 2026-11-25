import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/lib/seo-pages";
import { PRODUCTION_SITE_ORIGIN } from "@/lib/site";

const title = "Блог | Зимна поддръжка и грижа за градини в София";
const description = "Практични статии от BG GREEN YARD за снегопочистване в София, зимна поддръжка на комплекси, озеленяване, градини и поливни системи.";
const url = `${PRODUCTION_SITE_ORIGIN}/bg/blog`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url,
    title,
    description,
    images: [{ url: posts[0].image, alt: posts[0].imageAlt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [posts[0].image] },
};

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  if ((await params).locale !== "bg") notFound();

  return (
    <main>
      <section className="garden-block garden-block-cream py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">BG GREEN YARD · Практични съвети</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">Блог за градини и сезонна поддръжка</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">Професионален поглед към снегопочистването, зимната поддръжка и грижата за зелените пространства в София — през всеки сезон.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <article key={post.slug} className="flex flex-col overflow-hidden rounded-3xl bg-surface shadow-sm">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={post.image} alt={post.imageAlt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" priority={index === 0} />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand">{index === 0 ? "На фокус · Зимен сезон" : "Градина · Практични насоки"}</p>
                  <h2 className="mt-3 text-xl font-bold leading-snug text-foreground">
                    <Link href={`/bg/blog/${post.slug}`} className="hover:text-brand focus-visible:outline-2 focus-visible:outline-brand">{post.title}</Link>
                  </h2>
                  <p className="mb-5 mt-3 text-sm leading-relaxed text-muted">{post.description}</p>
                  <Link href={`/bg/blog/${post.slug}`} aria-label={`Прочетете: ${post.title}`} className="mt-auto inline-flex items-center gap-2 self-start py-2 font-semibold text-brand hover:underline">Прочети статията <span aria-hidden="true">→</span></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
