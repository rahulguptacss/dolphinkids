'use client';

import { useState, type ReactNode } from 'react';
import { Check, Link2, Share2 } from 'lucide-react';

function Mark({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="currentColor">
      <path d={d} />
    </svg>
  );
}

const WhatsApp = () => <Mark d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />;
const Facebook = () => <Mark d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073" />;
const X = () => <Mark d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />;
const LinkedIn = () => <Mark d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.06h4.56V24H.22V8.06zM8.34 8.06h4.37v2.18h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.48 3.04 5.48 7V24h-4.56v-7.22c0-1.72-.03-3.94-2.4-3.94-2.4 0-2.77 1.87-2.77 3.81V24H8.34V8.06z" />;

const icon: Record<string, ReactNode> = { WhatsApp: <WhatsApp />, Facebook: <Facebook />, X: <X />, LinkedIn: <LinkedIn /> };

export default function ShareBar({ url, title, copyLabel, copiedLabel, button, aria, shareOn, links }: { url: string; title: string; copyLabel: string; copiedLabel: string; button: string; aria: string; shareOn: string; links: { label: string; href: string }[] }) {
  const [copied, setCopied] = useState(false);
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);
  const items = links.map((item) => ({ ...item, href: item.href.replaceAll('{url}', encoded).replaceAll('{text}', text) }));

  return (
    <div className="flex max-w-[220px] flex-wrap items-center gap-2" aria-label={aria}>
      <button type="button" onClick={() => navigator.share?.({ title, url }).catch(() => undefined)} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-paper">
        <Share2 className="h-4 w-4" aria-hidden />{button}
      </button>
      {items.map((item) => (
        <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`${shareOn} ${item.label}`} className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink hover:border-brand hover:text-brand">
          {icon[item.label]}
        </a>
      ))}
      <button
        type="button"
        onClick={() => navigator.clipboard?.writeText(url).then(() => { setCopied(true); window.setTimeout(() => setCopied(false), 2000); })}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/15 px-4 text-sm font-semibold text-ink hover:border-brand"
      >
        {copied ? <Check className="h-4 w-4" aria-hidden /> : <Link2 className="h-4 w-4" aria-hidden />}
        {copied ? copiedLabel : copyLabel}
      </button>
    </div>
  );
}
