import { ArrowUpRight, Check, MessageCircle } from 'lucide-react';
import type { DayCareSectionData } from '../../types';

export default function DayCare({ data }: { data: DayCareSectionData }) {
  return (
    <section id={data.id} className="bg-brand-tint py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand">
          <span className="font-display font-normal normal-case tracking-normal text-gilt">{data.index}</span>
          <span className="mx-3 font-normal text-gilt">—</span>
          {data.eyebrow}
        </p>
        <h2 className="font-display mt-4 max-w-3xl text-4xl font-normal leading-[1.05] sm:text-5xl">{data.title}</h2>
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <article className="flex flex-col rounded-3xl bg-white p-8 sm:p-10">
            <span className="w-fit rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-brand">{data.main_badge}</span>
            <h3 className="font-display mt-6 text-3xl text-ink sm:text-4xl">{data.main_title}</h3>
            <p className="mt-3 text-lg text-body">{data.main_text}</p>
            <ul className="mt-8 grid flex-1 gap-3 sm:grid-cols-2">
              {data.points.map((point) => (
                <li key={point} className="flex gap-2.5">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-brand" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={data.primary_href} className="btn-lift inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-paper hover:bg-brand">
                {data.primary_label} <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href={data.whatsapp_href} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/25 px-6 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand">
                <MessageCircle className="h-4 w-4" /> {data.whatsapp_label}
              </a>
            </div>
          </article>
          <article className="flex flex-col rounded-3xl bg-deep p-8 sm:p-10">
            <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-gilt">{data.extended_badge}</span>
            <h3 className="font-display mt-6 text-3xl text-ink sm:text-4xl">{data.extended_title}</h3>
            <p className="mt-3 flex-1 text-lg text-body">{data.extended_text}</p>
            <a href={data.extended_href} className="btn-lift mt-9 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-paper px-6 text-sm font-semibold text-ink hover:bg-white">
              {data.extended_label} <ArrowUpRight className="h-4 w-4" />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
