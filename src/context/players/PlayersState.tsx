import React, { useReducer } from 'react';
import { axiosJson } from '../../config/axios';
import PlayersContext from './playersContext';
import playersReducer from './playersReducer';
import { State } from '../../types/players';

const PlayersState: React.FC = ({ children }) => {
  const initialState: State = {
    players: [],
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
  const getPlayers = async () => {
    setLoading();
    try {
      const res = await axiosJson.get('/api/v1/players');
      console.log(res.data);
      dispatch({
        type: 'GET_PLAYERS_SUCCESS',
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err.response);
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
        players: state.players,
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
