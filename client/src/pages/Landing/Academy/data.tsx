import phoneMockup from '../../../assets/phone1.png';
import phoneMenuMockup from '../../../assets/phone2.png';
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

export const copyData = {
  title: (
    <p>
      Analiza Danych Scout<em>Maker</em>.Pro
    </p>
  ),
  text:
    'Usługa skautingowa pozwalająca na monitorowanie wszystkich młodzieżowych lig piłkarskich w Polsce. Raporty statystyczne dostarczane przez naszych analityków sportowych sugerują największe talenty wybranych rozgrywek wraz z przebiegiem ich kariery oraz informacjami o współpracy z trenerami. Baza danych pozwala sprawnie filtrować zawodników z regionu. Jest narzędziem, które sprawdza się w okienkach transferowych i wskazuje najlepszych zawodników drużyny przeciwnej przed każdym meczem.',
  image: {
    src: phoneMenuMockup,
    alt: 'App with menu open view',
  },
};
