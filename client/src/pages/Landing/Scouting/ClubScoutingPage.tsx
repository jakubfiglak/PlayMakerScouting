import { CopySection } from './CopySection';
import { HowDoWeWorkSection } from './HowDoWeWorkSection';
import { ScoutmakerSection } from './ScoutmakerSection';
import { AdvantagesSection } from './AdvantagesSection';
import { TransfersSection } from './TranfersSection';
import { RecommendationsSection } from './RecommendationsSection';
import { PricingSection } from './PricingSection';

export const ClubScoutingPage = () => {
  return (
    <main>
      <ScoutmakerSection />
      <CopySection />
      <HowDoWeWorkSection />
      <AdvantagesSection />
      <TransfersSection />
      <RecommendationsSection />
      <PricingSection />
    </main>
  );
};
