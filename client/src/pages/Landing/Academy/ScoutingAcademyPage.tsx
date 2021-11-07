import { CssBaseline } from '@material-ui/core';
import { Footer } from '../Footer';
import { HeroSection } from '../HeroSection';
import { CopySection } from '../CopySection';
import { heroData, copyData, values, advantages, effects } from './data';
import { ValuesSection } from '../ValuesSection';
import { AdvantagesSection } from '../AdvantagesSection';
import { EffectsSection } from './EffectsSection';

export const ScoutingAcademyPage = () => {
  return (
    <>
      <main>
        <CssBaseline />
        <HeroSection {...heroData} />
        <CopySection {...copyData} />
        <ValuesSection values={values} />
        <AdvantagesSection subtitle advantages={advantages} />
        <EffectsSection effects={effects} />
      </main>
      <Footer />
    </>
  );
};
