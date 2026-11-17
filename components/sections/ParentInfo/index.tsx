import { Bus, Clock, MessageCircle, Phone, Wallet } from 'lucide-react';
import type { ParentInfoSectionData } from '../../types';

const icons = { fees: Wallet, timings: Clock, transport: Bus };

export default function ParentInfo({ data }: { data: ParentInfoSectionData }) {
  return (
    <section id={data.id} className="bg-ivory py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <span className="inline-block rounded bg-deep px-2 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-ink">
          {data.eyebrow}
        </span>
        <h2 className="font-display mt-4 max-w-xl text-3xl font-normal leading-[1.08] text-ink sm:text-5xl">{data.title}</h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-body">{data.lead}</p>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {data.items.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons] ?? Wallet;
            return (
              <li key={item.title} className="reveal flex flex-col rounded-3xl border border-brand/15 bg-white p-6 transition-transform duration-300 hover:-translate-y-0.5 sm:p-7">
                <Icon className="h-5 w-5 text-gilt" strokeWidth={1.75} />
                <h3 className="font-display mt-4 text-2xl font-normal text-ink">{item.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-body">{item.text}</p>
                <a
                  href={data.action_href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-ink/25 px-4 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
                >
                  <MessageCircle className="h-4 w-4" /> {data.action_label}
                </a>
              </li>
            );
          })}
        </ul>
        <a href={data.phone_href} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-brand/40 px-5 text-sm font-semibold text-brand transition-colors hover:bg-brand-tint">
          <Phone className="h-4 w-4" /> {data.call_label} {data.phone}
        </a>
      </div>
    </section>
  );
}
