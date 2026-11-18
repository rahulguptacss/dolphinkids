import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { pages, sections } from '../../../../components/types';
import ShareBar from '../../../../components/sections/JournalArticle/ShareBar';

export function generateStaticParams() {
  return sections.journalPage.articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const article = sections.journalPage.articles.find((item) => item.slug === slug);
    return { title: article ? `${article.title} | ${pages.journalArticle.metadata.title}` : pages.journalArticle.metadata.title, description: article?.excerpt ?? pages.journalArticle.metadata.description };
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = sections.journalPage;
  const article = page.articles.find((item) => item.slug === slug);
  if (!article) notFound();
  const related = page.articles.filter((item) => item.slug !== article.slug && item.category === article.category).slice(0, 3);
  const minutes = Math.max(3, Math.ceil(article.paragraphs.join(' ').split(/\s+/).length / 180));
  const url = `/journal/article/${article.slug}`;

  return (
    <>
      <div className="border-b border-ink/10 bg-paper">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-5">
          <Link href="/journal" className="hidden shrink-0 py-3 font-display text-lg italic sm:block">{page.heading} {page.heading_em} {page.heading_rest}</Link>
          <nav aria-label={page.journal_label} className="flex flex-1 gap-1 overflow-x-auto py-2 sm:justify-end">
            {page.nav.map((item) => (
              <Link key={item.label} href={item.href} className="inline-flex min-h-10 shrink-0 items-center whitespace-nowrap rounded-full px-3.5 text-sm font-semibold hover:text-brand">{item.label}</Link>
            ))}
          </nav>
        </div>
      </div>
      <article>
        <header className="mx-auto max-w-4xl px-5 pt-8 text-center">
          <p className="text-sm text-body">
            <Link href="/journal" className="hover:text-brand">{page.journal_label}</Link>
            <span className="mx-2 text-gilt">/</span>
            <span>{article.category}</span>
          </p>
          <h1 className="font-display mt-8 text-[clamp(2.1rem,6.5vw,4.2rem)] leading-[1.04]">{article.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-body sm:text-xl">{article.excerpt}</p>
          <p className="mt-6 flex flex-wrap items-center justify-center gap-x-2 text-xs font-semibold uppercase tracking-[0.12em] text-body">
            <span>{page.author_name}</span>
            <span className="text-gilt">/</span>
            <span>{minutes} {page.read_suffix}</span>
          </p>
        </header>
        <figure className="mx-auto mt-10 max-w-6xl px-5">
          <img src={article.image} alt={article.image_alt} className="aspect-[16/9] w-full rounded-[2rem] object-cover sm:aspect-[21/9]" />
          <figcaption className="mt-3 text-center text-xs text-body">{article.image_alt}</figcaption>
        </figure>
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[200px_minmax(0,1fr)_200px]">
          <aside className="hidden lg:block">
            <div className="sticky top-40 space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gilt">{page.share_label}</p>
              <ShareBar url={url} title={article.title} copyLabel={page.copy_label} copiedLabel={page.copied_label} button={page.share_button} aria={page.share_aria} shareOn={page.share_on} links={page.shares} />
            </div>
          </aside>
          <div className="mx-auto w-full max-w-[68ch]">
            <div className="journal-prose dropcap">
              {article.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <p className="mt-8 rounded-2xl bg-deep p-5 text-sm text-body">{page.disclaimer}</p>
            <section className="mt-10 flex gap-5 border-y border-ink/10 py-8" aria-label={page.written_by}>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ink font-display text-xl text-paper">{page.author_initials}</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gilt">{page.written_by}</p>
                <p className="font-display mt-1 text-xl">{page.author_name}</p>
                <p className="mt-2 text-sm text-body">{page.author_bio}</p>
              </div>
            </section>
            <div className="mt-8 lg:hidden">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-gilt">{page.share_label}</p>
              <ShareBar url={url} title={article.title} copyLabel={page.copy_label} copiedLabel={page.copied_label} button={page.share_button} aria={page.share_aria} shareOn={page.share_on} links={page.shares} />
            </div>
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-40 rounded-2xl bg-brand-tint p-5">
              <p className="font-display text-lg leading-snug">{page.sidebar_title}</p>
              <Link href={page.programmes_href} className="mt-3 inline-flex min-h-10 items-center text-sm font-semibold text-brand underline underline-offset-4">{page.programmes_label}</Link>
              <Link href={page.daycare_href} className="inline-flex min-h-10 items-center text-sm font-semibold text-brand underline underline-offset-4">{page.daycare_label}</Link>
            </div>
          </aside>
        </div>
      </article>
      {related.length ? (
        <section className="border-t border-ink/10 bg-white/50 py-16">
          <div className="mx-auto max-w-7xl px-5">
            <h2 className="font-display text-3xl">{page.related_label}</h2>
            <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <article key={item.slug} className="group">
                  <Link href={`/journal/article/${item.slug}`} className="block">
                    <img src={item.image} alt={item.image_alt} className="aspect-[4/3] w-full rounded-[1.5rem] object-cover transition-transform duration-700 group-hover:scale-[1.01]" />
                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-brand">{item.category}</p>
                    <h3 className="font-display mt-2 text-2xl leading-[1.12] group-hover:text-brand">{item.title}</h3>
                    <p className="mt-3 line-clamp-3 text-body">{item.excerpt}</p>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <section className="px-5 py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 rounded-[2rem] bg-ink p-8 text-paper sm:flex-row sm:items-center sm:p-12">
          <div>
            <p className="font-display text-3xl">{page.visit_title}</p>
            <p className="mt-2 text-paper/75">{page.visit_text}</p>
          </div>
          <a href={page.visit_href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-paper/40 px-6 text-sm font-semibold text-paper hover:bg-white/10">
            <MessageCircle className="h-4 w-4" aria-hidden />
            {page.visit_button}
          </a>
        </div>
      </section>
    </>
  );
}
