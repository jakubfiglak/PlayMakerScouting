import image from '../../../assets/data-analysis-image.png';
import backgroundImage from '../../../assets/scouting-background.png';

export const heroData = {
  backgroundImage,
  image: {
    src: image,
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

export const copyData = {
  title: (
    <p>
      Analiza Danych Scout<em>Maker</em>.Pro
    </p>
  ),
  text:
    'Usługa skautingowa skierowana do klubów wszystkich szczebli rozgrywkowych w Polsce. Raporty statystyczne dostarczane przez naszych analityków sportowych sugerują najlepszych piłkarzy wybranych lig wraz z przebiegiem ich kariery oraz informacjami o współpracy z trenerami. Baza danych pozwala sprawnie filtrować zawodników z regionu. Jest narzędziem, które sprawdza się w okienkach transferowych i prześwietla przeciwników przed każdym meczem.',
};
