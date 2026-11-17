'use client';

import { useRef, useState } from 'react';
import { ArrowRight, Download, MessageCircle, Pause, Phone, Play, PlayCircle } from 'lucide-react';
import type { HeroSectionData } from '../../types';

function Flag({ country }: { country: string }) {
  if (country === 'India') {
    return (
      <svg viewBox="0 0 60 30" className="h-3.5 w-7 shrink-0 rounded-[2px] ring-1 ring-ink/15" aria-hidden>
        <path fill="#ff9933" d="M0 0h60v10H0z" />
        <path fill="#fff" d="M0 10h60v10H0z" />
        <path fill="#138808" d="M0 20h60v10H0z" />
        <circle cx="30" cy="15" r="3.2" fill="none" stroke="#000080" strokeWidth="0.6" />
      </svg>
    );
  }
  if (country === 'England') {
    return (
      <svg viewBox="0 0 60 30" className="h-3.5 w-7 shrink-0 rounded-[2px] ring-1 ring-ink/15" aria-hidden>
        <path fill="#fff" d="M0 0h60v30H0z" />
        <path fill="#ce1124" d="M26 0h8v30h-8zM0 11h60v8H0z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 60 30" className="h-3.5 w-7 shrink-0 rounded-[2px] ring-1 ring-ink/15" aria-hidden>
      <path fill="#012169" d="M0 0h60v30H0z" />
      <path stroke="#fff" strokeWidth="6" d="M0 0l60 30M60 0L0 30" />
      <path stroke="#c8102e" strokeWidth="3" d="M0 0l60 30M60 0L0 30" />
      <path stroke="#fff" strokeWidth="10" d="M30 0v30M0 15h60" />
      <path stroke="#c8102e" strokeWidth="6" d="M30 0v30M0 15h60" />
    </svg>
  );
}

export default function Hero({ data }: { data: HeroSectionData }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!started) setStarted(true);
    if (video.paused) {
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section id={data.id} className="hero-shell relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-20 lg:pt-14">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-gilt/40 bg-paper px-3.5 py-1.5 text-[11px] font-bold tracking-[0.18em] text-gilt-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-gilt" /> {data.badge}
          </p>
          <p className="eyebrow mt-4 sm:mt-5">{data.eyebrow}</p>
          <h1 className="font-display mt-4 max-w-[14ch] text-[clamp(2.25rem,4.4vw,3.75rem)] font-normal leading-[1.03] text-ink sm:max-w-none">
            {data.title}
            <br />
            <span className="whitespace-nowrap">{data.title_rest} <span className="italic text-brand">{data.title_highlight}</span></span>
          </h1>
          <div className="hero-wave" aria-hidden />
          <p className="mt-5 max-w-xl text-base leading-relaxed text-body sm:text-lg">
            <strong className="font-semibold text-ink">{data.lead_strong}</strong> {data.lead}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={data.primary_href} className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-brand px-7 text-sm font-bold text-paper shadow-[0_12px_24px_-14px_hsl(332_54%_37%/0.6)] hover:bg-brand-strong">
              {data.primary_text} <ArrowRight className="h-4 w-4" />
            </a>
            <a href={data.secondary_href} className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-brand/30 bg-paper px-6 text-sm font-bold text-brand">
              <Download className="h-4 w-4" /> {data.secondary_text}
            </a>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 text-sm">
            <a href={data.phone_href} className="inline-flex min-h-11 items-center gap-2 font-bold text-ink">
              <Phone className="h-4 w-4 text-brand" /> Call {data.phone}
            </a>
            <a href={data.whatsapp_href} className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand underline decoration-gilt/60 underline-offset-4">
              <MessageCircle className="h-4 w-4" /> {data.whatsapp_text}
            </a>
          </div>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-ink">
            {data.origins.map((item) => (
              <li key={item.country} className="inline-flex items-center gap-2">
                <Flag country={item.country} /> {item.country}
              </li>
            ))}
          </ul>
          <p className="mt-2 max-w-md text-[11px] leading-relaxed text-body">{data.origins_note}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm font-semibold">
            {data.links.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className={`inline-flex min-h-11 items-center gap-1 underline underline-offset-4 ${index === data.links.length - 1 ? 'text-ink decoration-ink/30' : 'text-brand decoration-gilt/60'}`}
              >
                {index === 1 && <PlayCircle className="h-4 w-4" />}
                {link.name}
                {index === data.links.length - 1 && <ArrowRight className="h-4 w-4" />}
              </a>
            ))}
          </div>
        </div>
        <figure className="relative">
          <div className="relative">
            <div className="pointer-events-none absolute -bottom-3 -right-3 hidden h-[62%] w-[62%] rounded-[1.6rem] border-2 border-gilt/35 lg:block" aria-hidden />
            <div className="relative overflow-hidden rounded-2xl bg-ink shadow-[0_30px_60px_-36px_hsl(226_52%_21%/0.45)]">
              <div className="relative aspect-video">
                <img src={data.poster} alt={data.poster_alt} className={`h-full w-full object-cover ${started ? 'invisible' : ''}`} />
                <video
                  ref={videoRef}
                  className={`absolute inset-0 h-full w-full object-cover ${started ? '' : 'hidden'}`}
                  poster={data.poster}
                  playsInline
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                >
                  <source src={data.video} type="video/mp4" />
                </video>
              </div>
              <div className="bg-paper p-4 sm:p-5">
                <button type="button" onClick={toggle} className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-paper py-1.5 pl-1.5 pr-5 text-sm font-bold text-ink" aria-pressed={playing}>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-paper">
                    {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" fill="currentColor" />}
                  </span>
                  {playing ? data.pause_label : data.play_label}
                </button>
              </div>
            </div>
            <div className="absolute -left-2 top-6 hidden rounded-2xl border border-ink/10 bg-paper px-4 py-3 shadow-[0_14px_30px_-20px_hsl(226_52%_21%/0.4)] sm:block lg:-left-8">
              <p className="font-display text-3xl leading-none text-brand">{data.year}</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-ink">{data.year_label}</p>
            </div>
          </div>
          <figcaption className="mt-3 px-2 text-xs text-body">{data.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
