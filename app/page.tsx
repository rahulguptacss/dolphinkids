import type { ReactNode } from 'react';
import Header from '../components/sections/Header';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Programmes from '../components/sections/Programmes';
import Process from '../components/sections/Process';
import ParentInfo from '../components/sections/ParentInfo';
import Why from '../components/sections/Why';
import Learning from '../components/sections/Learning';
import Campus from '../components/sections/Campus';
import DayCare from '../components/sections/DayCare';
import Tour from '../components/sections/Tour';
import Activities from '../components/sections/Activities';
import Parents from '../components/sections/Parents';
import Senior from '../components/sections/Senior';
import Journal from '../components/sections/Journal';
import Franchise from '../components/sections/Franchise';
import Enquire from '../components/sections/Enquire';
import Footer from '../components/sections/Footer';
import MobileBar from '../components/ui/MobileBar';
import BackToTop from '../components/ui/BackToTop';
import { common, pages, sections } from '../components/types';

const sectionMap: Record<string, ReactNode> = {
  Hero: <Hero data={sections.hero} />,
  About: <About data={sections.about} />,
  Programmes: <Programmes data={sections.programmes} />,
  Process: <Process data={sections.process} />,
  ParentInfo: <ParentInfo data={sections.parentInfo} />,
  Why: <Why data={sections.why} />,
  Learning: <Learning data={sections.learning} />,
  Campus: <Campus data={sections.campus} />,
  DayCare: <DayCare data={sections.daycare} />,
  Tour: <Tour data={sections.tour} />,
  Activities: <Activities data={sections.activities} />,
  Parents: <Parents data={sections.parents} />,
  Senior: <Senior data={sections.senior} />,
  Journal: <Journal data={sections.journal} />,
  Franchise: <Franchise data={sections.franchise} />,
  Enquire: <Enquire data={sections.enquire} />,
};

export const metadata = {
  title: pages.home.metadata.title,
  description: pages.home.metadata.description,
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-paper pb-16 text-ink xl:pb-0">
      <Header data={common.Header} />
      <main className="flex-1">
        {pages.home.components.map((block) => (
          <div key={block.key}>{sectionMap[block.component]}</div>
        ))}
      </main>
      <Footer data={common.Footer} />
      <MobileBar data={common.MobileBar} />
      <BackToTop data={common.BackToTop} />
    </div>
  );
}
