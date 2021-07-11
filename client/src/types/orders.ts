import { User } from './auth';
import { Player } from './players';

export type OrderStatus = 'open' | 'accepted' | 'closed';

export type Order = {
  id: string;
  docNumber: string;
  player: Pick<Player, 'id' | 'firstName' | 'lastName' | 'position' | 'club'>;
  status: 'open' | 'accepted' | 'closed';
  scout?: Pick<User, 'id' | 'firstName' | 'lastName'>;
  createdAt: string;
  acceptDate?: string;
  closeDate?: string;
  notes?: string;
};

export type OrderBasicInfo = Pick<Order, 'id' | 'player' | 'docNumber'>;

export type OrderDTO = {
  player: string;
  notes?: string;
};

export type OrdersFilterData = {
  player: string;
  status: OrderStatus | '';
  createdAfter: string;
  createdBefore: string;
};
