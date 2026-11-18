import Link from 'next/link';
import { notFound } from 'next/navigation';
import { sections } from '../../../components/types';

export function generateStaticParams() {
  return sections.journalPage.articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const article = sections.journalPage.articles.find((item) => item.slug === slug);
    return { title: article ? `${article.title} | The Parenting Journal` : sections.journalPage.title, description: article?.excerpt };
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = sections.journalPage;
  const article = page.articles.find((item) => item.slug === slug);
  if (!article) notFound();
  const related = page.articles.filter((item) => item.slug !== article.slug && item.category === article.category).slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-sm text-body"><Link href="/" className="hover:text-brand">Home</Link> <span className="mx-2">/</span> <Link href="/journal" className="hover:text-brand">Journal</Link></p>
      <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-brand">{article.category}</p>
      <h1 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">{article.title}</h1>
      <p className="mt-4 text-lg text-body">{article.excerpt}</p>
      <img src={article.image} alt={article.image_alt} className="mt-8 aspect-[16/9] w-full rounded-3xl object-cover" />
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-body">
        {article.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <p className="mt-10"><Link href="/journal" className="font-semibold text-brand underline underline-offset-4">{page.back_label}</Link></p>
      {related.length ? (
        <section className="mt-14">
          <h2 className="font-display text-3xl">{page.related_label}</h2>
          <ul className="mt-6 grid gap-6">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/journal/${item.slug}`} className="font-display text-2xl hover:text-brand">{item.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
