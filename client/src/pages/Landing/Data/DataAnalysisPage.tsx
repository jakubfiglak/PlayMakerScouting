import { CssBaseline } from '@material-ui/core';
import { useState } from 'react';
import { Footer } from '../Footer';
import { HeroSection } from '../HeroSection';
import { CopySection } from '../CopySection';
import { heroData, copyData, advantages, effects } from './data';
import { AdvantagesSection } from '../AdvantagesSection';
import { EffectsSection } from '../EffectsSection';
import { HowDoWeWorkSection } from './HowDoWeWorkSection';
import { PricingSection } from './PricingSection';
import { ContactFormModal } from '../ContactFormModal';

export const DataAnalysisPage = () => {
  const [isContactFormModalOpen, setIsContactFormModalOpen] = useState(false);

  return (
    <>
      <main>
        <CssBaseline />
        <HeroSection {...heroData} />
        <CopySection {...copyData} />
        <AdvantagesSection advantages={advantages} />
        <EffectsSection effects={effects} title="Przykłady analizy danych" />
        <HowDoWeWorkSection />
        <PricingSection onButtonClick={() => setIsContactFormModalOpen(true)} />
        <ContactFormModal
          open={isContactFormModalOpen}
          onClose={() => setIsContactFormModalOpen(false)}
        />
      </main>
      <Footer />
    </>
  );
};
