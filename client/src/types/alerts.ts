export type AlertType = 'success' | 'error' | 'warning' | 'info';

export type Alert = {
  id: string;
  msg: string;
  type: AlertType;
  isVisible: boolean;
};

export type SetAlertParams = Omit<Alert, 'isVisible' | 'id'> & {
  timeout?: number;
};

export type State = {
  alerts: Alert[];
  setAlert: (params: SetAlertParams) => void;
};

export type Action =
  | { type: 'SET_ALERT'; payload: Alert }
  | { type: 'HIDE_ALERT'; payload: string }
  | { type: 'REMOVE_ALERT'; payload: string };
