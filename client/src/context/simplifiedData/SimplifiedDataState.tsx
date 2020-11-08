import React, { useReducer } from 'react';
import { axiosJson } from '../../config/axios';
import SimplifiedDataContext from './simplifiedDataContext';
import simplifiedDataReducer from './simplifiedDataReducer';
import { State } from '../../types/simplifiedData';

export const SimplifiedDataState: React.FC = ({ children }) => {
  const initialState: State = {
    playersData: [],
    clubsData: [],
    myClubsData: [],
    myOrdersData: [],
    loading: false,
    error: null,
    setLoading: () => null,
    getPlayers: () => null,
    getClubs: () => null,
    getMyClubs: () => null,
    getMyOrders: () => null,
  };

  const [state, dispatch] = useReducer(simplifiedDataReducer, initialState);

  // Set loading
  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    });
  };

  // Get players
  const getPlayers = async () => {
    setLoading();
    try {
      const res = await axiosJson.get('/api/v1/players/list');
      dispatch({
        type: 'GET_PLAYERS_SUCCESS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'SIMPLIFIED_DATA_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Get clubs
  const getClubs = async () => {
    setLoading();
    try {
      const res = await axiosJson.get('/api/v1/clubs/list');
      dispatch({
        type: 'GET_CLUBS_SUCCESS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'SIMPLIFIED_DATA_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Get my clubs
  const getMyClubs = async () => {
    setLoading();
    try {
      const res = await axiosJson.get('/api/v1/clubs/mylist');
      dispatch({
        type: 'GET_MY_CLUBS_SUCCESS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'SIMPLIFIED_DATA_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Get my orders
  const getMyOrders = async () => {
    setLoading();
    try {
      const res = await axiosJson.get('/api/v1/orders/mylist');
      dispatch({
        type: 'GET_MY_ORDERS_SUCCESS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'SIMPLIFIED_DATA_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  const {
    playersData,
    clubsData,
    myClubsData,
    myOrdersData,
    loading,
    error,
  } = state;

  return (
    <SimplifiedDataContext.Provider
      value={{
        playersData,
        clubsData,
        myClubsData,
        myOrdersData,
        loading,
        error,
        setLoading,
        getPlayers,
        getClubs,
        getMyClubs,
        getMyOrders,
      }}
    >
      {children}
    </SimplifiedDataContext.Provider>
  );
};
