import React, { useReducer } from 'react';
import { axiosJson } from '../../config/axios';
import ClubsContext from './clubsContext';
import clubsReducer from './clubsReducer';
import { State, Club, ClubsFilterData, ClubsFormData } from '../../types/clubs';
import { Order } from '../../types/common';
import { initialPaginatedData } from '../../data';

export const ClubsState: React.FC = ({ children }) => {
  const initialState: State = {
    clubsData: initialPaginatedData,
    myClubsData: initialPaginatedData,
    current: null,
    loading: false,
    error: null,
    message: null,
    setLoading: () => null,
    clearErrors: () => null,
    clearMessage: () => null,
    getClubs: () => null,
    getClub: () => null,
    addClub: () => null,
    editClub: () => null,
    setCurrent: () => null,
    clearCurrent: () => null,
    addClubToFavorites: () => null,
    removeClubFromFavorites: () => null,
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
    my?: boolean,
  ) => {
    setLoading();
    const orderSign = order === 'desc' ? '-' : '';

    const { name, division, voivodeship } = filters;

    // Generate query url
    let clubsURI = '/api/v1/clubs';

    if (my) {
      clubsURI = clubsURI.concat('/my');
    }

    clubsURI = clubsURI.concat(
      `?page=${page}&limit=${limit}&sort=${orderSign}${sort}`,
    );

    if (name) {
      clubsURI = clubsURI.concat(`&name[regex]=${name}`);
    }

    if (division) {
      clubsURI = clubsURI.concat(`&division=${division}`);
    }

    if (voivodeship) {
      clubsURI = clubsURI.concat(`&address.voivodeship[regex]=${voivodeship}`);
    }

    try {
      const res = await axiosJson.get(clubsURI);
      if (my) {
        dispatch({
          type: 'GET_MY_CLUBS_SUCCESS',
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: 'GET_CLUBS_SUCCESS',
          payload: res.data.data,
        });
      }
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
      const res = await axiosJson.post('/api/v1/clubs', club);
      dispatch({
        type: 'CREATE_CLUB_SUCCESS',
        payload: { club: res.data.data, message: res.data.message },
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
      const res = await axiosJson.put(`/api/v1/clubs/${id}`, club);
      dispatch({
        type: 'UPDATE_CLUB_SUCCESS',
        payload: { club: res.data.data, message: res.data.message },
      });
    } catch (err) {
      dispatch({
        type: 'CLUBS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Add club to favorites
  const addClubToFavorites = async (id: string) => {
    setLoading();

    try {
      const res = await axiosJson.post(`/api/v1/clubs/${id}/addtofavorites`);
      dispatch({
        type: 'ADD_CLUB_TO_FAVORITES_SUCCESS',
        payload: { club: res.data.data, message: res.data.message },
      });
    } catch (err) {
      dispatch({
        type: 'CLUBS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Remove club from favorites
  const removeClubFromFavorites = async (id: string) => {
    setLoading();

    try {
      const res = await axiosJson.post(
        `/api/v1/clubs/${id}/removefromfavorites`,
      );
      dispatch({
        type: 'REMOVE_CLUB_FROM_FAVORITES_SUCCESS',
        payload: { id: res.data.data, message: res.data.message },
      });
    } catch (err) {
      dispatch({
        type: 'CLUBS_ERROR',
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

  const { clubsData, myClubsData, current, loading, error, message } = state;

  return (
    <ClubsContext.Provider
      value={{
        clubsData,
        myClubsData,
        current,
        loading,
        error,
        message,
        setLoading,
        getClubs,
        getClub,
        addClub,
        setCurrent,
        clearCurrent,
        editClub,
        addClubToFavorites,
        removeClubFromFavorites,
        clearErrors,
        clearMessage,
      }}
    >
      {children}
    </ClubsContext.Provider>
  );
};
