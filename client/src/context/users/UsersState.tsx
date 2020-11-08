import React, { useReducer } from 'react';
import { axiosJson } from '../../config/axios';
import UsersContext from './usersContext';
import usersReducer from './usersReducer';
import { AssignPlaymakerRoleData, State } from '../../types/users';

export const UsersState: React.FC = ({ children }) => {
  const initialState: State = {
    loading: false,
    error: null,
    message: null,
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
        payload: { message: res.data.message },
      });
    } catch (err) {
      dispatch({
        type: 'USERS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  const { loading, error, message } = state;

  return (
    <UsersContext.Provider
      value={{
        loading,
        error,
        message,
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
