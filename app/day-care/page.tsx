import Header from '../../components/sections/Header/page';
import Footer from '../../components/sections/Footer/page';
import MobileBar from '../../components/ui/MobileBar';
import BackToTop from '../../components/ui/BackToTop';
import DayCarePage from '../../components/sections/DayCarePage/page';
import { pages, sections } from '../../components/types';

export const metadata = {
  title: pages.dayCare.metadata.title,
  description: pages.dayCare.metadata.description,
};

function homeLink<T>(value: T): T {
  if (Array.isArray(value)) return value.map(homeLink) as T;
  if (value && typeof value === 'object') {
    const next = { ...(value as Record<string, unknown>) };
    if (typeof next.href === 'string' && next.href.startsWith('#')) next.href = `/${next.href}`;
    for (const key of Object.keys(next)) {
      if (key !== 'href') next[key] = homeLink(next[key]);
    }
    return next as T;
  }
  return value;
}

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-paper pb-16 text-ink xl:pb-0">
      <Header data={homeLink(sections.header)} />
      <main className="flex-1">
        {pages.dayCare.components.map((block) => (
          <div key={block.key}>{block.component === 'DayCarePage' ? <DayCarePage /> : null}</div>
        ))}
      </main>
      <Footer data={homeLink(sections.footer)} />
      <MobileBar data={homeLink(sections.mobileBar)} />
      <BackToTop data={sections.backToTop} />
    </div>
  );
}
