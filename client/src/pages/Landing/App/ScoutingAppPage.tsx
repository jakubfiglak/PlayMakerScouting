import { CssBaseline } from '@material-ui/core';
import { Footer } from '../Footer';
import { HeroSection } from '../HeroSection';
import { heroData } from './data';

export const ScoutingAppPage = () => {
  return (
    <>
      <main>
        <CssBaseline />
        <HeroSection
          image={heroData.image}
          title={heroData.title}
          features={heroData.features}
        />
      </main>
      <Footer />
    </>
  );
};
