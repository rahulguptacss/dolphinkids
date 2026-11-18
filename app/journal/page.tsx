import JournalList from '../../components/sections/JournalList/page';
import { pages } from '../../components/types';

export const metadata = {
  title: pages.journal.metadata.title,
  description: pages.journal.metadata.description,
};

export default function Page() {
  return (
    <>
      {pages.journal.components.map((block) => (
        <div key={block.key}>{block.component === 'JournalList' ? <JournalList /> : null}</div>
      ))}
    </>
  );
}
