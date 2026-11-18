import { ClipboardList, MessageCircle, Phone, PlayCircle } from 'lucide-react';
import type { MobileBarData } from '../../types';

const icons = [Phone, MessageCircle, PlayCircle, ClipboardList];

export default function MobileBar({ data }: { data: MobileBarData }) {
  return (
    <>
    <a href={data.float_href} target="_blank" rel="noopener noreferrer" suppressHydrationWarning className="fixed bottom-6 right-6 z-40 hidden min-h-14 items-center gap-2 rounded-full bg-brand px-5 font-semibold text-paper shadow-lg hover:bg-brand-strong xl:inline-flex">
      <MessageCircle className="h-5 w-5" />{data.float_label}
    </a>
    <nav aria-label="Quick contact" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-ink/10 bg-paper/95 xl:hidden">
      {data.items.map((item, index) => {
        const Icon = icons[index] ?? Phone;
        return (
          <a key={item.name} href={item.href} className={`flex min-h-[60px] flex-col items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-[0.06em] ${item.name === 'WhatsApp' ? 'text-brand' : 'text-ink'}`}>
            <Icon className="h-5 w-5" />{item.name}
          </a>
        );
      })}
    </nav>
    </>
  );
}
