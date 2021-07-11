import { State, Action } from './types';

export default (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_DEFAULT_REPORT_BACKGROUND_IMAGE_URL':
      return {
        ...state,
        defaultReportBackgroundImageUrl: action.payload,
      };

    case 'SET_DEFAULT_REPORT_TEMPLATE_ID':
      return {
        ...state,
        defaultReportTemplateId: action.payload,
      };

    default:
      return state;
  }
};
