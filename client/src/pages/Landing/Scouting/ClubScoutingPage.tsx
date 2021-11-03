import { CssBaseline } from '@material-ui/core';
import { HowDoWeWorkSection } from './HowDoWeWorkSection';
import { AdvantagesSection } from './AdvantagesSection';
import { TransfersSection } from './TranfersSection';
import { RecommendationsSection } from './RecommendationsSection';
import { PricingSection } from './PricingSection';
import { HistoricalDataSection } from './HistoricalDataSection';
import { Footer } from '../Footer';
import { HeroSection } from '../HeroSection';
import { CopySection } from '../CopySection';
import { heroData, copyData } from './data';

export const ClubScoutingPage = () => {
  return (
    <>
      <main>
        <CssBaseline />
        <HeroSection {...heroData} displayAppNumbers />
        <CopySection {...copyData} />
        <HowDoWeWorkSection />
        <AdvantagesSection />
        <TransfersSection />
        <RecommendationsSection />
        <PricingSection />
        <HistoricalDataSection />
      </main>
      <Footer />
    </>
  );
};
