import React, { useReducer } from 'react';
import { axiosJson } from '../../config/axios';
import PlayersContext from './playersContext';
import playersReducer from './playersReducer';
import {
  State,
  PlayersFilterData,
  PlayersFormData,
  Player,
} from '../../types/players';
import { Order } from '../../types/common';

export const PlayersState: React.FC = ({ children }) => {
  const initialState: State = {
    playersData: {
      data: [],
      total: 0,
      pagination: {},
    },
    playerData: null,
    current: null,
    playerMatches: [],
    loading: false,
    error: null,
    setLoading: () => null,
    getPlayers: () => null,
    getPlayer: () => null,
    getPlayerMatches: () => null,
    deletePlayer: () => null,
    addPlayer: () => null,
    setCurrent: () => null,
    clearCurrent: () => null,
    editPlayer: () => null,
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
        payload: res.data,
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
      await axiosJson.post('/api/v1/players', player);
      dispatch({
        type: 'CREATE_PLAYER_SUCCESS',
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
  const editPlayer = async (player: PlayersFormData) => {
    setLoading();

    try {
      await axiosJson.put(`/api/v1/players/${player._id}`, player);
      dispatch({
        type: 'UPDATE_PLAYER_SUCCESS',
      });
    } catch (err) {
      dispatch({
        type: 'PLAYERS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Delete player
  const deletePlayer = async (id: string) => {
    setLoading();
    try {
      await axiosJson.delete(`/api/v1/players/${id}`);
      dispatch({
        type: 'DELETE_PLAYER_SUCCESS',
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: 'PLAYERS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  const {
    playersData,
    playerData,
    playerMatches,
    current,
    loading,
    error,
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
        setLoading,
        getPlayers,
        getPlayer,
        getPlayerMatches,
        deletePlayer,
        addPlayer,
        setCurrent,
        clearCurrent,
        editPlayer,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
};
