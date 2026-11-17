import { ArrowRight } from 'lucide-react';
import type { ProgrammesSectionData } from '../../types';
import AgeCheck from './AgeCheck';

export default function Programmes({ data }: { data: ProgrammesSectionData }) {
  return (
    <section id={data.id} className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
      <p className="eyebrow"><span className="font-display normal-case tracking-normal text-gilt">{data.index}</span> {data.eyebrow}</p>
      <h2 className="font-display mt-4 max-w-3xl text-3xl font-normal leading-[1.08] sm:text-5xl">{data.title}</h2>
      <p className="mt-4 max-w-2xl text-lg text-body">{data.lead}</p>
      <p className="mt-4 text-sm font-semibold text-brand">{data.ribbon}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {data.cards.map((card, index) => (
          <a key={card.title} href={card.href} className={`group rounded-2xl border p-6 transition-colors ${index === 0 ? 'border-brand/15 bg-brand-tint hover:bg-white' : 'border-ink/10 bg-white hover:bg-brand-tint'}`}>
            <p className="eyebrow">{card.eyebrow}</p>
            <h3 className="font-display mt-3 text-2xl">{card.title}</h3>
            <p className="mt-2 text-sm text-body">{card.text}</p>
            <span className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand">{card.link} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
          </a>
        ))}
      </div>
      <p className="mt-6 text-sm text-body">{data.note}</p>
      <a href={data.process_href} className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand underline underline-offset-4">{data.process_link} <ArrowRight className="h-4 w-4" /></a>
      <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((item, index) => (
          <li key={item.name} className="group relative reveal bg-paper p-7 transition-colors hover:bg-white" style={{ transitionDelay: `${index * 60}ms` }}>
            <div className="flex items-start justify-between">
              <span className="font-display text-5xl text-brand/20">{String(index + 1).padStart(2, '0')}</span>
              <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">{data.badge}</span>
            </div>
            <h3 className="font-display mt-6 text-3xl text-ink">{item.name}</h3>
            <p className="mt-1 text-body">{item.age}</p>
            <p className="mt-4 line-clamp-2 text-sm text-body/80">{item.focus}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a href={data.process_href} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink hover:text-brand">
                {data.details_label} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href={data.whatsapp_href} className="inline-flex min-h-11 items-center text-sm font-semibold text-brand underline-offset-4 hover:underline">{data.whatsapp_label}</a>
            </div>
          </li>
        ))}
      </ol>
      <AgeCheck data={data} />
    </section>
  );
}
