import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/lib/seo-pages";
import { PRODUCTION_SITE_ORIGIN } from "@/lib/site";

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ locale: "bg", slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale !== "bg") notFound();
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();
  const url = `${PRODUCTION_SITE_ORIGIN}/bg/blog/${slug}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords ? [...post.keywords] : undefined,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "bg_BG",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.datePublished,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [post.image] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (locale !== "bg") notFound();
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();
  const url = `${PRODUCTION_SITE_ORIGIN}/bg/blog/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: [`${PRODUCTION_SITE_ORIGIN}${post.image}`],
    inLanguage: "bg",
    datePublished: post.datePublished,
    author: { "@type": "Organization", name: "BG GREEN YARD", url: PRODUCTION_SITE_ORIGIN },
    publisher: {
      "@type": "Organization",
      name: "BG GREEN YARD",
      url: PRODUCTION_SITE_ORIGIN,
      logo: { "@type": "ImageObject", url: `${PRODUCTION_SITE_ORIGIN}/logo.jpg` },
    },
    keywords: post.keywords?.join(", "),
    articleBody: [...post.body, ...(post.sections ?? []).flatMap((section) => [section.title, ...section.paragraphs])].join("\n\n"),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <article className="garden-block garden-block-cream py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <Link href="/bg/blog" className="inline-flex py-2 text-sm font-semibold text-brand hover:underline">← Всички статии</Link>
          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{post.description}</p>
          <p className="mt-4 text-sm text-muted">От екипа на BG GREEN YARD{post.datePublished && <> · <time dateTime={post.datePublished}>{new Intl.DateTimeFormat("bg-BG", { dateStyle: "long", timeZone: "UTC" }).format(new Date(post.datePublished))}</time></>}</p>
          <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-3xl md:aspect-video">
            <Image src={post.image} alt={post.imageAlt} fill sizes="(min-width: 896px) 848px, 100vw" priority className="object-cover" />
          </div>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/80">
            {!post.sections && <h2 className="text-2xl font-bold text-foreground">Практични насоки</h2>}
            {post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          {post.sections?.map((section) => (
            <section key={section.title} className="mt-10">
              <h2 className="text-2xl font-bold leading-snug text-foreground">{section.title}</h2>
              <div className="mt-4 space-y-5 text-lg leading-relaxed text-foreground/80">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
          <section className="garden-block garden-block-sage mt-12 rounded-3xl p-6 md:p-8">
            <h2 className="text-2xl font-bold">Заявете оглед и индивидуална оферта</h2>
            <p className="mt-3 leading-relaxed text-muted">Разкажете ни за обекта в София. Екипът на BG GREEN YARD ще уточни необходимите дейности и условията след оглед.</p>
            <Link href="/bg/contact" className="garden-button mt-6">Заявете оферта <span aria-hidden="true">→</span></Link>
          </section>
        </div>
      </article>
    </main>
  );
}
