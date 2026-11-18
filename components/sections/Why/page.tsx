import { BedDouble, Building2, Cctv, Check, CookingPot, GraduationCap, Heart, MessageCircle, Shield, Smile, Stethoscope } from 'lucide-react';
import type { WhySectionData } from '../../types';

const icons = {
  teacher: GraduationCap,
  speech: MessageCircle,
  psed: Smile,
  care: Heart,
  campus: Building2,
  safety: Shield,
};

const facilityIcons = {
  cctv: Cctv,
  infirmary: Stethoscope,
  kitchen: CookingPot,
  rest: BedDouble,
};

export default function Why({ data }: { data: WhySectionData }) {
  return (
    <section id={data.id} className="bg-ivory py-10 sm:py-14">
      <div className="mx-auto grid max-w-7xl items-start gap-14 px-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-gilt">
            <span className="font-display font-normal normal-case tracking-normal">{data.index}</span>
            <span className="mx-3 font-normal">—</span>
            {data.eyebrow}
          </p>
          <h2 className="font-display mt-4 text-4xl font-normal leading-[1.05] text-ink sm:text-5xl">{data.title}</h2>
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-body">{data.lead}</p>
          <figure className="reveal mt-10 overflow-hidden rounded-[2rem] rounded-tr-[5rem] bg-brand-tint p-3">
            <img src={data.image} alt={data.image_alt} className="mx-auto aspect-square w-full max-w-[320px] rounded-[1.5rem] object-cover" />
          </figure>
        </div>
        <ul className="grid gap-x-10 sm:grid-cols-2">
          {data.items.map((item, index) => {
            const Icon = icons[item.icon as keyof typeof icons] ?? GraduationCap;
            return (
              <li key={item.title} className="why-card reveal border-t-2 border-gilt/30 py-8" style={{ transitionDelay: `${(index % 2) * 90}ms` }}>
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-tint text-brand">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <span className="text-xs font-semibold text-gilt">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-display mt-4 text-[1.35rem] font-normal leading-snug text-ink">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-body">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div id={data.safety.id} className="reveal mx-auto mt-20 max-w-7xl px-5">
        <div className="overflow-hidden rounded-[2rem] border border-ink/10 bg-deep-2 p-6 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="eyebrow">{data.safety.eyebrow}</p>
              <h3 className="font-display mt-3 text-3xl leading-tight text-ink sm:text-4xl">
                {data.safety.title} <span className="italic text-brand">{data.safety.title_highlight}</span>
              </h3>
              <p className="mt-4 max-w-xl leading-relaxed text-body">{data.safety.lead}</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {data.safety.facilities.map((item) => {
                  const Icon = facilityIcons[item.icon as keyof typeof facilityIcons] ?? Shield;
                  return (
                    <li key={item.title} className="rounded-2xl bg-paper p-5">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-tint text-brand">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <p className="mt-4 font-semibold text-ink">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-body">{item.text}</p>
                    </li>
                  );
                })}
              </ul>
              <dl className="mt-8 grid grid-cols-3 gap-3 border-t border-ink/10 pt-6">
                {data.safety.areas.map((area) => (
                  <div key={area.label}>
                    <dt className="sr-only">{area.label}</dt>
                    <dd>
                      <span className="font-display block text-2xl text-ink sm:text-3xl">{area.value}</span>
                      <span className="text-xs text-body sm:text-sm">{area.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="flex flex-col gap-5">
              <img src={data.safety.image} alt={data.safety.image_alt} className="mx-auto aspect-square w-full max-w-[320px] rounded-[1.5rem] object-cover" />
              <div className="rounded-2xl bg-paper p-6">
                <p className="font-display text-xl text-ink">{data.safety.ask_title}</p>
                <ul className="mt-4 space-y-3">
                  {data.safety.ask.map((question) => (
                    <li key={question} className="flex gap-3 text-sm leading-relaxed text-body">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                      {question}
                    </li>
                  ))}
                </ul>
                <a href={data.safety.button_href} className="btn-lift mt-5 inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-bold text-paper hover:bg-brand">
                  {data.safety.button}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
