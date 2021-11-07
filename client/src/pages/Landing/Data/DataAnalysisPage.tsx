import { CssBaseline } from '@material-ui/core';
import { Footer } from '../Footer';
import { HeroSection } from '../HeroSection';
import { CopySection } from '../CopySection';
import { heroData, copyData, advantages, effects } from './data';
import { AdvantagesSection } from '../AdvantagesSection';
import { EffectsSection } from '../EffectsSection';
import { HowDoWeWorkSection } from './HowDoWeWorkSection';
import { PricingSection } from './PricingSection';

export const DataAnalysisPage = () => {
  return (
    <>
      <main>
        <CssBaseline />
        <HeroSection {...heroData} />
        <CopySection {...copyData} />
        <AdvantagesSection subtitle advantages={advantages} />
        <EffectsSection effects={effects} title="Przykłady analizy danych" />
        <HowDoWeWorkSection />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
};
