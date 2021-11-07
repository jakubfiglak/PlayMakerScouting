import { CssBaseline } from '@material-ui/core';
import { FunctionalitySection } from './FunctionalitySection';
import { Footer } from '../Footer';
import { HeroSection } from '../HeroSection';
import { CopySection } from '../CopySection';
import { AdvantagesSection } from '../AdvantagesSection';
import { heroData, copyData, advantages } from './data';

export const ScoutingAppPage = () => {
  return (
    <>
      <main>
        <CssBaseline />
        <HeroSection {...heroData} />
        <CopySection {...copyData} />
        <FunctionalitySection />
        <AdvantagesSection advantages={advantages} />
      </main>
      <Footer />
    </>
  );
};
