import React, { useReducer } from 'react';
import { axiosJson } from '../../config/axios';
import UsersContext from './usersContext';
import usersReducer from './usersReducer';
import { AssignPlaymakerRoleData, State } from '../../types/users';

export const UsersState: React.FC = ({ children }) => {
  const initialState: State = {
    usersList: [],
    loading: false,
    error: null,
    message: null,
    getUsersList: () => null,
    setLoading: () => null,
    clearErrors: () => null,
    clearMessage: () => null,
    assignPlaymakerRole: () => null,
  };

  const [state, dispatch] = useReducer(usersReducer, initialState);

  // Set loading
  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    });
  };

  // Get users
  const getUsersList = async () => {
    setLoading();
    try {
      const res = await axiosJson.get('/api/v1/users/list');
      dispatch({
        type: 'GET_USERS_LIST_SUCCESS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'USERS_ERROR',
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

  // Assign playmaker-scout role
  const assignPlaymakerRole = async (data: AssignPlaymakerRoleData) => {
    setLoading();
    try {
      const res = await axiosJson.post('/api/v1/users/assignplaymaker', data);
      dispatch({
        type: 'ASSIGN_ROLE_SUCCESS',
        payload: { user: res.data.data, message: res.data.message },
      });
    } catch (err) {
      dispatch({
        type: 'USERS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  const { usersList, loading, error, message } = state;

  return (
    <UsersContext.Provider
      value={{
        usersList,
        loading,
        error,
        message,
        getUsersList,
        setLoading,
        clearErrors,
        clearMessage,
        assignPlaymakerRole,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
