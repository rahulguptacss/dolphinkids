import type { ReactNode } from 'react';
import Header from '../components/sections/Header/page';
import Hero from '../components/sections/Hero/page';
import About from '../components/sections/About/page';
import Programmes from '../components/sections/Programmes/page';
import Process from '../components/sections/Process/page';
import ParentInfo from '../components/sections/ParentInfo/page';
import Why from '../components/sections/Why/page';
import Learning from '../components/sections/Learning/page';
import Campus from '../components/sections/Campus/page';
import DayCare from '../components/sections/DayCare/page';
import Tour from '../components/sections/Tour/page';
import Activities from '../components/sections/Activities/page';
import Parents from '../components/sections/Parents/page';
import Senior from '../components/sections/Senior/page';
import Journal from '../components/sections/Journal/page';
import Franchise from '../components/sections/Franchise/page';
import Enquire from '../components/sections/Enquire/page';
import Footer from '../components/sections/Footer/page';
import MobileBar from '../components/ui/MobileBar';
import BackToTop from '../components/ui/BackToTop';
import { pages, sections } from '../components/types';

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
      <Header data={sections.header} />
      <main className="flex-1">
        {pages.home.components.map((block) => (
          <div key={block.key}>{sectionMap[block.component]}</div>
        ))}
      </main>
      <Footer data={sections.footer} />
      <MobileBar data={sections.mobileBar} />
      <BackToTop data={sections.backToTop} />
    </div>
  );
}
