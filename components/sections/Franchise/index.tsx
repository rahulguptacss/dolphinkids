'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Award, Baby, Briefcase, Check, ChevronDown, Download, Home, Landmark, MessageCircle, Minus, Plus, School, X } from 'lucide-react';
import type { FranchiseSectionData } from '../../types';

const icons = { award: Award, case: Briefcase, home: Home, baby: Baby, school: School, landmark: Landmark };

function FormatSelect({ options }: { options: string[] }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (box.current && !box.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div ref={box} className="relative mt-1">
      <input type="text" name="format" value={value} required readOnly className="sr-only" tabIndex={-1} />
      <button type="button" aria-expanded={open} onClick={() => setOpen((current) => !current)} className="flex min-h-12 w-full items-center justify-between rounded-2xl border border-ink/15 bg-white px-4 text-left text-[15px]">
        <span className={value ? 'font-semibold text-ink' : 'text-body'}>{value || 'Please select'}</span>
        <ChevronDown className={`h-4 w-4 text-brand transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open ? (
        <ul className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-ink/10 bg-white p-2 shadow-[0_18px_40px_-24px_rgba(40,52,96,0.35)]">
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                onClick={() => {
                  setValue(option);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm ${value === option ? 'bg-brand text-white' : 'text-ink hover:bg-brand-tint'}`}
              >
                {option}
                {value === option ? <Check className="h-4 w-4" /> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function Franchise({ data }: { data: FranchiseSectionData }) {
  const [open, setOpen] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const model = data.models.find((item) => item.id === selected) ?? null;

  return (
    <section id={data.id} className="bg-[#fbf6f1] py-20 text-ink sm:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <p className="reveal inline-flex rounded-full border border-gilt/50 px-4 py-1.5 text-xs font-bold tracking-[0.16em] text-gilt-ink">{data.badge}</p>
        <p className="reveal mt-8 text-[12px] font-bold uppercase tracking-[0.18em] text-brand">
          <span className="font-display font-normal normal-case tracking-normal text-gilt">{data.index}</span>
          <span className="mx-3 font-normal text-gilt">—</span>
          {data.eyebrow}
        </p>
        <h2 className="reveal font-display mt-4 max-w-3xl text-4xl font-normal leading-[1.05] sm:text-5xl">{data.title}</h2>
        <p className="reveal mt-5 max-w-3xl text-lg leading-relaxed text-body">{data.lead}</p>
        <p className="reveal mt-4 max-w-3xl text-sm leading-relaxed text-body">{data.disclaimer}</p>

        <dl className="mt-10 grid gap-4 sm:grid-cols-3">
          {data.targets.map((item) => (
            <div key={item.label} className="reveal rounded-2xl border border-brand/15 bg-paper p-6">
              <dt className="text-sm font-semibold text-body">{item.label}</dt>
              <dd className="font-display mt-3 text-4xl text-brand">{item.value}</dd>
              <p className="mt-2 text-sm text-body">{item.note}</p>
            </div>
          ))}
        </dl>
        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-body">{data.targets_note}</p>

        <div className="mt-20">
          <p className="eyebrow">{data.reasons_eyebrow}</p>
          <h3 className="font-display mt-3 text-3xl sm:text-4xl">{data.reasons_title}</h3>
          <ol className="mt-8 divide-y divide-brand/15 overflow-hidden rounded-2xl border border-brand/15 bg-paper">
            {data.reasons.map((reason) => {
              const isOpen = open === reason.n;
              return (
                <li key={reason.n}>
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : reason.n)} className="flex min-h-16 w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-brand-tint sm:px-7">
                    <span className="font-display text-xl text-gilt">{reason.n}</span>
                    <span className="flex-1 text-base font-semibold sm:text-lg">{reason.title}</span>
                    {isOpen ? <Minus className="h-5 w-5 text-brand" /> : <Plus className="h-5 w-5 text-brand" />}
                  </button>
                  <div className={`grid transition-[grid-template-rows,opacity] duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <ul className="space-y-3 overflow-hidden px-5 pb-6 pl-14 sm:px-7">
                      {reason.points.map((point) => (
                        <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-body"><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-700" />{point}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ol>
          <dl className="mt-6 grid gap-3 sm:grid-cols-3">
            {data.terms.map((term) => (
              <div key={term.label} className="rounded-2xl border border-gilt/40 bg-paper p-5">
                <dt className="text-sm font-semibold text-body">{term.label}</dt>
                <dd className="font-display mt-2 text-3xl text-brand">{term.value}</dd>
                <p className="mt-1 text-sm text-body">{term.note}</p>
              </div>
            ))}
          </dl>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-body">{data.terms_note}</p>
        </div>

        <div className="mt-20">
          <p className="eyebrow">{data.support_eyebrow}</p>
          <h3 className="font-display mt-3 text-3xl sm:text-4xl">{data.support_title}</h3>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {data.support.map((item, index) => (
              <li key={item} className="flex gap-3 rounded-2xl border border-brand/15 bg-paper p-5 transition-transform duration-300 hover:-translate-y-0.5">
                <span className="font-display text-lg text-gilt">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-[15px] font-medium leading-snug">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-body">{data.support_note}</p>
        </div>

        <div className="mt-20">
          <p className="eyebrow">{data.models_eyebrow}</p>
          <h3 className="font-display mt-3 text-3xl sm:text-4xl">{data.models_title}</h3>
          <p className="mt-3 max-w-3xl text-body">{data.models_lead}</p>
        </div>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-brand/10 sm:grid-cols-2 lg:grid-cols-3">
          {data.models.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons] ?? Award;
            return (
              <li key={item.id} className="bg-[#fbf6f1]">
                <button type="button" onClick={() => setSelected(item.id)} className="group flex h-full w-full flex-col p-8 text-left transition-colors hover:bg-white">
                  <Icon className="h-8 w-8 text-gilt" strokeWidth={1.3} />
                  <h3 className="font-display mt-6 text-2xl">{item.title}</h3>
                  <p className="mt-2 flex-1 text-body">{item.text}</p>
                  {item.fee ? (
                    <div className="mt-5 border-t border-brand/15 pt-4">
                      <p className="text-xs font-semibold text-body">{item.fee_label}</p>
                      <p className="mt-1 text-lg font-bold text-brand">{item.fee}</p>
                      <p className="mt-2 text-sm text-body">{item.fee_note}</p>
                    </div>
                  ) : null}
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand">{data.view_label} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {data.projects.map((project) => (
            <div key={project.title} className="rounded-2xl border border-dashed border-brand/30 bg-paper p-6">
              <p className="text-xs font-bold tracking-[0.16em] text-gilt-ink">{data.projects_kicker}</p>
              <h4 className="font-display mt-2 text-2xl">{project.title}</h4>
              <p className="mt-2 text-body">{project.text}</p>
              <p className="mt-4 text-lg font-bold text-brand">{project.value}</p>
              <p className="mt-1 text-sm text-body">{project.note}</p>
              <a href={data.discuss_href} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/25 px-5 text-sm font-semibold transition-colors hover:border-brand hover:text-brand">
                <MessageCircle className="h-4 w-4" /> {data.discuss_label}
              </a>
            </div>
          ))}
        </div>

        <details className="mt-12 rounded-2xl border border-brand/20 bg-paper p-6 sm:p-8">
          <summary className="cursor-pointer font-display text-2xl">{data.budget_title}</summary>
          <p className="mt-3 text-sm text-body">{data.budget_text}</p>
        </details>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href={data.whatsapp_href} target="_blank" rel="noreferrer" className="btn-lift inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-strong">
            <MessageCircle className="h-4 w-4" /> {data.whatsapp_label}
          </a>
          <a href={data.brochure_href} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-brand/35 bg-paper px-6 text-sm font-semibold text-brand transition-colors hover:bg-brand-tint">
            <Download className="h-4 w-4" /> {data.brochure_label}
          </a>
        </div>

        <form
          className="mt-8 max-w-3xl rounded-3xl border border-ink/10 bg-paper p-6 sm:p-8"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">{data.form_kicker}</p>
          <h3 className="font-display mt-2 text-3xl">{data.form_title}</h3>
          <p className="mt-2 text-body">{data.form_lead}</p>
          <p className="mt-2 text-sm text-body">{data.form_note}</p>
          {sent ? (
            <p className="mt-6 rounded-2xl bg-brand-tint p-4 text-brand">Thank you. Your franchise enquiry is noted.</p>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold">Full name *<input required name="name" className="field mt-1" /></label>
              <label className="text-sm font-semibold">Contact number *<input required name="phone" className="field mt-1" placeholder="10-digit mobile" /></label>
              <label className="text-sm font-semibold sm:col-span-2">Email *<input required type="email" name="email" className="field mt-1" /></label>
              <p className="sm:col-span-2 text-sm font-semibold text-brand">Your proposed school</p>
              <label className="text-sm font-semibold">City *<input required name="city" className="field mt-1" /></label>
              <label className="text-sm font-semibold">State *<input required name="state" className="field mt-1" /></label>
              <label className="text-sm font-semibold sm:col-span-2">Franchise format of interest *
                <FormatSelect options={data.models.map((item) => item.title)} />
              </label>
              <label className="text-sm font-semibold sm:col-span-2">Approximate investment capacity (optional)<input name="capacity" className="field mt-1" placeholder="A range, or Not yet decided" /></label>
              <label className="flex items-start gap-2 text-sm sm:col-span-2"><input required type="checkbox" className="mt-1" /> {data.consent}</label>
              <p className="text-sm text-body sm:col-span-2">{data.form_footer}</p>
              <button type="submit" className="btn-lift min-h-12 w-fit rounded-full bg-ink px-6 text-sm font-semibold text-paper hover:bg-brand">{data.submit_text}</button>
            </div>
          )}
        </form>
        <p className="mt-4 max-w-3xl text-sm text-body">{data.footnote}</p>
      </div>

      {model ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-5" onClick={() => setSelected(null)}>
          <div className="max-h-[80vh] w-full max-w-lg overflow-auto rounded-3xl bg-paper p-7" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-3xl">{model.title}</h3>
              <button type="button" onClick={() => setSelected(null)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5" aria-label="Close"><X className="h-5 w-5" /></button>
            </div>
            <p className="mt-3 text-body">{model.text}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {model.points.map((point) => <li key={point} className="rounded-full bg-brand-tint px-3 py-1 text-sm text-brand">{point}</li>)}
            </ul>
            {model.fee ? <p className="mt-4 text-lg font-bold text-brand">{model.fee}</p> : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
