import React, { useReducer } from 'react';
import { axiosJson } from '../../config/axios';
import ClubsContext from './clubsContext';
import clubsReducer from './clubsReducer';
import { State, Club } from '../../types/clubs';
import { Order } from '../../types/common';

const ClubsState: React.FC = ({ children }) => {
  const initialState: State = {
    clubsData: {
      data: [],
      total: 0,
      pagination: {},
    },
    current: null,
    loading: false,
    error: null,
    setLoading: () => null,
    getClubs: () => null,
    getClub: () => null,
    deleteClub: () => null,
    addClub: () => null,
    editClub: () => null,
    setCurrent: () => null,
    clearCurrent: () => null,
  };

  const [state, dispatch] = useReducer(clubsReducer, initialState);

  // Set loading
  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    });
  };

  // Get clubs
  const getClubs = async () => {
    try {
      const res = await axiosJson.get('/api/v1/clubs');
      dispatch({
        type: 'GET_CLUBS_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'CLUBS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Get clubs in active radius

  // Get club
  const getClub = async (id: string) => {
    try {
      const res = await axiosJson.get(`/api/v1/clubs/${id}`);
      dispatch({
        type: 'GET_CLUB_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'CLUBS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Create new club
  const addClub = async (club: Club) => {
    setLoading();

    try {
      await axiosJson.post('/api/v1/players', club);
      dispatch({
        type: 'CREATE_CLUB_SUCCESS',
      });
    } catch (err) {
      dispatch({
        type: 'CLUBS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Set current
  const setCurrent = (club: Club) => {
    dispatch({
      type: 'SET_CURRENT',
      payload: club,
    });
  };

  // Clear current
  const clearCurrent = () => {
    dispatch({
      type: 'CLEAR_CURRENT',
    });
  };

  // Update club details
  const editClub = async (club: Club) => {
    setLoading();

    try {
      await axiosJson.put(`/api/v1/players/${club._id}`, club);
      dispatch({
        type: 'UPDATE_CLUB_SUCCESS',
      });
    } catch (err) {
      dispatch({
        type: 'CLUBS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Delete club
  const deleteClub = async (id: string) => {
    setLoading();
    try {
      await axiosJson.delete(`/api/v1/clubs/${id}`);
      dispatch({
        type: 'DELETE_CLUB_SUCCESS',
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: 'CLUBS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  return (
    <ClubsContext.Provider
      value={{
        clubsData: state.clubsData,
        current: state.current,
        loading: state.loading,
        error: state.error,
        setLoading,
        getClubs,
        getClub,
        deleteClub,
        addClub,
        setCurrent,
        clearCurrent,
        editClub,
      }}
    >
      {children}
    </ClubsContext.Provider>
  );
};

export default ClubsState;
