import { Order } from './orders';
import { Report } from './reports';

export type DashboardData = {
  clubsCount: number;
  playersCount: number;
  highestRatedReport: Report | null;
  latestReport: Report | null;
  reportsCount: number;
  latestOrder: Order | null;
  acceptedOrdersCount: number | null;
  closedOrdersCount: number | null;
};
