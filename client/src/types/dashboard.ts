import { Note } from './notes';
import { Order } from './orders';
import { Report } from './reports';

export type DashboardData = {
  clubsCount: number;
  playersCount: number;
  highestRatedReport: Report | null;
  latestReport: Report | null;
  totalReportsCount: number;
  userReportsCount: number;
  latestNote: Note | null;
  totalNotesCount: number;
  userNotesCount: number;
  latestOrder: Order | null;
  acceptedOrdersCount: number | null;
  closedOrdersCount: number | null;
};

export type LandingData = {
  totalReportsCount: number;
  totalNotesCount: number;
  totalUsersCount: number;
};
