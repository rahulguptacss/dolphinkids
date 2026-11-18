'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Atom, BookMarked, BookOpen, ChevronDown, Drama, FlaskConical, Globe2, HeartHandshake, Leaf, Mic, Music, PenLine, PiggyBank, Puzzle, Search, Shapes, Dumbbell, Type, X } from 'lucide-react';
import type { LearningSectionData } from '../../types';

const icons = {
  globe: Globe2,
  type: Type,
  pen: PenLine,
  book: BookOpen,
  marked: BookMarked,
  puzzle: Puzzle,
  atom: Atom,
  mic: Mic,
  flask: FlaskConical,
  leaf: Leaf,
  shapes: Shapes,
  gym: Dumbbell,
  music: Music,
  bank: PiggyBank,
  heart: HeartHandshake,
  search: Search,
  drama: Drama,
};

function Flag({ country }: { country: string }) {
  if (country === 'India') {
    return (
      <svg viewBox="0 0 60 30" className="h-4 w-8 shrink-0 overflow-hidden rounded-sm ring-1 ring-ink/15" aria-hidden>
        <path fill="#ff9933" d="M0 0h60v10H0z" /><path fill="#fff" d="M0 10h60v10H0z" /><path fill="#138808" d="M0 20h60v10H0z" />
        <circle cx="30" cy="15" r="3.2" fill="none" stroke="#000080" strokeWidth="0.6" />
      </svg>
    );
  }
  if (country === 'England') {
    return (
      <svg viewBox="0 0 60 30" className="h-4 w-8 shrink-0 overflow-hidden rounded-sm ring-1 ring-ink/15" aria-hidden>
        <path fill="#fff" d="M0 0h60v30H0z" /><path fill="#ce1124" d="M26 0h8v30h-8zM0 11h60v8H0z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 60 30" className="h-4 w-8 shrink-0 overflow-hidden rounded-sm ring-1 ring-ink/15" aria-hidden>
      <path fill="#012169" d="M0 0h60v30H0z" />
      <path fill="#fff" d="M0 0l60 30M60 0L0 30" stroke="#fff" strokeWidth="8" />
      <path stroke="#c8102e" strokeWidth="4" d="M0 0l60 30M60 0L0 30" />
      <path stroke="#fff" strokeWidth="10" d="M30 0v30M0 15h60" />
      <path stroke="#c8102e" strokeWidth="6" d="M30 0v30M0 15h60" />
    </svg>
  );
}

export default function Learning({ data }: { data: LearningSectionData }) {
  const [filter, setFilter] = useState(data.filters[0] ?? 'All');
  const [open, setOpen] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const menuBox = useRef<HTMLDivElement>(null);
  const list = data.items.filter((item) => filter === 'All' || item.group === filter);
  const selected = data.items.find((item) => item.id === open) ?? null;

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (menuBox.current && !menuBox.current.contains(event.target as Node)) setMenu(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <section id={data.id} className="relative overflow-hidden bg-sage py-12 text-ink sm:py-16">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-gilt/20" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5">
        <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand">
          <span className="font-display font-normal normal-case tracking-normal text-gilt">{data.index}</span>
          <span className="mx-3 font-normal text-gilt">—</span>
          {data.eyebrow}
        </p>
        <h2 className="font-display mt-4 max-w-3xl text-4xl font-normal leading-[1.05] sm:text-5xl">{data.title}</h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">{data.lead}</p>

        <div className="reveal mt-8 rounded-2xl border border-gilt/30 bg-white/70 px-5 py-2 sm:px-7">
          <dl className="divide-y divide-gilt/25">
            {data.origins.map((row) => (
              <div key={row.country} className="grid gap-2 py-5 md:grid-cols-[170px_1fr] md:gap-6">
                <dt className="flex items-center gap-3 font-semibold text-ink"><Flag country={row.country} />{row.country}</dt>
                <dd className="text-sm leading-relaxed text-body">{row.detail}</dd>
              </div>
            ))}
          </dl>
          <p className="border-t border-gilt/25 py-4 text-xs leading-relaxed text-body">{data.origins_note}</p>
        </div>

        <div ref={menuBox} className="relative mt-8 md:hidden">
          <button type="button" aria-expanded={menu} onClick={() => setMenu((current) => !current)} className="flex min-h-12 w-full items-center justify-between rounded-2xl border border-ink/15 bg-white px-4 text-left text-sm font-semibold">
            {filter}
            <ChevronDown className={`h-4 w-4 text-brand transition-transform ${menu ? 'rotate-180' : ''}`} />
          </button>
          {menu ? (
            <ul className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-ink/10 bg-white p-2 shadow-lg">
              {data.filters.map((name) => (
                <li key={name}>
                  <button
                    type="button"
                    onClick={() => {
                      setFilter(name);
                      setMenu(false);
                    }}
                    className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${filter === name ? 'bg-ink text-paper' : 'text-ink hover:bg-brand-tint'}`}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div role="tablist" className="mt-10 hidden flex-wrap gap-2 md:flex">
          {data.filters.map((name) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={filter === name}
              onClick={() => setFilter(name)}
              className={`min-h-11 rounded-full px-5 text-sm font-semibold transition-colors ${filter === name ? 'bg-ink text-paper' : 'border border-ink/15 bg-white text-ink hover:border-brand hover:text-brand'}`}
            >
              {name}
            </button>
          ))}
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons] ?? BookOpen;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setOpen(item.id)}
                  className="group flex h-full w-full flex-col rounded-2xl border border-ink/10 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand text-white">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </span>
                    {item.origin ? <span className="rounded-full border border-gilt/50 px-2.5 py-0.5 text-xs font-semibold text-gilt">{item.origin}</span> : null}
                  </div>
                  <h3 className="font-display mt-6 text-xl text-ink">{item.name}</h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-body">{item.text}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                    {data.learn_more}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {selected ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-5" onClick={() => setOpen(null)}>
          <div className="max-h-[80vh] w-full max-w-lg overflow-auto rounded-3xl bg-paper p-7" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                {selected.origin ? <p className="text-xs font-bold uppercase tracking-[0.14em] text-gilt">{selected.origin}</p> : null}
                <h3 className="font-display mt-2 text-3xl">{selected.name}</h3>
              </div>
              <button type="button" onClick={() => setOpen(null)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-4 leading-relaxed text-body">{selected.text}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {selected.points.map((point) => (
                <li key={point} className="rounded-full bg-brand-tint px-3 py-1 text-sm text-brand">{point}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </section>
  );
}
