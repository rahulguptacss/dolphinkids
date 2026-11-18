'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import type { TourSectionData } from '../../types';

export default function Tour({ data }: { data: TourSectionData }) {
  const [started, setStarted] = useState(false);

  return (
    <section id={data.id} className="bg-brand-tint py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand">
              <span className="font-display font-normal normal-case tracking-normal text-gilt">{data.index}</span>
              <span className="mx-3 font-normal text-gilt">—</span>
              {data.eyebrow}
            </p>
            <h2 className="font-display mt-4 max-w-3xl text-4xl font-normal leading-[1.05] sm:text-5xl">{data.title}</h2>
            <p className="mt-4 max-w-2xl text-lg text-body">{data.lead}</p>
          </div>
          <a href={data.button_href} className="btn-lift inline-flex min-h-12 shrink-0 items-center rounded-full bg-ink px-6 text-sm font-semibold text-paper hover:bg-brand">
            {data.button_text}
          </a>
        </div>
        <figure className="mt-12">
          <div className="relative overflow-hidden rounded-2xl bg-ink">
            {started ? (
              <video src={data.video} poster={data.poster} controls autoPlay playsInline className="aspect-video w-full bg-ink object-contain" aria-label={data.video_title} />
            ) : (
              <button type="button" onClick={() => setStarted(true)} className="group relative block w-full" aria-label={data.play_label}>
                <img src={data.poster} alt="" className="aspect-video w-full object-cover" />
                <span className="absolute inset-0 bg-ink/35" />
                <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink transition-transform group-hover:scale-105">
                  <Play className="ml-1 h-8 w-8" fill="currentColor" />
                </span>
                <span className="absolute bottom-5 left-5 font-display text-xl text-white">{data.video_title}</span>
              </button>
            )}
          </div>
          <figcaption className="mt-2 text-xs leading-relaxed text-body">{data.notice}</figcaption>
        </figure>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-body">
          <span>{data.links_label}</span>
          {data.links.map((link) => (
            <a key={link.name} href={link.href} className="min-h-11 content-center font-semibold text-ink underline-offset-4 hover:underline">
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
