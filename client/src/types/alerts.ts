export type AlertType = 'success' | 'error' | 'warning' | 'info';

export type Alert = {
  id: string;
  msg: string;
  type: AlertType;
};

export type State = {
  alerts: Alert[];
  setAlert: (msg: string, type: AlertType, timeout?: number) => void;
};

export type Action =
  | { type: 'SET_ALERT'; payload: Alert }
  | { type: 'REMOVE_ALERT'; payload: string };
