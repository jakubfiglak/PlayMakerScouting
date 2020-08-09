import {
  ReportFormData,
  FormattedReportFormData,
  IndividualSkills,
  TeamplaySkills,
  RatingScore,
} from '../types/reports';
import { individualSkills, teamplaySkills } from '../data';

export const formatReportObject = (
  formObject: ReportFormData,
): FormattedReportFormData => {
  const {
    order,
    player,
    match,
    minutesPlayed,
    goals,
    assists,
    yellowCards,
    redCards,
    finalRating,
    summary,
    leading,
    neglected,
  } = formObject;

  const dbObject: FormattedReportFormData = {
    order,
    player,
    match,
    minutesPlayed,
    goals,
    assists,
    yellowCards,
    redCards,
    finalRating,
    summary,
    motorSkills: {
      leading,
      neglected,
    },
    individualSkills: {
      ballReception: {
        rating: 0,
        note: '',
      },
      holdPass: {
        rating: 0,
        note: '',
      },
      gainPass: {
        rating: 0,
        note: '',
      },
      keyPass: {
        rating: 0,
        note: '',
      },
      defOneOnOne: {
        rating: 0,
        note: '',
      },
      airPlay: {
        rating: 0,
        note: '',
      },
      positioning: {
        rating: 0,
        note: '',
      },
      attOneOnOne: {
        rating: 0,
        note: '',
      },
      finishing: {
        rating: 0,
        note: '',
      },
    },
    teamplaySkills: {
      attack: {
        rating: 0,
        note: '',
      },
      defense: {
        rating: 0,
        note: '',
      },
      transition: {
        rating: 0,
        note: '',
      },
    },
  };

  Object.keys(formObject).forEach((key) => {
    if (key.includes('Note')) {
      const base = key.slice(0, key.length - 4);

      if (individualSkills.includes(base)) {
        const indBase = base as keyof IndividualSkills;

        const ratingKey = `${indBase}Rating` as keyof ReportFormData;
        const noteKey = key as keyof ReportFormData;

        dbObject.individualSkills[indBase] = {
          rating: formObject[ratingKey] as RatingScore,
          note: formObject[noteKey] as string,
        };
      } else if (teamplaySkills.includes(base)) {
        const teamBase = base as keyof TeamplaySkills;

        const ratingKey = `${teamBase}Rating` as keyof ReportFormData;
        const noteKey = key as keyof ReportFormData;

        dbObject.teamplaySkills[teamBase] = {
          rating: formObject[ratingKey] as RatingScore,
          note: formObject[noteKey] as string,
        };
      }
    }
  });

  return dbObject;
};
