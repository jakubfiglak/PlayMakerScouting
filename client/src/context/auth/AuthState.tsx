import React, { useReducer } from 'react';
import { axiosJson, setAuthToken } from '../../config/axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  State,
  LoginFormData,
  RegisterFormData,
  EditAccountData,
  UpdatePasswordData,
} from '../../types/auth';

export const AuthState: React.FC = ({ children }) => {
  const initialState: State = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    error: null,
    message: null,
    setLoading: () => null,
    clearErrors: () => null,
    clearMessage: () => null,
    loadUser: () => null,
    login: () => null,
    register: () => null,
    logout: () => null,
    editDetails: () => null,
    updatePassword: () => null,
    addClubToFavorites: () => null,
    removeClubFromFavorites: () => null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set loading
  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    });
  };

  // Load user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axiosJson.get('/api/v1/auth/account');
      dispatch({
        type: 'USER_LOADED',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Register user
  const register = async (formData: RegisterFormData) => {
    setLoading();

    try {
      const res = await axiosJson.post('/api/v1/auth/register', formData);

      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: { token: res.data.token, message: res.data.message },
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Login user
  const login = async (formData: LoginFormData) => {
    setLoading();

    try {
      const res = await axiosJson.post('/api/v1/auth/login', formData);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { token: res.data.token, message: res.data.message },
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Update password
  const updatePassword = async (formData: UpdatePasswordData) => {
    setLoading();

    try {
      const res = await axiosJson.put('/api/v1/auth/updatepassword', formData);

      dispatch({
        type: 'UPDATE_PASSWORD_SUCCESS',
        payload: { token: res.data.token, message: res.data.message },
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Logout
  const logout = () => {
    dispatch({
      type: 'LOGOUT',
    });
  };

  // Edit details
  const editDetails = async (formData: EditAccountData) => {
    setLoading();

    try {
      const res = await axiosJson.put('/api/v1/auth/updatedetails', formData);

      dispatch({
        type: 'EDIT_SUCCESS',
        payload: { user: res.data.data, message: res.data.message },
      });
    } catch (err) {
      dispatch({
        type: 'EDIT_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Add club to favorites
  const addClubToFavorites = async (id: string) => {
    dispatch({
      type: 'ADD_CLUB_TO_FAVORITES_SUCCESS',
      payload: id,
    });
  };

  // Remove club from favorites
  const removeClubFromFavorites = async (id: string) => {
    dispatch({
      type: 'REMOVE_CLUB_FROM_FAVORITES_SUCCESS',
      payload: id,
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

  const { user, token, isAuthenticated, loading, error, message } = state;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        error,
        message,
        setLoading,
        clearErrors,
        clearMessage,
        loadUser,
        login,
        logout,
        register,
        editDetails,
        updatePassword,
        addClubToFavorites,
        removeClubFromFavorites,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
