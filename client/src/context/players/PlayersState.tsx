import React, { useReducer } from 'react';
import { axiosJson } from '../../config/axios';
import PlayersContext from './playersContext';
import playersReducer from './playersReducer';
import {
  State,
  PlayersFilterData,
  PlayerDTO,
  Player,
  GrantAccessArgs,
} from '../../types/players';
import { SortingOrder } from '../../types/common';
import { initialPaginatedData } from '../../data/initialPaginatedData';
import { useAlertsState } from '../alerts/useAlertsState';

export const PlayersState: React.FC = ({ children }) => {
  const { setAlert } = useAlertsState();

  const initialState: State = {
    playersData: initialPaginatedData,
    playersList: [],
    playerData: null,
    current: null,
    loading: false,
    error: null,
    message: null,
    setLoading: () => null,
    getPlayers: () => null,
    getPlayersList: () => null,
    getPlayer: () => null,
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
    order: SortingOrder,
    filters: PlayersFilterData,
  ) => {
    setLoading();
    const orderSign = order === 'desc' ? '-' : '';

    // Generate query url
    let playersURI = `/api/v1/players?page=${page}&limit=${limit}&sort=${orderSign}${sort}`;

    // Add filters to query url
    Object.entries(filters).forEach(([key, value]) => {
      const filter = `&${key}=${value}`;
      if (value && value.toString().length) {
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
      setAlert({ msg: err.response.data.error, type: 'error' });

      dispatch({
        type: 'PLAYERS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Get players list
  const getPlayersList = async () => {
    setLoading();

    try {
      const res = await axiosJson.get('/api/v1/players/list');
      dispatch({
        type: 'GET_PLAYERS_LIST_SUCCESS',
        payload: res.data.data,
      });
    } catch (err) {
      setAlert({ msg: err.response.data.error, type: 'error' });

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
      setAlert({ msg: err.response.data.error, type: 'error' });

      dispatch({
        type: 'PLAYERS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Create new player
  const addPlayer = async (player: PlayerDTO) => {
    setLoading();

    try {
      const res = await axiosJson.post('/api/v1/players', player);
      setAlert({ msg: res.data.message, type: 'success' });

      dispatch({
        type: 'CREATE_PLAYER_SUCCESS',
        payload: { player: res.data.data, message: res.data.message },
      });
    } catch (err) {
      setAlert({ msg: err.response.data.error, type: 'error' });

      dispatch({
        type: 'PLAYERS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Grant user with an access to a specific player
  const grantAccess = async ({ playerId, userId }: GrantAccessArgs) => {
    setLoading();

    try {
      const res = await axiosJson.post(
        `/api/v1/players/${playerId}/grantaccess`,
        { user: userId },
      );
      setAlert({ msg: res.data.message, type: 'success' });

      dispatch({
        type: 'GRANT_ACCESS_SUCCESS',
        payload: { message: res.data.message },
      });
    } catch (err) {
      setAlert({ msg: err.response.data.error, type: 'error' });

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
  const editPlayer = async (id: string, data: PlayerDTO) => {
    setLoading();

    try {
      const res = await axiosJson.put(`/api/v1/players/${id}`, data);
      setAlert({ msg: res.data.message, type: 'success' });
      clearCurrent();

      dispatch({
        type: 'UPDATE_PLAYER_SUCCESS',
        payload: { player: res.data.data, message: res.data.message },
      });
    } catch (err) {
      setAlert({ msg: err.response.data.error, type: 'error' });

      dispatch({
        type: 'PLAYERS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  const {
    playersData,
    playersList,
    playerData,
    current,
    loading,
    error,
    message,
  } = state;

  return (
    <PlayersContext.Provider
      value={{
        playersData,
        playersList,
        playerData,
        current,
        loading,
        error,
        message,
        setLoading,
        getPlayers,
        getPlayersList,
        getPlayer,
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
