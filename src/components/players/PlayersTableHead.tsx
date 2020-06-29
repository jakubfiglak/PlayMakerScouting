import React from 'react';
import { TableHead } from '@material-ui/core';
import TableRow from '../common/TableRow/TableRow';
import TableCell from '../common/TableCell/TableCell';

const PlayersTableHead: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Nazwisko i Imię</TableCell>
        <TableCell>Klub</TableCell>
        <TableCell>Pozycja</TableCell>
        <TableCell>Data urodzenia</TableCell>
        <TableCell>Wzrost [cm]</TableCell>
        <TableCell>Waga [kg]</TableCell>
        <TableCell>Noga</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default PlayersTableHead;
