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

    case 'GET_REPORT_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        reportData: action.payload,
      };

    case 'CREATE_REPORT_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        reportsData: {
          ...state.reportsData,
          docs: [action.payload.report, ...state.reportsData.docs],
        },
      };

    case 'UPDATE_REPORT_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        reportsData: {
          ...state.reportsData,
          docs: state.reportsData.docs.map((report) =>
            report._id === action.payload.report._id
              ? action.payload.report
              : report,
          ),
        },
      };

    case 'DELETE_REPORT_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        reportsData: {
          ...state.reportsData,
          docs: state.reportsData.docs.filter(
            (report) => report._id !== action.payload.id,
          ),
        },
      };

    case 'SET_CURRENT':
      return {
        ...state,
        current: action.payload,
      };

    case 'CLEAR_CURRENT':
      return {
        ...state,
        current: null,
      };

    case 'REPORTS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null,
      };

    case 'CLEAR_MESSAGE':
      return {
        ...state,
        message: null,
      };

    default:
      return state;
  }
};
