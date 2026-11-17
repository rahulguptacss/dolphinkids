import { Award, Compass, Heart, Lightbulb, Target, type LucideIcon } from 'lucide-react';
import type { AboutSectionData } from '../../types';

const icons: Record<string, LucideIcon> = {
  compass: Compass,
  target: Target,
  lightbulb: Lightbulb,
  award: Award,
  heart: Heart,
};

export default function About({ data }: { data: AboutSectionData }) {
  return (
    <section id={data.id} className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow"><span className="font-display normal-case tracking-normal text-gilt">{data.index}</span> {data.eyebrow}</p>
          <h2 className="font-display mt-4 text-3xl font-normal leading-[1.08] text-ink sm:text-5xl">{data.title}</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-body">
            {data.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <p className="font-display text-xl text-ink">{data.closing}</p>
          </div>
        </div>
        <figure className="rounded-[2rem] rounded-bl-[5rem] bg-brand-tint p-4 lg:sticky lg:top-36 lg:h-fit">
          <img src={data.image} alt={data.image_alt} className="aspect-square w-full rounded-xl object-cover" />
          <figcaption className="mt-3 flex justify-between px-1 text-sm text-body">
            <span>{data.image_caption}</span>
            <span className="font-display text-gilt-ink">{data.image_year}</span>
          </figcaption>
        </figure>
      </div>
      <ul className="mt-16 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
        {data.pillars.map((pillar) => {
          const Icon = icons[pillar.icon] ?? Compass;
          return (
            <li key={pillar.title} className="border-t border-ink/12 py-8">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-brand">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <h3 className="font-display mt-5 text-2xl font-normal leading-snug text-ink">{pillar.title}</h3>
              <p className="mt-3 leading-relaxed text-body">{pillar.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
