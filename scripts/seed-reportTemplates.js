const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('../config/db');
const Rating = require('../modules/ratings/rating.model');
const ReportTemplate = require('../modules/reportTemplates/reportTemplate.model');

dotenv.config({ path: './config/config.env' });

const author = '5d7a514b5d2c12c7449be042';

const ballReceptionId = '6081d38bcf09362604154264';
const passingId = '6081d38bcf09362604154265';
const defOneOnOneId = '6081d38bcf09362604154266';
const airPlayId = '6081d38bcf09362604154267';
const positioningId = '6081d38bcf09362604154268';
const attOneOnOneId = '6081d38bcf09362604154269';
const finishingId = '6081d38bcf0936260415426a';
const attackId = '6081d38bcf0936260415426b';
const defenseId = '6081d38bcf0936260415426c';
const transitionId = '6081d38bcf0936260415426d';
const leadingMotorId = '6081d38bcf0936260415426e';
const neglectedMotorId = '6081d38bcf0936260415426f';
const noBallId = '609198d57f0a8063a06149e0';
const openingId = '609198d57f0a8063a06149e1';
const creationId = '609198d57f0a8063a06149e2';
const finalizationId = '609198d57f0a8063a06149e3';
const aoTransitionId = '609198d57f0a8063a06149e4';
const onevonetwoId = '609198d57f0a8063a06149e5';
const spaceDefId = '609198d57f0a8063a06149e6';
const pressId = '609198d57f0a8063a06149e7';
const oaTransitionId = '609198d57f0a8063a06149e8';
const motorCharId = '609198d57f0a8063a06149e9';
const mentalCharId = '609198d57f0a8063a06149ea';

const oldReportCommonFields = [
  leadingMotorId,
  neglectedMotorId,
  passingId,
  ballReceptionId,
  attackId,
  defenseId,
  transitionId,
];

const CBfields = [...oldReportCommonFields, defOneOnOneId, airPlayId, positioningId];
const FBfields = [...oldReportCommonFields, defOneOnOneId, attOneOnOneId, airPlayId];
const midfielderFields = [...oldReportCommonFields, finishingId, attOneOnOneId, defOneOnOneId];
const forwardFields = [...oldReportCommonFields, finishingId, airPlayId, attOneOnOneId];
const OOtemplateFields = [
  noBallId,
  openingId,
  creationId,
  finalizationId,
  aoTransitionId,
  onevonetwoId,
  spaceDefId,
  pressId,
  oaTransitionId,
  motorCharId,
  mentalCharId,
];

const CBreportTemplate = {
  name: 'PM - Srodkowy obronca',
  author,
  ratings: CBfields,
  maxRatingScore: 4,
  private: false,
};

const FBreportTemplate = {
  name: 'PM - Boczny obronca',
  author,
  ratings: FBfields,
  maxRatingScore: 4,
  private: false,
};

const midfielderReportTemplate = {
  name: 'PM - pomocnik',
  author,
  ratings: midfielderFields,
  maxRatingScore: 4,
  private: false,
};

const forwardReportTemplate = {
  name: 'PM - napastnik',
  author,
  ratings: forwardFields,
  maxRatingScore: 4,
  private: false,
};

const OOTemplate = {
  name: 'Odra Opole',
  author,
  ratings: OOtemplateFields,
  maxRatingScore: 4,
  private: false,
};

const reportTemplates = [
  // CBreportTemplate,
  // FBreportTemplate,
  // midfielderReportTemplate,
  // forwardReportTemplate,
  OOTemplate,
];

async function seedReportTemplates() {
  await connectDB(process.env.DB_CONNECT);
  try {
    const created = await ReportTemplate.create(reportTemplates);
    console.log(created);
    console.log('Report templates created!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
}

async function deleteReportTemplates() {
  await connectDB(process.env.DB_CONNECT);
  try {
    await ReportTemplate.deleteMany();
    console.log('Ratings destroyed...'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
}

if (process.argv[2] === '-create') {
  seedReportTemplates();
} else if (process.argv[2] === '-destroy') {
  deleteReportTemplates();
}
