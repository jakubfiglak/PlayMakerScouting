import { CopySection } from './CopySection';
import { HowDoWeWorkSection } from './HowDoWeWorkSection';
import { ScoutmakerSection } from './ScoutmakerSection';
import { AdvantagesSection } from './AdvantagesSection';
import { TransfersSection } from './TranfersSection';
import { RecommendationsSection } from './RecommendationsSection';

export const ClubScoutingPage = () => {
  return (
    <main>
      <ScoutmakerSection />
      <CopySection />
      <HowDoWeWorkSection />
      <AdvantagesSection />
      <TransfersSection />
      <RecommendationsSection />
    </main>
  );
};
