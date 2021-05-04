const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('../config/db');
const Rating = require('../modules/ratings/rating.model');

dotenv.config({ path: './config/config.env' });

const author = '5d7a514b5d2c12c7449be042';

const ballReception = {
  author,
  category: 'individual',
  name: 'przyjecie pilki',
  shortName: 'RCPT',
  private: false,
  score: true,
};

const passing = {
  author,
  category: 'individual',
  name: 'podania',
  shortName: 'PASS',
  private: false,
  score: true,
};

const defOneOnOne = {
  author,
  category: 'individual',
  name: 'gra 1v1 w obronie',
  shortName: 'D1v1',
  private: false,
  score: true,
};

const airPlay = {
  author,
  category: 'individual',
  name: 'gra w powietrzu',
  shortName: 'AIR',
  private: false,
  score: true,
};

const positioning = {
  author,
  category: 'individual',
  name: 'ustawianie',
  shortName: 'POS',
  private: false,
  score: true,
};

const attOneOnOne = {
  author,
  category: 'individual',
  name: 'gra 1v1 w ataku',
  shortName: 'A1v1',
  private: false,
  score: true,
};

const finishing = {
  author,
  category: 'individual',
  name: 'wykonczenie akcji',
  shortName: 'FIN',
  private: false,
  score: true,
};

const attack = {
  author,
  category: 'teamplay',
  name: 'faza ataku',
  shortName: 'FIN',
  private: false,
  score: true,
};

const defense = {
  author,
  category: 'teamplay',
  name: 'faza defensywna',
  shortName: 'DEF',
  private: false,
  score: true,
};

const transition = {
  author,
  category: 'teamplay',
  name: 'fazy przejsciowe',
  shortName: 'TRANS',
  private: false,
  score: true,
};

const leadingMotor = {
  author,
  category: 'physical',
  name: 'cechy wiodace',
  shortName: 'LEAD',
  private: false,
  score: false,
};

const neglectedMotor = {
  author,
  category: 'physical',
  name: 'cechy zaniedbane',
  shortName: 'NEGL',
  private: false,
  score: false,
};

const noBall = {
  author,
  category: 'offense',
  name: 'gra bez pilki',
  shortName: 'BEZPIL',
  private: false,
  score: true,
};

const opening = {
  author,
  category: 'offense',
  name: 'otwarcie',
  shortName: 'OTW',
  private: false,
  score: true,
};

const creation = {
  author,
  category: 'offense',
  name: 'kreowanie',
  shortName: 'KREOW',
  private: false,
  score: true,
};

const finalization = {
  author,
  category: 'offense',
  name: 'finalizacja',
  shortName: 'FIN',
  private: false,
  score: true,
};

const daTransition = {
  author,
  category: 'offense',
  name: 'przejscie AO',
  shortName: 'AOPRZE',
  private: false,
  score: true,
};

const onevonetwo = {
  author,
  category: 'defense',
  name: 'gra 1v1, 1v2',
  shortName: '1v11v2',
  private: false,
  score: true,
};

const spaceDefense = {
  author,
  category: 'defense',
  name: 'obrona przestrzeni',
  shortName: 'OPRZES',
  private: false,
  score: true,
};

const pressing = {
  author,
  category: 'defense',
  name: 'dzialania pressingowe',
  shortName: 'PRESS',
  private: false,
  score: true,
};

const adTransition = {
  author,
  category: 'defense',
  name: 'przejscie OA',
  shortName: 'OAPRZE',
  private: false,
  score: true,
};

const physicalChar = {
  author,
  category: 'physical',
  name: 'charakterystyka motoryczna',
  shortName: 'MOTCHA',
  private: false,
  score: false,
};

const mentalChar = {
  author,
  category: 'mental',
  name: 'charakterystyka mentalna',
  shortName: 'MENCHA',
  private: false,
  score: false,
};

const ratings = [
  // ballReception,
  // passing,
  // defOneOnOne,
  // airPlay,
  // positioning,
  // attOneOnOne,
  // finishing,
  // attack,
  // defense,
  // transition,
  // leadingMotor,
  // neglectedMotor,
  noBall,
  opening,
  creation,
  finalization,
  daTransition,
  onevonetwo,
  spaceDefense,
  pressing,
  adTransition,
  physicalChar,
  mentalChar,
];

async function seedRatings() {
  await connectDB(process.env.DB_CONNECT);
  try {
    const created = await Rating.create(ratings);
    console.log(created);
    console.log('Ratings created!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
}

async function deleteRatings() {
  await connectDB(process.env.DB_CONNECT);
  try {
    await Rating.deleteMany();
    console.log('Ratings destroyed...'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
}

if (process.argv[2] === '-create') {
  seedRatings();
} else if (process.argv[2] === '-destroy') {
  deleteRatings();
}
