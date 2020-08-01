import React, { useReducer } from 'react';
import { axiosJson } from '../../config/axios';
import ReportsContext from './reportsContext';
import reportsReducer from './reportsReducer';
import { State, ReportFormData, Report } from '../../types/reports';

export const ReportsState: React.FC = ({ children }) => {
  const initialState: State = {
    reportsData: [],
    myReportsData: [],
    current: null,
    loading: false,
    error: null,
    setLoading: () => null,
    getReports: () => null,
    getMyReports: () => null,
    getReport: () => null,
    deleteReport: () => null,
    addReport: () => null,
    setCurrent: () => null,
    clearCurrent: () => null,
  };

  const [state, dispatch] = useReducer(reportsReducer, initialState);

  // Set loading
  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    });
  };

  // Set current
  const setCurrent = (report: Report) => {
    dispatch({
      type: 'SET_CURRENT',
      payload: report,
    });
  };

  // Clear current
  const clearCurrent = () => {
    dispatch({
      type: 'CLEAR_CURRENT',
    });
  };

  // Get reports
  const getReports = async () => {
    setLoading();

    const reportsURI = '/api/v1/reports';

    try {
      const res = await axiosJson.get(reportsURI);
      dispatch({
        type: 'GET_REPORTS_SUCCESS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'REPORTS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Get my reports
  const getMyReports = async () => {
    setLoading();

    try {
      const res = await axiosJson.get('/api/v1/reports/my');
      dispatch({
        type: 'GET_MY_REPORTS_SUCCESS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'REPORTS_ERROR',
        payload: 'err.response.data.error',
      });
    }
  };

  // Get report
  const getReport = async (id: string) => {
    setLoading();

    try {
      const res = await axiosJson.get(`/api/v1/reports/${id}`);
      dispatch({
        type: 'GET_REPORT_SUCCESS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'REPORTS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Create new report
  const addReport = async (report: ReportFormData) => {
    setLoading();

    try {
      await axiosJson.post('/api/v1/reports', report);
      dispatch({
        type: 'CREATE_REPORT_SUCCESS',
      });
    } catch (err) {
      dispatch({
        type: 'REPORTS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Delete report
  const deleteReport = async (id: string) => {
    setLoading();

    try {
      await axiosJson.delete(`/api/v1/reports/${id}`);
      dispatch({
        type: 'DELETE_REPORT_SUCCESS',
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: 'REPORTS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  const { reportsData, myReportsData, current, loading, error } = state;

  return (
    <ReportsContext.Provider
      value={{
        reportsData,
        myReportsData,
        current,
        loading,
        error,
        setLoading,
        getReports,
        getMyReports,
        getReport,
        deleteReport,
        addReport,
        setCurrent,
        clearCurrent,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};
