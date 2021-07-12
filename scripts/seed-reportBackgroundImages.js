const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('../config/db');
const ReportBackgroundImage = require('../modules/reportBackgroundImages/reportBackgroundImage.model');

dotenv.config({ path: './config/config.env' });

const reportBackgroundImages = [
  {
    name: 'Playmaker Default',
    url:
      'https://res.cloudinary.com/dqlzeo8jx/image/upload/v1622985795/PlaymakerScouting/report_background_uw6uoe.png',
    isPublic: true,
  },
  {
    name: 'Odra Opole',
    url:
      'https://res.cloudinary.com/dqlzeo8jx/image/upload/v1623350864/PlaymakerScouting/odra_jmuxmh.jpg',
    isPublic: false,
  },
];

async function seedReportBackgroundImages() {
  await connectDB(process.env.PRODUCTION_DB_CONNECT);
  try {
    const created = await ReportBackgroundImage.create(reportBackgroundImages);
    console.log(created);
    console.log('Report background images created!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
}

async function deleteReportBackgroundImages() {
  await connectDB(process.env.PRODUCTION_DB_CONNECT);
  try {
    await ReportBackgroundImage.deleteMany();
    console.log('Report background images destroyed...'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
}

if (process.argv[2] === '-create') {
  seedReportBackgroundImages();
} else if (process.argv[2] === '-destroy') {
  deleteReportBackgroundImages();
}
