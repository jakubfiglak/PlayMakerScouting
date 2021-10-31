import { CopySection } from './CopySection';
import { HowDoWeWorkSection } from './HowDoWeWorkSection';
import { ScoutmakerSection } from './ScoutmakerSection';
import { AdvantagesSection } from './AdvantagesSection';

export const ClubScoutingPage = () => {
  return (
    <main>
      <ScoutmakerSection />
      <CopySection />
      <HowDoWeWorkSection />
      <AdvantagesSection />
    </main>
  );
};
