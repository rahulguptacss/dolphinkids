'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Download, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import type { EnquireField, EnquireSectionData } from '../../types';

function ProgrammeSelect({ item }: { item: EnquireField }) {
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
      <input type="text" name={item.name} value={value} required={item.required} readOnly className="sr-only" tabIndex={-1} />
      <button
        type="button"
        id={item.name}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex min-h-12 w-full items-center justify-between rounded-2xl border border-ink/15 bg-white px-4 text-left text-[15px] shadow-sm"
      >
        <span className={value ? 'font-semibold text-ink' : 'text-body'}>{value || 'Choose a programme'}</span>
        <ChevronDown className={`h-4 w-4 text-brand transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-ink/10 bg-white p-2 shadow-[0_18px_40px_-24px_rgba(40,52,96,0.35)]">
          {item.options?.map((option) => (
            <li key={option}>
              <button
                type="button"
                onClick={() => {
                  setValue(option);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm ${value === option ? 'bg-brand text-paper' : 'text-ink hover:bg-brand-tint'}`}
              >
                {option}
                {value === option && <Check className="h-4 w-4" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const actionClass = {
  solid: 'bg-brand text-paper hover:bg-brand-strong',
  tint: 'border border-brand/35 bg-brand-tint text-brand hover:bg-white',
  outline: 'border border-ink/25 text-ink hover:border-brand hover:text-brand',
};

export default function Enquire({ data }: { data: EnquireSectionData }) {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  const field = (item: EnquireField) => {
    const common = 'field mt-1';
    if (item.type === 'textarea') {
      return <textarea id={item.name} name={item.name} required={item.required} placeholder={item.placeholder} className={`${common} min-h-28 py-3`} />;
    }
    if (item.type === 'select') return <ProgrammeSelect item={item} />;
    return <input id={item.name} name={item.name} type={item.type} required={item.required} placeholder={item.placeholder} className={common} />;
  };

  return (
    <section className="px-5 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-paper ring-1 ring-ink/10 lg:grid-cols-[1.2fr_1fr]">
        <div className="p-8 sm:p-14">
          <p className="eyebrow">
            <span className="font-display text-base normal-case tracking-normal text-gilt">{data.index}</span> {data.eyebrow}
          </p>
          <h2 className="font-display mt-4 text-4xl font-normal leading-[1.05] sm:text-6xl">{data.title}</h2>
          <p className="mt-5 max-w-lg text-lg text-body">{data.lead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            {data.actions.map((action) => (
              <a key={action.name} href={action.href} className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold ${actionClass[action.style as keyof typeof actionClass]}`}>
                {action.style === 'tint' && <Download className="h-4 w-4" />}
                {action.style === 'outline' && <MessageCircle className="h-4 w-4" />}
                {action.name}
              </a>
            ))}
          </div>
          <div id={data.id} className="mt-10">
            {sent ? (
              <div className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-9">
                <h3 className="font-display text-3xl">{data.success_title}</h3>
                <p className="mt-3 text-body">{data.success_message}</p>
                <p className="mt-3 text-sm text-body">{data.next_note}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="rounded-3xl bg-white p-5 ring-1 ring-ink/10 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">{data.form_kicker}</p>
                <h3 className="font-display mt-2 text-3xl">{data.form_title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">{data.form_text}</p>
                <p className="mt-4 text-xs text-body"><span className="font-semibold text-brand">*</span> {data.form_note}</p>
                <div className="mt-7 space-y-7">
                  {data.groups.map((group, index) => (
                    <fieldset key={group.title}>
                      <legend className="mb-4 flex items-center gap-2 text-sm font-bold">
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-brand/10 text-xs text-brand">{index + 1}</span>
                        {group.title}
                      </legend>
                      <div className="grid gap-5 md:grid-cols-2">
                        {group.fields.map((item) => (
                          <div key={item.name} className={item.wide || item.type === 'textarea' || item.type === 'select' ? 'md:col-span-2' : ''}>
                            <label htmlFor={item.name} className="text-sm font-bold">
                              {item.label}
                              {item.required ? <span className="text-brand"> *</span> : <span className="font-normal text-body"> (optional)</span>}
                            </label>
                            {field(item)}
                            {item.hint && <p className="mt-2 text-xs text-body">{item.hint}</p>}
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  ))}
                </div>
                <label className="mt-7 flex items-start gap-3 rounded-2xl border border-ink/10 bg-paper p-4 text-sm leading-relaxed text-body">
                  <input type="checkbox" required className="mt-1 h-5 w-5 accent-[hsl(332_54%_37%)]" />
                  <span>{data.consent} <span className="font-semibold text-brand">(Required)</span></span>
                </label>
                <p className="mt-6 text-xs leading-relaxed text-body">{data.next_note}</p>
                <button type="submit" className="mt-4 inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-ink px-5 text-sm font-bold text-paper hover:bg-brand">{data.submit_text}</button>
                <p className="mt-4 inline-flex items-start gap-2 text-xs text-body"><ShieldCheck className="h-4 w-4 shrink-0 text-brand" />{data.privacy_note}</p>
              </form>
            )}
          </div>
          <a href={data.phone_href} className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold">
            <Phone className="h-4 w-4 text-brand" /> {data.phone_line} {data.phone}
          </a>
        </div>
        <img src={data.image} alt={data.image_alt} className="h-full min-h-[280px] w-full object-cover" />
      </div>
    </section>
  );
}
