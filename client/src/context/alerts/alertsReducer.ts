import { State, Action } from '../../types/alerts';

export default (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_ALERT':
      return {
        ...state,
        alerts: [...state.alerts, action.payload],
      };

    case 'HIDE_ALERT':
      return {
        ...state,
        alerts: state.alerts.map((alert) =>
          alert.id === action.payload
            ? {
                ...alert,
                isVisible: false,
              }
            : alert,
        ),
      };

    case 'REMOVE_ALERT':
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.payload),
      };

    default:
      return state;
  }
};
