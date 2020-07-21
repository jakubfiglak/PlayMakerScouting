import React, { useReducer } from 'react';
import { axiosJson } from '../../config/axios';
import ClubsContext from './clubsContext';
import clubsReducer from './clubsReducer';
import { State, Club, ClubsFilterData, ClubsFormData } from '../../types/clubs';
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
  const getClubs = async (
    page = 1,
    limit = 20,
    sort = '_id',
    order: Order,
    filters: ClubsFilterData,
  ) => {
    setLoading();
    const orderSign = order === 'desc' ? '-' : '';

    const { name, division, voivodeship } = filters;

    // Generate query url
    let clubsURI = `/api/v1/clubs?page=${page}&limit=${limit}&sort=${orderSign}${sort}`;

    if (name) {
      clubsURI = clubsURI.concat(`&name[regex]=${name}`);
    }

    if (division) {
      clubsURI = clubsURI.concat(`&division=${division}`);
    }

    if (voivodeship) {
      clubsURI = clubsURI.concat(`&location.voivodeship[regex]=${voivodeship}`);
    }

    try {
      const res = await axiosJson.get(clubsURI);
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
  const addClub = async (club: ClubsFormData) => {
    setLoading();

    try {
      await axiosJson.post('/api/v1/clubs', club);
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
  const editClub = async (id: string, club: ClubsFormData) => {
    setLoading();

    try {
      await axiosJson.put(`/api/v1/clubs/${id}`, club);
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
