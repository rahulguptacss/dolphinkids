'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Check, ChevronDown, Play, School, ShieldCheck, Sun } from 'lucide-react';
import { sections } from '../../types';
import ParentInfo from '../ParentInfo/page';

function ArrangementSelect({ options, placeholder }: { options: string[]; placeholder: string }) {
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
      <input name="arrangement" value={value} required readOnly className="sr-only" tabIndex={-1} />
      <button type="button" aria-expanded={open} onClick={() => setOpen((current) => !current)} className="flex min-h-12 w-full items-center justify-between rounded-xl border border-ink/15 bg-white px-4 text-left text-[15px]">
        <span className={value ? 'text-ink' : 'text-body'}>{value || placeholder}</span>
        <ChevronDown className={`h-4 w-4 text-brand transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open ? (
        <ul className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-ink/10 bg-white p-2 shadow-lg">
          {options.map((option) => (
            <li key={option}>
              <button type="button" onClick={() => { setValue(option); setOpen(false); }} className={`w-full rounded-xl px-3 py-2.5 text-left text-sm ${value === option ? 'bg-brand text-white' : 'hover:bg-brand-tint'}`}>
                {option}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

const data = sections.daycarePage;

export default function DayCarePage() {
  const [tour, setTour] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <div>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <p className="text-sm text-body">
            <a href={data.crumbs[0].href} className="hover:text-brand">{data.crumbs[0].label}</a>
            <span className="mx-2">/</span>
            {data.crumbs[1].label}
          </p>
          <p className="eyebrow mt-8">{data.eyebrow}</p>
          <h1 className="font-display mt-5 text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.02]">
            {data.title_line} <span className="italic text-brand">{data.title_highlight}</span> {data.title_rest}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">{data.lead}</p>
          <ul className="mt-7 grid max-w-xl grid-cols-2 gap-x-5 gap-y-2 text-sm">
            {data.points.map((point) => (
              <li key={point} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gilt" />{point}</li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={data.explore_href} className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-ink px-7 text-sm font-bold text-paper hover:bg-brand">{data.explore_label} <ArrowDown className="h-4 w-4" /></a>
            <a href={data.enquire_href} className="inline-flex min-h-[52px] items-center rounded-full bg-brand px-7 text-sm font-bold text-paper hover:bg-brand-strong">{data.enquire_label}</a>
          </div>
        </div>
        <div className="grid grid-cols-5 grid-rows-6 gap-3" style={{ height: 'min(560px, 110vw)' }}>
          <img src={data.images[0].src} alt={data.images[0].alt} className="col-span-3 row-span-4 h-full w-full rounded-[1.75rem] object-cover" />
          <img src={data.images[1].src} alt={data.images[1].alt} className="col-span-2 row-span-3 h-full w-full rounded-[1.75rem] object-cover" />
          <button type="button" onClick={() => setTour(true)} className="group relative col-span-2 row-span-3 overflow-hidden rounded-[1.75rem] bg-ink text-left">
            <img src={data.tour_poster} alt="" className="h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 flex flex-col justify-end p-4 text-paper">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-paper text-ink"><Play className="ml-0.5 h-4 w-4" fill="currentColor" /></span>
              <span className="mt-2 font-display text-lg leading-tight">{data.tour_title}</span>
            </span>
          </button>
          <div className="col-span-3 row-span-2 flex items-center gap-4 rounded-[1.75rem] bg-deep p-5">
            <p className="font-display text-4xl sm:text-5xl">{data.stat_value}</p>
            <p className="text-sm leading-snug text-body">{data.stat_text}</p>
          </div>
        </div>
      </section>

      {tour ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/70 p-5" onClick={() => setTour(false)}>
          <video src={data.tour_video} controls autoPlay className="max-h-[80vh] w-full max-w-4xl rounded-2xl bg-ink" onClick={(event) => event.stopPropagation()} />
        </div>
      ) : null}

      <section id="arrangements" className="scroll-mt-28 bg-brand-tint py-20">
        <div className="mx-auto max-w-7xl px-5">
          <p className="eyebrow">{data.arrange_eyebrow}</p>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl">{data.arrange_title}</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl bg-white p-8 sm:p-10">
              <Sun className="h-9 w-9 text-brand" strokeWidth={1.4} />
              <h3 className="font-display mt-6 text-3xl">{data.main_title}</h3>
              <p className="mt-3 text-body">{data.main_text}</p>
              <p className="mt-5 text-sm text-body">{data.main_note}</p>
              <a href={data.whatsapp_href} target="_blank" rel="noreferrer" className="btn-lift mt-7 inline-flex min-h-12 items-center rounded-full bg-brand px-6 text-sm font-semibold text-white">{data.main_button}</a>
            </article>
            <article id="extended" className="scroll-mt-28 rounded-3xl bg-deep p-8 sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <School className="h-9 w-9" strokeWidth={1.4} />
                <span className="rounded-full border border-gilt/50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-gilt-ink">{data.extended_badge}</span>
              </div>
              <h3 className="font-display mt-6 text-3xl">{data.extended_title}</h3>
              <p className="mt-2 font-display text-xl italic text-brand">{data.extended_highlight}</p>
              <p className="mt-4 text-body">{data.extended_text}</p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {data.extended_points.map((point) => <li key={point} className="flex gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />{point}</li>)}
              </ul>
              <a href="#enquiry" className="mt-8 inline-flex min-h-12 items-center rounded-full border border-ink/25 px-6 text-sm font-semibold hover:border-brand hover:text-brand">{data.extended_button}</a>
            </article>
          </div>
        </div>
      </section>

      <section id="activities" className="scroll-mt-28 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <p className="eyebrow">{data.activities_eyebrow}</p>
          <h2 className="font-display mt-4 max-w-3xl text-4xl sm:text-5xl">{data.activities_title}</h2>
          <p className="mt-4 max-w-2xl text-lg text-body">{data.activities_lead}</p>
          <ol className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {data.activities.map((item, index) => (
              <li key={item.title} className={`group ${index === 0 ? 'lg:col-span-2' : ''}`}>
                <div className={`overflow-hidden rounded-[1.5rem] ${index === 0 ? 'aspect-[16/8]' : 'aspect-[4/3]'}`}>
                  <img src={item.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <p className="mt-5 font-display text-lg text-gilt">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="font-display mt-2 text-2xl">{item.title}</h3>
                <p className="mt-2 text-body">{item.text}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand">{data.builds_label}: {item.builds}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-xs text-body">{data.activities_note}</p>
        </div>
      </section>

      <section id="infrastructure" className="scroll-mt-28 bg-deep py-20">
        <div className="mx-auto max-w-7xl px-5">
          <p className="eyebrow">{data.infra_eyebrow}</p>
          <h2 className="font-display mt-4 max-w-3xl text-4xl sm:text-5xl">{data.infra_title}</h2>
          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-ink/10 md:grid-cols-5">
            {data.stats.map((stat) => (
              <div key={stat.label} className="bg-paper p-6">
                <dd className="font-display text-3xl">{stat.value} <span className="text-base text-body">{stat.unit}</span></dd>
                <dt className="mt-1 text-sm text-body">{stat.label}</dt>
              </div>
            ))}
          </dl>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.care.map((item) => (
              <div key={item.title} className="border-t border-ink/15 pt-5">
                <h3 className="font-display text-xl">{item.title}</h3>
                <p className="mt-2 text-body">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {data.gallery.map((src) => <img key={src} src={src} alt={data.gallery_alt} className="aspect-square w-full rounded-2xl object-cover" />)}
          </div>
        </div>
      </section>

      <ParentInfo data={sections.parentInfo} />

      <section id="enquiry" className="scroll-mt-28 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">{data.form_eyebrow}</p>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">{data.form_title}</h2>
            <p className="mt-5 text-lg text-body">{data.form_lead}</p>
            <a href={data.phone_href} className="mt-6 inline-flex min-h-11 items-center font-semibold">{data.call_label} {data.phone}</a>
            <a href={data.brochure_href} download className="mt-2 flex min-h-11 items-center font-semibold text-brand underline underline-offset-4">{data.brochure_label}</a>
          </div>
          <form className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm sm:p-8" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
            {sent ? <p className="text-brand">{data.success_message}</p> : (
              <>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">{data.card_kicker}</p>
                <h3 className="font-display mt-2 text-3xl">{data.card_title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{data.card_text}</p>
                <p className="mt-2 text-xs text-body">{data.card_note}</p>
                {['1', '2'].map((group) => (
                  <div key={group}>
                    <p className={`${group === '1' ? 'mt-6 border-t border-ink/10 pt-5' : 'mt-6'} text-sm font-semibold text-brand`}>{group} {group === '1' ? data.contact_title : data.needs_title}</p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {data.fields.filter((field) => field.group === group && (group === '1' || ['child', 'age', 'school'].includes(field.name))).map((field) => (
                        <label key={field.name} className={`text-sm font-semibold ${field.wide ? 'sm:col-span-2' : ''}`}>
                          {field.label}{field.required ? ' *' : ''}
                          <input name={field.name} type={field.type || 'text'} required={field.required} placeholder={field.placeholder} className="field mt-1" />
                        </label>
                      ))}
                      {group === '2' ? (
                        <label className="text-sm font-semibold sm:col-span-2">{data.arrangement_label} *
                          <ArrangementSelect options={data.arrangements} placeholder={data.arrangement_placeholder} />
                        </label>
                      ) : null}
                      {data.fields.filter((field) => field.group === '2' && group === '2' && !['child', 'age', 'school'].includes(field.name)).map((field) => (
                        <label key={field.name} className={`text-sm font-semibold ${field.wide ? 'sm:col-span-2' : ''}`}>
                          {field.label}{field.required ? ' *' : ''}
                          {field.type === 'textarea' ? (
                            <textarea name={field.name} rows={4} required={field.required} placeholder={field.placeholder} className="field mt-1 h-auto py-3" />
                          ) : (
                            <input name={field.name} type={field.type || 'text'} required={field.required} placeholder={field.placeholder} className="field mt-1" />
                          )}
                          {field.hint ? <span className="mt-1 block text-xs font-normal text-body">{field.hint}</span> : null}
                        </label>
                      ))}
                      {group === '2' ? <label className="flex items-start gap-2 text-sm font-normal sm:col-span-2"><input required type="checkbox" className="mt-1" /> {data.consent}</label> : null}
                    </div>
                  </div>
                ))}
                <p className="mt-4 text-sm text-body">{data.next_note}</p>
                <button type="submit" className="btn-lift mt-4 min-h-12 rounded-full bg-ink px-6 text-sm font-semibold text-paper hover:bg-brand">{data.submit_text}</button>
                <p className="mt-3 flex items-center gap-2 text-xs text-body"><ShieldCheck className="h-4 w-4 text-brand" /> {data.privacy_note}</p>
              </>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
