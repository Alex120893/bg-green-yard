import Image from "next/image";
import Link from "next/link";
import { homeArticles } from "@/lib/home-articles";

export function HomeBlog() {
  const latest = homeArticles;

  return (
    <section aria-labelledby="home-blog-title" className="garden-block garden-block-cream px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 id="home-blog-title" className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Блог за градини и сезонна поддръжка</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">Професионален поглед към снегопочистването, зимната поддръжка и грижата за зелените пространства в София — през всеки сезон.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {latest.map((post) => <article key={post.slug} data-home-blog-card className="flex min-w-0 flex-col overflow-hidden rounded-3xl">
            <div className="relative aspect-[16/10] overflow-hidden"><Image src={post.image} alt={post.imageAlt} fill sizes="(min-width: 1280px) 368px, (min-width: 768px) 33vw, 100vw" className="object-cover" /></div>
            <div className="flex flex-1 flex-col p-6">
              <time dateTime={post.datePublished} className="text-xs font-semibold text-muted">{new Intl.DateTimeFormat("bg-BG", { dateStyle: "long", timeZone: "UTC" }).format(new Date(post.datePublished!))}</time>
              <h3 className="mt-3 break-words text-xl font-bold leading-snug"><Link href={`/bg/blog/${post.slug}`} className="hover:text-brand">{post.title}</Link></h3>
              <p className="mb-5 mt-3 text-sm leading-relaxed text-muted">{post.description}</p>
              <Link href={`/bg/blog/${post.slug}`} aria-label={`Прочети повече: ${post.title}`} className="mt-auto inline-flex min-h-11 items-center self-start font-semibold text-brand hover:underline">Прочети повече</Link>
            </div>
          </article>)}
        </div>
        <div className="mt-8 text-center"><Link href="/bg/blog" className="garden-button min-h-12 w-full !text-base sm:w-auto">Всички статии</Link></div>
      </div>
    </section>
  );
}
