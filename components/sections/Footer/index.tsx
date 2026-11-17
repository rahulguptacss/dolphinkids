import { Download, MapPin, MessageCircle, Phone } from 'lucide-react';
import type { FooterData } from '../../types';

export default function Footer({ data }: { data: FooterData }) {
  return (
    <footer id="contact" className="bg-[hsl(222_42%_94%)] text-ink">
      <div className="wave-rule opacity-60" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="inline-block rounded-xl bg-paper p-3">
            <img src={data.logo} alt={data.logo_alt} className="h-auto w-[210px]" />
          </div>
          <p className="font-display mt-6 text-2xl">{data.tagline}</p>
          <p className="mt-4 flex gap-2 text-body">
            <MapPin className="mt-1 h-4 w-4 shrink-0 text-gilt" />
            {data.address}
          </p>
        </div>
        <div>
          <p className="eyebrow !text-gilt">{data.contact_title}</p>
          <ul className="mt-4 grid gap-2">
            <li>
              <a href={data.phone_href} className="inline-flex min-h-11 items-center gap-2">
                <Phone className="h-4 w-4" /> {data.phone_label} {data.phone}
              </a>
            </li>
            <li>
              <a href={data.whatsapp_href} className="inline-flex min-h-11 items-center gap-2">
                <MessageCircle className="h-4 w-4" /> {data.whatsapp_label} {data.whatsapp}
              </a>
            </li>
          </ul>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow !text-gilt">{data.explore_title}</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4">
            {data.links.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="inline-flex min-h-11 items-center">{link.name}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-ink/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-6 text-xs text-body md:flex-row md:items-center md:justify-between">
          <div className="max-w-4xl space-y-3">
            <p>{data.note}</p>
            <p>{data.disclaimer}</p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-1 md:items-end">
            {data.brochures.map((item) => (
              <a key={item.name} href={item.href} className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand">
                <Download className="h-4 w-4 shrink-0" />
                {item.name}
              </a>
            ))}
            <button type="button" className="min-h-11 text-left underline underline-offset-4">{data.privacy_label}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
