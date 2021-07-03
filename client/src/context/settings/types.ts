export type State = {
  defaultReportBackgroundImageUrl: string;
  defaultReportTemplateId: string;
  setDefaultReportBackgroundImageUrl: (url: string) => void;
  setDefaultReportTemplateId: (id: string) => void;
};

export type Action =
  | { type: 'SET_DEFAULT_REPORT_BACKGROUND_IMAGE_URL'; payload: string }
  | { type: 'SET_DEFAULT_REPORT_TEMPLATE_ID'; payload: string };
