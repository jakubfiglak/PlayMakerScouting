import React, { useReducer } from 'react';
import { axiosJson } from '../../config/axios';
import PlayersContext from './playersContext';
import playersReducer from './playersReducer';
import { State } from '../../types/players';
import { Order } from '../../types/common';

const PlayersState: React.FC = ({ children }) => {
  const initialState: State = {
    playersData: {
      data: [],
      total: 0,
      pagination: {},
    },
    loading: false,
    error: null,
    setLoading: () => null,
    getPlayers: () => null,
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
  ) => {
    setLoading();
    try {
      const res = await axiosJson.get(
        `/api/v1/players?page=${page}&limit=${limit}&sort=${
          order === 'desc' ? '-' : ''
        }${sort}`,
      );
      console.log(res.data);
      dispatch({
        type: 'GET_PLAYERS_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'GET_PLAYERS_FAIL',
        payload: err.response.data.error,
      });
    }
  };

  // Get player

  // Create new player

  // Update player details

  // Delete player

  return (
    <PlayersContext.Provider
      value={{
        playersData: state.playersData,
        loading: state.loading,
        error: state.error,
        setLoading,
        getPlayers,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
};

export default PlayersState;
