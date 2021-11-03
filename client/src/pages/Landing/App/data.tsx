import phoneMockup from '../../../assets/phone-mockup-activity.png';
import backgroundImage from '../../../assets/scouting-background.png';

export const heroData = {
  backgroundImage,
  image: {
    src: phoneMockup,
    alt: 'App dashboard view',
  },
  title: (
    <p>
      Aplikacja Scout<em>Maker</em>.pro
    </p>
  ),
  features: [
    'Stwórz swój schemat obserwacji',
    'Schowaj do kieszeni notatki, raporty i profile piłkarzy',
    'Buduj własną bazę skautingową',
  ],
};
