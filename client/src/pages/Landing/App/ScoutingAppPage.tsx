import { CssBaseline } from '@material-ui/core';
import { FunctionalitySection } from './FunctionalitySection';
import { Footer } from '../Footer';
import { HeroSection } from '../HeroSection';
import { CopySection } from '../CopySection';
import { AdvantagesSection } from '../AdvantagesSection';
import { TestimonialsSection } from './TestimonialsSection';
import { PricingSection } from './PricingSection';
import { heroData, copyData, advantages, testimonials } from './data';

export const ScoutingAppPage = () => {
  return (
    <>
      <main>
        <CssBaseline />
        <HeroSection {...heroData} />
        <CopySection {...copyData} />
        <FunctionalitySection />
        <AdvantagesSection advantages={advantages} />
        <TestimonialsSection testimonials={testimonials} />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
};
