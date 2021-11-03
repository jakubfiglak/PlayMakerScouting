import { CssBaseline } from '@material-ui/core';
import { CopySection } from './CopySection';
import { HowDoWeWorkSection } from './HowDoWeWorkSection';
import { AdvantagesSection } from './AdvantagesSection';
import { TransfersSection } from './TranfersSection';
import { RecommendationsSection } from './RecommendationsSection';
import { PricingSection } from './PricingSection';
import { HistoricalDataSection } from './HistoricalDataSection';
import { Footer } from '../Footer';
import { HeroSection } from '../HeroSection';
import { heroData } from './data';

export const ClubScoutingPage = () => {
  return (
    <>
      <main>
        <CssBaseline />
        <HeroSection
          image={heroData.image}
          title={heroData.title}
          features={heroData.features}
          displayAppNumbers
        />
        <CopySection />
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
