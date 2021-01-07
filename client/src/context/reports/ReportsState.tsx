import React, { useReducer } from 'react';
import { axiosJson } from '../../config/axios';
import ReportsContext from './reportsContext';
import reportsReducer from './reportsReducer';
import {
  State,
  Report,
  ReportFormData,
  ReportsFilterData,
} from '../../types/reports';
import { initialPaginatedData } from '../../data';
import { SortingOrder } from '../../types/common';

export const ReportsState: React.FC = ({ children }) => {
  const initialState: State = {
    reportsData: initialPaginatedData,
    reportData: null,
    current: null,
    loading: false,
    error: null,
    message: null,
    setLoading: () => null,
    clearErrors: () => null,
    clearMessage: () => null,
    getReports: () => null,
    getReport: () => null,
    deleteReport: () => null,
    addReport: () => null,
    editReport: () => null,
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
    console.log('setting current report');
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
  const getReports = async (
    page = 1,
    limit = 20,
    sort = '-createdAt',
    order: SortingOrder,
    filters: ReportsFilterData,
  ) => {
    setLoading();
    const orderSign = order === 'desc' ? '-' : '';

    let reportsURI = `/api/v1/reports?page=${page}&limit=${limit}&sort=${orderSign}${sort}`;

    if (filters.player) {
      reportsURI = reportsURI.concat(`&player=${filters.player}`);
    }

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
      const res = await axiosJson.post('/api/v1/reports', report);
      dispatch({
        type: 'CREATE_REPORT_SUCCESS',
        payload: { report: res.data.data, message: res.data.message },
      });
    } catch (err) {
      dispatch({
        type: 'REPORTS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Update report
  const editReport = async (id: string, report: ReportFormData) => {
    setLoading();

    try {
      const res = await axiosJson.put(`/api/v1/reports/${id}`, report);
      dispatch({
        type: 'UPDATE_REPORT_SUCCESS',
        payload: { report: res.data.data, message: res.data.message },
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
      const res = await axiosJson.delete(`/api/v1/reports/${id}`);
      dispatch({
        type: 'DELETE_REPORT_SUCCESS',
        payload: { id, message: res.data.message },
      });
    } catch (err) {
      dispatch({
        type: 'REPORTS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Clear errors
  const clearErrors = () =>
    dispatch({
      type: 'CLEAR_ERRORS',
    });

  // Clear message
  const clearMessage = () =>
    dispatch({
      type: 'CLEAR_MESSAGE',
    });

  const { reportsData, reportData, current, loading, error, message } = state;

  return (
    <ReportsContext.Provider
      value={{
        reportsData,
        reportData,
        current,
        loading,
        error,
        message,
        setLoading,
        getReports,
        getReport,
        deleteReport,
        addReport,
        editReport,
        setCurrent,
        clearCurrent,
        clearErrors,
        clearMessage,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};
