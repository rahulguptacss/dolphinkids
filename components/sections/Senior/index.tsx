import { BookOpen, Compass, GraduationCap, MessageCircle, School, Users } from 'lucide-react';
import type { SeniorSectionData } from '../../types';

const icons = {
  school: School,
  compass: Compass,
  book: BookOpen,
  grad: GraduationCap,
  users: Users,
};

export default function Senior({ data }: { data: SeniorSectionData }) {
  return (
    <section id={data.id} className="bg-brand-tint py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand">
              <span className="font-display font-normal normal-case tracking-normal text-gilt">{data.index}</span>
              <span className="mx-3 font-normal text-gilt">—</span>
              {data.eyebrow}
            </p>
            <h2 className="font-display mt-4 text-4xl font-normal leading-[1.05] sm:text-5xl">{data.title}</h2>
            <p className="reveal font-display mt-5 text-xl text-brand sm:text-2xl">{data.highlight}</p>
            <div className="reveal mt-6 space-y-4 text-lg leading-relaxed text-body">
              {data.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="reveal mt-8">
              <p className="text-sm font-semibold text-ink">{data.boards_label}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {data.boards.map((board) => (
                  <li key={board} className="rounded-full border border-brand/25 bg-paper px-4 py-1.5 text-sm font-semibold text-ink">{board}</li>
                ))}
              </ul>
            </div>
          </div>
          <ul className="grid content-start gap-3">
            {data.points.map((point, index) => {
              const Icon = icons[point.icon as keyof typeof icons] ?? School;
              return (
                <li key={point.text} className="reveal flex items-start gap-4 rounded-2xl border border-ink/10 bg-paper p-5 transition-colors hover:border-brand/40" style={{ transitionDelay: `${index * 70}ms` }}>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span className="pt-2 leading-relaxed text-ink">{point.text}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="reveal mt-14 rounded-2xl border border-ink/10 bg-paper p-6 sm:p-10">
          <p className="text-lg leading-relaxed text-body">{data.note}</p>
          <div className="mt-8 flex flex-col gap-4 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-body">{data.disclaimer}</p>
            <a href={data.button_href} target="_blank" rel="noreferrer" className="btn-lift inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-strong">
              <MessageCircle className="h-4 w-4" /> {data.button}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
