import { CssBaseline } from '@material-ui/core';
import { useState } from 'react';
import { Footer } from '../Footer';
import { HeroSection } from '../HeroSection';
import { CopySection } from '../CopySection';
import { heroData, copyData, values, advantages, effects } from './data';
import { ValuesSection } from '../ValuesSection';
import { AdvantagesSection } from '../AdvantagesSection';
import { EffectsSection } from '../EffectsSection';
import { PricingSection } from './PricingSection';
import { ContactFormModal } from '../ContactFormModal';

export const ScoutingAcademyPage = () => {
  const [isContactFormModalOpen, setIsContactFormModalOpen] = useState(false);

  return (
    <>
      <main>
        <CssBaseline />
        <HeroSection {...heroData} />
        <CopySection {...copyData} />
        <ValuesSection values={values} />
        <AdvantagesSection advantages={advantages} dark />
        <EffectsSection title="Zaufali nam" effects={effects} />
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
