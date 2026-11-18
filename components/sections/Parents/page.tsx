'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import type { ParentsSectionData } from '../../types';

function Story({ item, notice }: { item: ParentsSectionData['items'][number]; notice: string }) {
  const [started, setStarted] = useState(false);
  return (
    <>
      <div className="relative overflow-hidden rounded-2xl bg-ink">
        {started ? (
          <video src={item.video} poster={item.image} controls autoPlay playsInline className="aspect-[4/3] w-full bg-ink object-contain" aria-label={item.title} />
        ) : (
          <button type="button" onClick={() => setStarted(true)} className="group relative block w-full" aria-label={`Play video: ${item.title}`}>
            <img src={item.image} alt="" className="aspect-[4/3] w-full object-cover" />
            <span className="absolute inset-0 bg-ink/25" />
            <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg transition-transform group-hover:scale-105">
              <Play className="ml-1 h-7 w-7" fill="currentColor" />
            </span>
            <span className="absolute inset-x-0 bottom-0 bg-ink/45 px-4 py-3 text-left font-display text-xl text-white">{item.title}</span>
          </button>
        )}
      </div>
      <p className="mt-2 px-2 text-xs leading-relaxed text-body/80">{notice}</p>
    </>
  );
}

export default function Parents({ data }: { data: ParentsSectionData }) {
  return (
    <section id={data.id} className="bg-ivory py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5">
        <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand">
          <span className="font-display font-normal normal-case tracking-normal text-gilt">{data.index}</span>
          <span className="mx-3 font-normal text-gilt">—</span>
          {data.eyebrow}
        </p>
        <h2 className="font-display mt-4 text-4xl font-normal leading-[1.05] sm:text-5xl">{data.title}</h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-body">{data.lead}</p>
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {data.items.map((item, index) => (
            <figure key={item.title} className={`reveal rounded-[1.75rem] bg-paper p-3 shadow-sm ${index === 1 ? 'md:mt-16' : ''}`}>
              <Story item={item} notice={data.notice} />
              <figcaption className="mt-4 px-2 pb-2 text-body">
                <span className="font-display text-xl text-ink">{data.label}</span> · {item.text}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="reveal mt-12 max-w-2xl text-sm text-body/80">{data.footnote}</p>
      </div>
    </section>
  );
}
