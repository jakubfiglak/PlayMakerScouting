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
      Scout<em>Maker</em>.pro Analiza Danych
    </p>
  ),
  features: [
    'Bądź krok przed rywalami dzięki wiedzy analitycznej',
    'Usprawnij pracę działu skautingu',
    'Wykorzystaj modelowanie statystyczne do zadań specjalnych',
  ],
};
