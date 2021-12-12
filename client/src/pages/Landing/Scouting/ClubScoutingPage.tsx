import { useState } from 'react';
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
import { ContactFormModal } from '../ContactFormModal';

export const ClubScoutingPage = () => {
  const [isContactFormModalOpen, setIsContactFormModalOpen] = useState(false);

  return (
    <>
      <main>
        <CssBaseline />
        <HeroSection {...heroData} displayAppNumbers />
        <CopySection {...copyData} />
        <ValuesSection values={values} />
        <AdvantagesSection advantages={advantages} />
        <TransfersSection />
        <RecommendationsSection />
        <PricingSection onButtonClick={() => setIsContactFormModalOpen(true)} />
        <HistoricalDataSection
          onButtonClick={() => setIsContactFormModalOpen(true)}
        />
        <ContactFormModal
          open={isContactFormModalOpen}
          onClose={() => setIsContactFormModalOpen(false)}
        />
      </main>
      <Footer />
    </>
  );
};
