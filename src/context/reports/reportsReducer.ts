import { State, Action } from '../../types/reports';

export default (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };

    case 'GET_REPORTS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        reportsData: action.payload,
      };

    case 'GET_MY_REPORTS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        myReportsData: action.payload,
      };

    case 'CREATE_REPORT_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      };

    case 'DELETE_REPORT_SUCCESS':
      return {
        ...state,
        reportsData: state.reportsData.filter(
          (report) => report._id !== action.payload,
        ),
        loading: false,
        error: null,
      };

    case 'REPORTS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
