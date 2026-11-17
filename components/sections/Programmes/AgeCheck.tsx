'use client';

import { useEffect, useState } from 'react';
import { CalendarClock } from 'lucide-react';
import type { ProgrammesSectionData } from '../../types';

function monthsBetween(from: string, to: string) {
  const start = new Date(from);
  const end = new Date(to);
  if (Number.isNaN(start.getTime()) || end < start) return null;
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (end.getDate() < start.getDate()) months -= 1;
  return months;
}

export default function AgeCheck({ data }: { data: ProgrammesSectionData }) {
  const check = data.age_check;
  const [session, setSession] = useState('');
  const [track, setTrack] = useState(check.tracks[0]?.id ?? 'nursery');
  const [dob, setDob] = useState('');
  const [today, setToday] = useState('');
  const pre = track === 'pre';

  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
  }, []);

  const months = dob && (!pre || today) ? monthsBetween(dob, pre ? today : check.cutoff) : null;
  const pool = pre ? data.items.filter((item) => item.months <= 20) : data.items.filter((item) => item.months > 20);
  const match = months !== null && months >= 0 ? [...pool].reverse().find((item) => months >= item.months) : undefined;

  return (
    <div id={check.id} className="mt-10 grid gap-8 rounded-2xl bg-deep p-7 sm:p-10 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <CalendarClock className="h-8 w-8 text-gilt" />
        <h3 className="font-display mt-4 text-3xl">{check.title}</h3>
        <p className="mt-3 text-body">{check.text}</p>
      </div>
      <div className="grid content-start gap-4">
        {!pre && (
          <label className="grid gap-2 text-sm font-semibold">
            {check.session_label}
            <select value={session} onChange={(event) => setSession(event.target.value)} className="field bg-white">
              <option value="">{check.session_placeholder}</option>
              {check.sessions.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        )}
        <label className="grid gap-2 text-sm font-semibold">
          {check.checking_label}
          <select value={track} onChange={(event) => setTrack(event.target.value)} className="field bg-white">
            {check.tracks.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          {check.dob_label}
          <input type="date" value={dob} max={today || undefined} onChange={(event) => setDob(event.target.value)} className="field bg-white" />
        </label>
        <div className="rounded-xl border border-ink/10 bg-white/70 p-5 text-sm text-body" aria-live="polite">
          {months !== null && months >= 0 ? (
            <p>
              Age {pre ? 'today' : `on ${check.cutoff_label}`}: <strong className="text-ink">{Math.floor(months / 12)} years {months % 12} months</strong>
              {match ? <span className="mt-2 block font-display text-2xl text-ink">{match.name}</span> : <span className="mt-2 block">Please speak with admissions. This age is below the published minimum.</span>}
              <span className="mt-2 block text-xs">Indicative only. The admissions team confirms the class.</span>
            </p>
          ) : (
            <p>
              {check.empty_result} <a href={check.phone_href} className="font-semibold text-ink underline">{check.phone}</a>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
