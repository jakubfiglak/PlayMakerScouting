import { CssBaseline } from '@material-ui/core';
import { Footer } from '../Footer';
import { HeroSection } from '../HeroSection';
import { heroData } from './data';

export const ScoutingAcademyPage = () => {
  return (
    <>
      <main>
        <CssBaseline />
        <HeroSection {...heroData} />
      </main>
      <Footer />
    </>
  );
};
