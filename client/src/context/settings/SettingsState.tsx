import React, { useReducer, FC } from 'react';
import SettingsContext from './settingsContext';
import settingsReducer from './settingsReducer';
import { State } from './types';

export const SettingsState: FC = ({ children }) => {
  const initialState: State = {
    defaultReportBackgroundImageUrl:
      localStorage.getItem('defaultReportBackgroundImageUrl') || '',
    defaultReportTemplateId:
      localStorage.getItem('defaultReportTemplateId') || '',
    setDefaultReportBackgroundImageUrl: () => null,
    setDefaultReportTemplateId: () => null,
  };

  const [state, dispatch] = useReducer(settingsReducer, initialState);

  // Set default report background image
  function setDefaultReportBackgroundImageUrl(url: string) {
    localStorage.setItem('defaultReportBackgroundImageUrl', url);
    dispatch({
      type: 'SET_DEFAULT_REPORT_BACKGROUND_IMAGE_URL',
      payload: url,
    });
  }

  // Set default report report template
  function setDefaultReportTemplateId(id: string) {
    localStorage.setItem('defaultReportTemplateId', id);
    dispatch({
      type: 'SET_DEFAULT_REPORT_TEMPLATE_ID',
      payload: id,
    });
  }

  const { defaultReportBackgroundImageUrl, defaultReportTemplateId } = state;

  return (
    <SettingsContext.Provider
      value={{
        defaultReportBackgroundImageUrl,
        defaultReportTemplateId,
        setDefaultReportBackgroundImageUrl,
        setDefaultReportTemplateId,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
