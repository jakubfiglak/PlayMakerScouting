import * as yup from 'yup';
import { Note, NoteDTO } from '../../types/notes';
import { PlayerBasicInfo, Position } from '../../types/players';
import { MatchBasicInfo } from '../../types/matches';

export const validationSchema: yup.ObjectSchema<NoteDTO> = yup
  .object({
    player: yup.string().nullable(),
    match: yup.string().nullable(),
    positionPlayed: yup.mixed<Position>().required(),
    shirtNo: yup
      .number()
      .min(1, 'Numer na koszulce musi być większy lub równy 1')
      .max(99, 'Numer na koszulce musi być mniejszy lub równy 99'),
    maxRatingScore: yup.number().min(2).max(10).required(),
    rating: yup.number().min(1).max(10).required(),
    text: yup.string().required('Wpisz treść notatki'),
  })
  .defined();

export function getInitialStateFromCurrent(note: Note): NoteDTO {
  const {
    author,
    createdAt,
    id,
    docNumber,
    percentageRating,
    updatedAt,
    ...rest
  } = note;

  return {
    ...rest,
    player: rest.player?.id,
    match: rest.match?.id,
  };
}

type GetPlayersMatchesArgs = {
  playerId: string;
  players: PlayerBasicInfo[];
  matches: MatchBasicInfo[];
};

export function getPlayersMatches({
  playerId,
  players,
  matches,
}: GetPlayersMatchesArgs) {
  const selectedPlayer = players.find((player) => player.id === playerId);

  if (selectedPlayer) {
    return matches.filter(
      (match) =>
        match.homeTeam.id === selectedPlayer.club.id ||
        match.awayTeam.id === selectedPlayer.club.id,
    );
  }

  return [];
}

type GetMatchesPlayers = {
  matchId: string;
  matches: MatchBasicInfo[];
  players: PlayerBasicInfo[];
};

export function getMatchesPlayers({
  matchId,
  matches,
  players,
}: GetMatchesPlayers) {
  const selectedMatch = matches.find((match) => match.id === matchId);

  if (selectedMatch) {
    return players.filter(
      (player) =>
        player.club.id === selectedMatch.homeTeam.id ||
        player.club.id === selectedMatch.awayTeam.id,
    );
  }

  return [];
}
