import type { CampusSectionData } from '../../types';

export default function Campus({ data }: { data: CampusSectionData }) {
  return (
    <section id={data.id} className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
      <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand">
        <span className="font-display font-normal normal-case tracking-normal text-gilt">{data.index}</span>
        <span className="mx-3 font-normal text-gilt">—</span>
        {data.eyebrow}
      </p>
      <h2 className="font-display mt-4 max-w-3xl text-4xl font-normal leading-[1.05] sm:text-5xl">{data.title}</h2>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-body">{data.lead}</p>
      <dl className="mt-10 grid gap-4 sm:grid-cols-2">
        {data.stats.map((stat, index) => (
          <div key={stat.label} className={`rounded-2xl border p-6 sm:p-8 ${index === 0 ? 'border-brand/10 bg-brand/5' : 'border-gilt/20 bg-gilt/10'}`}>
            <dt className="text-base font-semibold text-ink">{stat.label}</dt>
            <dd className="font-display mt-3 text-4xl text-brand sm:text-5xl">
              {stat.value} <span className="text-xl sm:text-2xl">{stat.unit}</span>
            </dd>
            <p className="mt-3 text-body">{stat.text}</p>
          </div>
        ))}
      </dl>
      <figure className="reveal relative mt-14 overflow-hidden rounded-2xl">
        <img src={data.hero.src} alt={data.hero.alt} className="h-[280px] w-full object-cover sm:h-[360px]" />
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-6 text-white">
          <span className="font-display text-2xl">{data.hero.caption}</span>
        </figcaption>
      </figure>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {data.gallery.map((shot) => (
          <figure key={shot.title} className="group flex flex-col rounded-2xl border border-ink/10 bg-white p-3">
            <div className="overflow-hidden rounded-xl">
              <img src={shot.src} alt={shot.alt} className="aspect-square w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
            </div>
            <figcaption className="px-2 pb-2 pt-4">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand">{shot.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-body">{shot.text}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <dl className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.zones.map((zone) => (
          <div key={zone.title} className="border-l-2 border-gilt pl-5">
            <dt className="font-display text-xl text-ink">{zone.title}</dt>
            <dd className="mt-2 text-body">{zone.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
