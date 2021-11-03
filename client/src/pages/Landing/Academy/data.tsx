import phoneMockup from '../../../assets/phone-mockup-activity.png';
import backgroundImage from '../../../assets/academy-background.png';

export const heroData = {
  backgroundImage,
  image: {
    src: phoneMockup,
    alt: 'App dashboard view',
  },
  title: (
    <p>
      Scout<em>Maker</em>.pro Akademia
    </p>
  ),
  features: [
    'Zapraszaj talenty do swojej akademii',
    'Miej dostęp do statystyk, notatek, raportów i profili piłkarzy',
    'Uzyskaj wsparcie w przeprowadzaniu naborów',
  ],
};
