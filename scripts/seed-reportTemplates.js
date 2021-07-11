const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('../config/db');
const ReportTemplate = require('../modules/reportTemplates/reportTemplate.model');

dotenv.config({ path: './config/config.env' });

const author = '6047f176c5d45231a400ef8a';

const ballReceptionId = '6091a737f353fb3e78f2c765';
const passingId = '6091a737f353fb3e78f2c766';
const defOneOnOneId = '6091a737f353fb3e78f2c767';
const airPlayId = '6091a737f353fb3e78f2c768';
const positioningId = '6091a737f353fb3e78f2c769';
const attOneOnOneId = '6091a737f353fb3e78f2c76a';
const finishingId = '6091a737f353fb3e78f2c76b';
const attackId = '6091a737f353fb3e78f2c76a';
const defenseId = '6091a737f353fb3e78f2c76d';
const transitionId = '6091a737f353fb3e78f2c76e';
const leadingMotorId = '6091a737f353fb3e78f2c76f';
const neglectedMotorId = '6091a737f353fb3e78f2c770';
const noBallId = '6091a737f353fb3e78f2c771';
const openingId = '6091a737f353fb3e78f2c772';
const creationId = '6091a737f353fb3e78f2c773';
const finalizationId = '6091a737f353fb3e78f2c774';
const aoTransitionId = '6091a737f353fb3e78f2c775';
const onevonetwoId = '6091a737f353fb3e78f2c776';
const spaceDefId = '6091a737f353fb3e78f2c777';
const pressId = '6091a737f353fb3e78f2c778';
const oaTransitionId = '6091a737f353fb3e78f2c779';
const motorCharId = '6091a737f353fb3e78f2c77a';
const mentalCharId = '6091a737f353fb3e78f2c77b';

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
  CBreportTemplate,
  FBreportTemplate,
  midfielderReportTemplate,
  forwardReportTemplate,
  OOTemplate,
];

async function seedReportTemplates() {
  await connectDB(process.env.PRODUCTION_DB_CONNECT);
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
  await connectDB(process.env.PRODUCTION_DB_CONNECT);
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
