import { Drama, Footprints, Guitar, Mic2, Music, Palette, PenTool, Trophy } from 'lucide-react';
import type { ActivitiesSectionData } from '../../types';

const icons = {
  dance: Footprints,
  acting: Drama,
  theatre: Mic2,
  music: Music,
  instruments: Guitar,
  sports: Trophy,
  calligraphy: PenTool,
  arts: Palette,
};

export default function Activities({ data }: { data: ActivitiesSectionData }) {
  return (
    <section id={data.id} className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:py-28 lg:grid-cols-2">
      <div>
        <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand">
          <span className="font-display font-normal normal-case tracking-normal text-gilt">{data.index}</span>
          <span className="mx-3 font-normal text-gilt">—</span>
          {data.eyebrow}
        </p>
        <h2 className="font-display mt-4 text-4xl font-normal leading-[1.05] sm:text-5xl">{data.title}</h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-body">{data.lead}</p>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {data.items.map((item, index) => {
            const Icon = icons[item.icon as keyof typeof icons] ?? Music;
            return (
              <li
                key={item.name}
                className="reveal flex flex-col items-center gap-2 rounded-2xl border border-ink/10 bg-white px-3 py-5 text-center transition-transform duration-300 hover:-translate-y-1 hover:border-brand"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <Icon className="h-6 w-6 text-brand" strokeWidth={1.5} />
                <span className="text-sm font-semibold text-ink">{item.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <figure className="reveal relative pb-8">
        <img src={data.image} alt={data.image_alt} className="aspect-[5/6] w-full rounded-[2rem] object-cover" />
        <div className="absolute -bottom-2 -left-1 max-w-[240px] rounded-2xl bg-deep p-5 sm:-left-6">
          <p className="font-display text-lg leading-snug text-ink">{data.caption}</p>
        </div>
      </figure>
    </section>
  );
}
