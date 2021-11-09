import { CssBaseline } from '@material-ui/core';
import { ValuesSection } from '../ValuesSection';
import { TransfersSection } from './TranfersSection';
import { RecommendationsSection } from './RecommendationsSection';
import { PricingSection } from './PricingSection';
import { HistoricalDataSection } from './HistoricalDataSection';
import { Footer } from '../Footer';
import { HeroSection } from '../HeroSection';
import { CopySection } from '../CopySection';
import { AdvantagesSection } from '../AdvantagesSection';
import { heroData, copyData, advantages, values } from './data';

export const ClubScoutingPage = () => {
  return (
    <>
      <main>
        <CssBaseline />
        <HeroSection {...heroData} displayAppNumbers />
        <CopySection {...copyData} />
        <ValuesSection values={values} />
        <AdvantagesSection subtitle advantages={advantages} />
        <TransfersSection />
        <RecommendationsSection />
        <PricingSection />
        <HistoricalDataSection />
      </main>
      <Footer />
    </>
  );
};
