'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Download, Lock, Menu, Phone, Play, X } from 'lucide-react';
import type { HeaderData, NavItem } from '../../types';

export default function Header({ data }: { data: HeaderData }) {
  const [open, setOpen] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const [note, setNote] = useState<NavItem | null>(null);
  const [login, setLogin] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const closeT = useRef<number | undefined>(undefined);

  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(null);
    };
    const click = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setOpen(null);
    };
    window.addEventListener('keydown', key);
    document.addEventListener('mousedown', click);
    return () => {
      window.removeEventListener('keydown', key);
      document.removeEventListener('mousedown', click);
    };
  }, []);

  const openMenu = () => {
    setMobile(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setDrawer(true)));
  };
  const closeMenu = () => {
    setDrawer(false);
    window.setTimeout(() => setMobile(false), 320);
  };

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobile]);

  const act = (item: NavItem) => {
    setOpen(null);
    closeMenu();
    if (item.note) setNote(item);
  };

  const itemClass = 'min-h-11 min-w-0 whitespace-normal break-words rounded-md px-2 py-2.5 text-left text-[15px] leading-relaxed text-ink hover:bg-brand/8 hover:text-brand';

  const renderItem = (item: NavItem, index: number) =>
    item.href ? (
      <a key={`${item.name}-${index}`} href={item.href} onClick={() => act(item)} className={itemClass}>{item.name}</a>
    ) : (
      <button key={`${item.name}-${index}`} type="button" onClick={() => act(item)} className={`${itemClass} text-left`}>
        {item.name} <span className="ml-1 text-xs text-gilt-ink">{data.coming_soon}</span>
      </button>
    );

  return (
    <>
      <div className="bg-deep text-ink">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2 text-[11px] sm:text-sm">
          <a href={data.banner_href} className="font-semibold tracking-[0.08em] sm:tracking-[0.14em]">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-gilt" />
            {data.banner}
          </a>
          <div className="hidden items-center gap-5 lg:flex">
            {data.utility.map((item) => (
              <a key={item.name} href={item.href} className="text-ondeep-soft hover:text-ink">{item.name}</a>
            ))}
            <button type="button" onClick={() => setLogin(true)} className="inline-flex items-center gap-1 text-ondeep-soft hover:text-ink">
              <Lock className="h-3.5 w-3.5" /> {data.login_text}
            </button>
            <a href={data.phone_href} className="font-semibold text-gilt">{data.phone}</a>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3">
          <a href="#home" className="shrink-0"><img src={data.logo} alt={data.logo_alt} className="h-auto w-[min(190px,52vw)] sm:w-[230px] xl:w-[200px]" /></a>
          <nav ref={navRef} aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {data.nav.map((group, index) => (
                <li
                  key={group.name}
                  className="relative"
                  onMouseEnter={() => {
                    window.clearTimeout(closeT.current);
                    if (group.items.length) setOpen(index);
                  }}
                  onMouseLeave={() => {
                    closeT.current = window.setTimeout(() => setOpen(null), 160);
                  }}
                >
                  {group.items.length === 0 ? (
                    <a href={group.href} className="nav-link block whitespace-nowrap rounded-full px-2 py-3 text-xs font-semibold tracking-[0.04em] text-ink hover:text-brand">{group.name.toUpperCase()}</a>
                  ) : (
                    <button
                      type="button"
                      aria-expanded={open === index}
                      onClick={() => setOpen(open === index ? null : index)}
                      className={`nav-link flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-3 text-xs font-semibold tracking-[0.04em] ${open === index ? 'is-open text-brand' : 'text-ink hover:text-brand'}`}
                    >
                      {group.name.toUpperCase()}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open === index ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                  {open === index && group.items.length > 0 && (
                    <div className={`absolute top-full z-50 mt-2 text-left ${index > 2 ? 'right-0' : 'left-0'}`}>
                      <div className="grid max-h-[min(70dvh,650px)] w-[min(640px,calc(100vw-2rem))] grid-cols-[170px_minmax(0,1fr)] gap-6 overflow-y-auto rounded-2xl border border-ink/10 bg-paper p-6 shadow-[0_18px_40px_-24px_rgba(40,52,96,0.28)]">
                        <div className="min-w-0 border-r border-ink/10 pr-5">
                          <p className="font-display text-2xl text-ink">{group.name}</p>
                          <p className="mt-2 text-sm font-normal tracking-normal text-body">{group.blurb}</p>
                          <a href={group.href} onClick={() => setOpen(null)} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold tracking-normal text-brand">
                            {data.overview_label} <ArrowUpRight className="h-4 w-4" />
                          </a>
                        </div>
                        <div className="grid min-w-0 grid-cols-2 content-start gap-x-4 gap-y-1">
                          {group.items.map(renderItem)}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <a href={data.button_href} suppressHydrationWarning className="hidden min-h-11 shrink-0 items-center whitespace-nowrap rounded-full bg-brand px-5 text-sm font-semibold text-paper hover:bg-brand-strong md:inline-flex">{data.button_text}</a>
            <button type="button" className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 bg-paper xl:hidden" aria-label={data.open_menu} onClick={openMenu}>
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="border-t border-brand/10 bg-brand-tint">
          <nav className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 sm:justify-center sm:gap-4 sm:px-5">
            <a href={data.promo_href} className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl px-2 font-sans text-sm font-semibold text-ink hover:text-brand sm:px-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-paper"><Play className="ml-0.5 h-3.5 w-3.5" fill="currentColor" /></span>
              <span className="hidden whitespace-nowrap font-sans text-sm font-semibold md:inline">{data.promo_text}</span>
            </a>
            <a href={data.admission_brochure} download suppressHydrationWarning className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-4 text-xs font-bold text-paper sm:px-6 sm:text-sm">
              <Download className="h-4 w-4" />{data.admission_brochure_text}
            </a>
            <a href={data.franchise_brochure} download className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-brand/25 bg-paper px-4 text-xs font-bold text-brand sm:px-6 sm:text-sm">
              <Download className="h-4 w-4" />{data.franchise_brochure_text}
            </a>
          </nav>
        </div>
      </header>
      {mobile && (
        <div className={`fixed inset-0 z-[70] bg-ink/45 transition-opacity duration-300 xl:hidden ${drawer ? 'opacity-100' : 'opacity-0'}`} onClick={closeMenu}>
          <div className={`ml-auto flex h-full w-full max-w-md flex-col bg-paper text-ink shadow-2xl transition-transform duration-300 ease-out ${drawer ? 'translate-x-0' : 'translate-x-full'}`} onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-ink/10 px-5 py-3">
              <p className="font-display text-xl">{data.menu_label}</p>
              <button type="button" className="grid h-12 w-12 place-items-center rounded-full hover:bg-brand-tint" aria-label={data.close_menu} onClick={closeMenu}><X className="h-5 w-5" /></button>
            </div>
            <nav className="min-h-0 flex-1 overflow-y-auto px-5 py-3">
              {data.nav.map((group) => group.items.length === 0 ? (
                <a key={group.name} href={group.href} onClick={closeMenu} className="block border-b border-ink/10 py-4 text-lg font-semibold">{group.name}</a>
              ) : (
                <div key={group.name} className="border-b border-ink/10">
                  <button type="button" aria-expanded={section === group.name} onClick={() => setSection(section === group.name ? null : group.name)} className="flex min-h-14 w-full items-center justify-between py-3 text-left text-lg font-semibold">
                    {group.name}
                    <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${section === group.name ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${section === group.name ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className="grid pb-3">
                        {group.items.map((item, index) => (
                          item.href ? (
                            <a key={`${item.name}-${index}`} href={item.href} onClick={closeMenu} className="rounded-lg py-3 pl-3 text-base hover:bg-brand-tint hover:text-brand">{item.name}</a>
                          ) : (
                            <button key={`${item.name}-${index}`} type="button" onClick={() => act(item)} className="rounded-lg py-3 pl-3 text-left text-base hover:bg-brand-tint">{item.name} <span className="text-xs text-gilt-ink">{data.coming_soon}</span></button>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </nav>
            <div className="grid gap-2 border-t border-ink/10 p-4">
              <a href={data.phone_href} className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink font-semibold text-paper"><Phone className="h-4 w-4" /> {data.call_label} {data.phone}</a>
              <a href={data.button_href} onClick={closeMenu} className="flex min-h-12 items-center justify-center rounded-full bg-brand font-semibold text-paper">{data.button_text}</a>
            </div>
          </div>
        </div>
      )}
      {note && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-ink/40 p-5" onClick={() => setNote(null)}>
          <div className="max-w-md rounded-2xl bg-paper p-6 text-ink" onClick={(event) => event.stopPropagation()}>
            <p className="eyebrow">{data.phase_title}</p>
            <h3 className="font-display mt-3 text-2xl">{note.name}</h3>
            <p className="mt-3 text-body">{note.note}</p>
            <button type="button" className="mt-5 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-paper" onClick={() => setNote(null)}>{data.close_label}</button>
          </div>
        </div>
      )}
      {login && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-ink/40 p-5" onClick={() => setLogin(false)}>
          <div className="max-w-md rounded-2xl bg-paper p-6 text-ink" onClick={(event) => event.stopPropagation()}>
            <p className="eyebrow">{data.login_text}</p>
            <h3 className="font-display mt-3 text-2xl">{data.login_title}</h3>
            <p className="mt-3 text-body">{data.login_body}</p>
            <button type="button" className="mt-5 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-paper" onClick={() => setLogin(false)}>{data.close_label}</button>
          </div>
        </div>
      )}
    </>
  );
}
