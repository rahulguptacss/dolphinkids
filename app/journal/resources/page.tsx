import Link from 'next/link';
import { Download, FileText } from 'lucide-react';
import { pages, sections } from '../../../components/types';

const page = sections.journalPage;

export const metadata = { title: pages.journalResources.metadata.title, description: pages.journalResources.metadata.description };

export default function ResourcesPage() {
  const data = page.resources;
  return (
    <>
      <div className="border-b border-ink/10 bg-paper">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-5">
          <Link href="/journal" className="hidden shrink-0 py-3 font-display text-lg italic sm:block">{page.heading} {page.heading_em} {page.heading_rest}</Link>
          <nav aria-label={page.journal_label} className="flex flex-1 gap-1 overflow-x-auto py-2 sm:justify-end">
            {page.nav.map((item) => (
              <Link key={item.label} href={item.href} className={`inline-flex min-h-10 shrink-0 items-center whitespace-nowrap rounded-full px-3.5 text-sm font-semibold hover:text-brand ${item.href === '/journal/resources' ? 'bg-ink text-paper' : ''}`}>{item.label}</Link>
            ))}
          </nav>
        </div>
      </div>
      <header className="bg-[hsl(222_42%_94%)]">
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-8">
          <p className="text-sm text-body"><Link href="/" className="hover:text-brand">{page.home_label}</Link> <span className="mx-2 text-gilt">/</span> <Link href="/journal" className="hover:text-brand">{page.journal_label}</Link> <span className="mx-2 text-gilt">/</span> {data.crumb}</p>
          <p className="eyebrow mt-10">{data.eyebrow}</p>
          <h1 className="font-display mt-3 max-w-3xl text-[clamp(2.2rem,7vw,4.5rem)] leading-[1.02]">{data.heading}</h1>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-5 py-14">
        <ul className="grid gap-5 md:grid-cols-2">
          {data.items.map((item) => (
            <li key={item.title} className="flex flex-col rounded-3xl bg-white p-7 ring-1 ring-ink/10">
              <FileText className="h-8 w-8 text-gilt" strokeWidth={1.4} aria-hidden />
              <h2 className="font-display mt-4 text-2xl">{item.title}</h2>
              <p className="mt-2 flex-1 text-body">{item.description}</p>
              <a href={item.href} download className="mt-6 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-paper hover:bg-brand-strong"><Download className="h-4 w-4" aria-hidden />{data.download}</a>
            </li>
          ))}
        </ul>
      </section>
      <section id="workshops" className="scroll-mt-40 border-t border-ink/10 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5">
          <p className="eyebrow">{data.workshop_eyebrow}</p>
          <h2 className="font-display mt-3 text-3xl leading-tight sm:text-5xl">{data.workshop_heading}</h2>
          <p className="mt-4 text-lg text-body">{data.workshop_text}</p>
          <Link href={data.workshop_href} className="mt-6 inline-flex min-h-12 items-center rounded-full bg-ink px-6 text-sm font-semibold text-paper">{data.workshop_button}</Link>
        </div>
      </section>
    </>
  );
}
