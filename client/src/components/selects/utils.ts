import { NoteBasicInfo } from '../../types/notes';
import { ReportBasicInfo } from '../../types/reports';
import { getLabel } from '../../utils/getLabel';

export function getNoteLabelById(id: string, notes: NoteBasicInfo[]) {
  const note = notes.find((item) => item.id === id);
  if (note) {
    const { player, docNumber, shirtNo } = note;

    return `${
      player
        ? `${player.firstName} ${player.lastName} ur. ${
            player.yearOfBirth
          }, ${getLabel(player.position)} (notatka nr ${docNumber})`
        : `zawodnik nr ${shirtNo || 'N/A'} (notatka nr ${docNumber})`
    }`;
  }
  return 'nieznana notatka';
}

export function getReportLabelById(id: string, reports: ReportBasicInfo[]) {
  const report = reports.find((item) => item.id === id);
  if (report) {
    const { player, docNumber, shirtNo } = report;

    return `${
      player
        ? `${player.firstName} ${player.lastName} ur. ${
            player.yearOfBirth
          }, ${getLabel(player.position)} (raport nr ${docNumber})`
        : `zawodnik nr ${shirtNo || 'N/A'} (raport nr ${docNumber})`
    }`;
  }
  return 'nieznay raport';
}
