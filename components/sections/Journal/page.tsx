import { ArrowUpRight } from 'lucide-react';
import type { JournalSectionData } from '../../types';

export default function Journal({ data }: { data: JournalSectionData }) {
  return (
    <section id={data.id} className="bg-[#fbf9f6] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5">
        <p className="reveal text-[12px] font-bold uppercase tracking-[0.18em] text-brand">
          <span className="font-display font-normal normal-case tracking-normal text-gilt">{data.index}</span>
          <span className="mx-3 font-normal text-gilt">—</span>
          {data.eyebrow}
        </p>
        <h2 className="reveal font-display mt-4 max-w-3xl text-4xl font-normal leading-[1.05] sm:text-5xl">{data.title}</h2>
        <p className="reveal mt-6 max-w-xl text-lg leading-relaxed text-body">{data.lead}</p>
        <a href={data.button_href} className="btn-lift mt-10 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-paper hover:bg-brand">
          {data.button} <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
