'use client';

import { useState } from 'react';
import { Check, ChevronDown, FileDown, MessageCircle, Phone } from 'lucide-react';
import type { ProcessSectionData } from '../../types';

export default function Process({ data }: { data: ProcessSectionData }) {
  const [open, setOpen] = useState(0);

  return (
    <section id={data.id} className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="text-sm font-semibold tracking-wide text-gilt-ink">
          {data.index} <span className="mx-2 text-gilt">—</span>
          <span className="rounded bg-gilt px-2 py-0.5 text-[11px] font-bold tracking-[0.14em] text-white">{data.eyebrow.toUpperCase()}</span>
          <span className="ml-2 text-brand">· {data.scope.toUpperCase()}</span>
        </p>
        <h2 className="font-display mt-4 max-w-4xl text-4xl font-normal leading-[1.08] text-ink sm:text-5xl">{data.title}</h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">{data.lead}</p>
        <p className="mt-5 rounded-xl border border-brand/15 bg-brand-tint p-4 text-sm text-ink">
          <strong>This process applies to Nursery through Grade 2 only.</strong> {data.notice.replace('This process applies to Nursery through Grade 2 only. ', '')}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {data.actions.map((action) => (
            <a
              key={action.name}
              href={action.href}
              className={
                action.style === 'solid'
                  ? 'inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-paper'
                  : action.style === 'outline'
                    ? 'inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/25 px-6 text-sm font-semibold text-ink hover:border-brand hover:text-brand'
                    : 'inline-flex min-h-12 items-center gap-2 px-2 text-sm font-semibold text-brand'
              }
            >
              {action.style === 'solid' && <MessageCircle className="h-4 w-4" />}
              {action.style === 'outline' && <Phone className="h-4 w-4" />}
              {action.style === 'link' && <FileDown className="h-4 w-4" />}
              {action.name}
            </a>
          ))}
        </div>
        <p className="mt-3 text-sm text-body">{data.action_note}</p>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
          <div>
            <h3 className="font-display text-2xl text-ink">{data.steps_title}</h3>
            <ol className="relative mt-6 space-y-3 before:absolute before:bottom-4 before:left-[21px] before:top-4 before:w-px before:bg-gilt/40">
              {data.steps.map((step, index) => {
                const isOpen = open === index;
                return (
                  <li key={step.title} className="relative">
                    <button type="button" onClick={() => setOpen(isOpen ? -1 : index)} aria-expanded={isOpen} className="flex w-full items-center gap-4 rounded-xl py-2 pr-2 text-left">
                      <span className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border font-display text-lg ${isOpen ? 'border-brand bg-brand text-paper' : 'border-gilt/50 bg-paper text-gilt-ink'}`}>{index + 1}</span>
                      <span className="flex-1 font-semibold text-ink">{step.title}</span>
                      <ChevronDown className={`h-5 w-5 text-body transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="ml-[60px] rounded-2xl border border-ink/10 bg-white/70 p-5">
                        <p className="leading-relaxed text-body">{step.intro}</p>
                        <ul className="mt-3 space-y-2">
                          {step.points.map((point) => (
                            <li key={point} className="flex gap-2.5 text-sm text-ink"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />{point}</li>
                          ))}
                        </ul>
                        {step.note && <p className="mt-4 border-l-2 border-gilt pl-3 text-sm italic text-body">{step.note}</p>}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="space-y-8">
            <div className="rounded-2xl bg-deep-2 p-6 sm:p-8">
              <p className="eyebrow">{data.checklist_kicker}</p>
              <h3 className="font-display mt-2 text-2xl">{data.checklist_title}</h3>
              <ul className="mt-5 divide-y divide-ink/10">
                {data.documents.map((document) => (
                  <li key={document.name} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between">
                    <span className="font-medium text-ink">{document.name}</span>
                    <span className="text-sm text-gilt-ink sm:text-right">{document.detail}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-body">{data.checklist_note}</p>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-white/70 p-6 sm:p-8">
              <p className="eyebrow">{data.age_kicker}</p>
              <h3 className="font-display mt-2 text-2xl">{data.age_title}</h3>
              <p className="mt-2 text-sm text-body">{data.age_text}</p>
              <dl className="mt-4 grid gap-2 sm:grid-cols-2">
                {data.ages.map((item) => (
                  <div key={item.name} className="rounded-xl bg-paper px-4 py-3">
                    <dt className="text-sm text-body">{item.name}</dt>
                    <dd className="font-display text-lg text-ink">{item.age}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs leading-relaxed text-body">{data.age_note}</p>
            </div>
          </div>
        </div>

        <div className="mt-14 rounded-2xl bg-deep p-6 sm:p-10">
          <p className="eyebrow">{data.guidelines_kicker}</p>
          <h3 className="font-display mt-2 text-2xl">{data.guidelines_title}</h3>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {data.guidelines.map((item) => (
              <li key={item} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gilt" />{item}</li>
            ))}
          </ul>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-ink/10 pt-10 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-2xl sm:text-3xl">{data.closing_title}</p>
            <p className="mt-1 text-sm text-body">{data.closing_text}</p>
          </div>
          <a href={data.closing_href} className="inline-flex min-h-12 items-center rounded-full border border-ink/25 px-6 text-sm font-semibold hover:border-brand hover:text-brand">{data.closing_button}</a>
        </div>
      </div>
    </section>
  );
}
