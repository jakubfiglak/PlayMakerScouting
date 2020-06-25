import React, { useReducer } from 'react';
import axiosJson from '../../config/axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { Action, State, LoginFormData } from './types';

const AuthState: React.FC = ({ children }) => {
  const initialState: State = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    error: null,
    login: () => null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user

  // Register user

  // Login user
  const login = async (formData: LoginFormData) => {
    try {
      const res = await axiosJson.post('/api/v1/auth/login', formData);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data.token,
      });
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response.data.error,
      });
    }
  };

  // Logout

  // Clear errors

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
