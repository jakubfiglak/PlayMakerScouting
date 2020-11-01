import React, { useReducer } from 'react';
import { axiosJson } from '../../config/axios';
import MatchesContext from './matchesContext';
import matchesReducer from './matchesReducer';
import {
  State,
  Match,
  MatchesFormData,
  MatchesFilterData,
} from '../../types/matches';
import { Order } from '../../types/common';
import { initialPaginatedData } from '../../data';

export const MatchesState: React.FC = ({ children }) => {
  const initialState: State = {
    matchesData: initialPaginatedData,
    current: null,
    loading: false,
    error: null,
    message: null,
    setLoading: () => null,
    clearErrors: () => null,
    clearMessage: () => null,
    getMatches: () => null,
    getMatch: () => null,
    addMatch: () => null,
    editMatch: () => null,
    setCurrent: () => null,
    clearCurrent: () => null,
  };

  const [state, dispatch] = useReducer(matchesReducer, initialState);

  // Set loading
  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    });
  };

  // Get matches
  const getMatches = async (
    page = 1,
    limit = 20,
    sort = 'date',
    order: Order = 'desc',
    filters: MatchesFilterData,
  ) => {
    setLoading();
    const orderSign = order === 'desc' ? '-' : '';

    const { homeTeam, awayTeam, competition, dateFrom, dateTo } = filters;

    // Generate query url
    let matchesURI = `/api/v1/matches?page=${page}&limit=${limit}&sort=${orderSign}${sort}&date[gte]=${dateFrom}&date[lte]=${dateTo}`;

    // Add filters to query url
    if (homeTeam) {
      matchesURI = matchesURI.concat(`&homeTeam=${homeTeam}`);
    }

    if (awayTeam) {
      matchesURI = matchesURI.concat(`&awayTeam=${awayTeam}`);
    }

    if (competition) {
      matchesURI = matchesURI.concat(`&competition=${competition}`);
    }

    try {
      const res = await axiosJson.get(matchesURI);
      dispatch({
        type: 'GET_MATCHES_SUCCESS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'MATCHES_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Get match
  const getMatch = async (id: string) => {
    try {
      const res = await axiosJson.get(`/api/v1/matches/${id}`);
      dispatch({
        type: 'GET_MATCHES_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'MATCHES_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Create new match
  const addMatch = async (match: MatchesFormData) => {
    setLoading();

    try {
      const res = await axiosJson.post('/api/v1/matches', match);
      dispatch({
        type: 'CREATE_MATCH_SUCCESS',
        payload: { match: res.data.data, message: res.data.message },
      });
    } catch (err) {
      dispatch({
        type: 'MATCHES_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Set current
  const setCurrent = (match: Match) => {
    dispatch({
      type: 'SET_CURRENT',
      payload: match,
    });
  };

  // Clear current
  const clearCurrent = () => {
    dispatch({
      type: 'CLEAR_CURRENT',
    });
  };

  // Update match details
  const editMatch = async (id: string, match: MatchesFormData) => {
    setLoading();

    try {
      const res = await axiosJson.put(`/api/v1/matches/${id}`, match);
      dispatch({
        type: 'UPDATE_MATCH_SUCCESS',
        payload: { match: res.data.data, message: res.data.message },
      });
    } catch (err) {
      dispatch({
        type: 'MATCHES_ERROR',
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

  const { matchesData, current, loading, error, message } = state;

  return (
    <MatchesContext.Provider
      value={{
        matchesData,
        current,
        loading,
        error,
        message,
        setLoading,
        clearErrors,
        clearMessage,
        getMatches,
        getMatch,
        addMatch,
        setCurrent,
        clearCurrent,
        editMatch,
      }}
    >
      {children}
    </MatchesContext.Provider>
  );
};
