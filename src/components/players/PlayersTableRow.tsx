import React from 'react';
import { Player } from '../../types/players';
import TableRow from '../common/TableRow/TableRow';
import TableCell from '../common/TableCell/TableCell';

const PlayersTableRow: React.FC<Player> = ({
  firstName,
  lastName,
  club,
  position,
  dateOfBirth,
  height,
  weight,
  footed,
}) => {
  const formattedDate = new Intl.DateTimeFormat('pl-PL').format(
    new Date(dateOfBirth),
  );

  return (
    <TableRow>
      <TableCell>{lastName}</TableCell>
      <TableCell>{firstName}</TableCell>
      <TableCell>{club.name}</TableCell>
      <TableCell>{position}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>{height}</TableCell>
      <TableCell>{weight}</TableCell>
      <TableCell>{footed}</TableCell>
    </TableRow>
  );
};

export default PlayersTableRow;
