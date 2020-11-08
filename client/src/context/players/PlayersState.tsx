import React, { useReducer } from 'react';
import { axiosJson } from '../../config/axios';
import PlayersContext from './playersContext';
import playersReducer from './playersReducer';
import {
  State,
  PlayersFilterData,
  PlayersFormData,
  Player,
  GrantAccessFormData,
} from '../../types/players';
import { Order } from '../../types/common';
import { initialPaginatedData } from '../../data';

export const PlayersState: React.FC = ({ children }) => {
  const initialState: State = {
    playersData: initialPaginatedData,
    playerData: null,
    current: null,
    playerMatches: [],
    loading: false,
    error: null,
    message: null,
    setLoading: () => null,
    clearErrors: () => null,
    clearMessage: () => null,
    getPlayers: () => null,
    getPlayer: () => null,
    getPlayerMatches: () => null,
    addPlayer: () => null,
    editPlayer: () => null,
    setCurrent: () => null,
    clearCurrent: () => null,
    grantAccess: () => null,
  };

  const [state, dispatch] = useReducer(playersReducer, initialState);

  // Set loading
  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    });
  };

  // Get players
  const getPlayers = async (
    page = 1,
    limit = 20,
    sort = '_id',
    order: Order,
    filters: PlayersFilterData,
  ) => {
    setLoading();
    const orderSign = order === 'desc' ? '-' : '';

    // Generate query url
    let playersURI = `/api/v1/players?page=${page}&limit=${limit}&sort=${orderSign}${sort}`;

    // Add filters to query url
    Object.entries(filters).forEach(([key, value]) => {
      const filter = `&${key}=${value}`;
      if (value.length) {
        playersURI = playersURI.concat(filter);
      }
    });

    try {
      const res = await axiosJson.get(playersURI);
      dispatch({
        type: 'GET_PLAYERS_SUCCESS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'PLAYERS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Get player
  const getPlayer = async (id: string) => {
    setLoading();

    try {
      const res = await axiosJson.get(`/api/v1/players/${id}`);

      dispatch({
        type: 'GET_PLAYER_SUCCESS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'PLAYERS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Get matches for a player
  const getPlayerMatches = async (id: string) => {
    setLoading();

    try {
      const res = await axiosJson.get(`/api/v1/players/${id}/matches`);
      dispatch({
        type: 'GET_PLAYER_MATCHES_SUCCESS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'PLAYERS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Create new player
  const addPlayer = async (player: PlayersFormData) => {
    setLoading();

    try {
      const res = await axiosJson.post('/api/v1/players', player);
      dispatch({
        type: 'CREATE_PLAYER_SUCCESS',
        payload: { player: res.data.data, message: res.data.message },
      });
    } catch (err) {
      dispatch({
        type: 'PLAYERS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Grant user with an access to a specific player
  const grantAccess = async (data: GrantAccessFormData) => {
    setLoading();

    try {
      const res = await axiosJson.post('/api/v1/players/grantaccess', data);
      dispatch({
        type: 'GRANT_ACCESS_SUCCESS',
        payload: { message: res.data.message },
      });
    } catch (err) {
      dispatch({
        type: 'PLAYERS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Set current
  const setCurrent = (player: Player) => {
    dispatch({
      type: 'SET_CURRENT',
      payload: player,
    });
  };

  // Clear current
  const clearCurrent = () => {
    dispatch({
      type: 'CLEAR_CURRENT',
    });
  };

  // Update player details
  const editPlayer = async (id: string, data: PlayersFormData) => {
    setLoading();

    try {
      const res = await axiosJson.put(`/api/v1/players/${id}`, data);
      dispatch({
        type: 'UPDATE_PLAYER_SUCCESS',
        payload: { player: res.data.data, message: res.data.message },
      });
    } catch (err) {
      dispatch({
        type: 'PLAYERS_ERROR',
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

  const {
    playersData,
    playerData,
    playerMatches,
    current,
    loading,
    error,
    message,
  } = state;

  return (
    <PlayersContext.Provider
      value={{
        playersData,
        playerMatches,
        playerData,
        current,
        loading,
        error,
        message,
        setLoading,
        clearErrors,
        clearMessage,
        getPlayers,
        getPlayer,
        getPlayerMatches,
        addPlayer,
        grantAccess,
        setCurrent,
        clearCurrent,
        editPlayer,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
};
