import { useReducer } from 'react';
import * as React from 'react';
import { axiosJson } from '../../config/axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  State,
  LoginFormData,
  RegisterFormData,
  EditAccountData,
  UpdatePasswordData,
  User,
} from '../../types/auth';
import { useAlertsState } from '../alerts/useAlertsState';

export const AuthState: React.FC = ({ children }) => {
  const { setAlert } = useAlertsState();

  const localStorageUser = localStorage.getItem('user');
  const localStorageExpiresAt = localStorage.getItem('expiresAt');

  const initialState: State = {
    user: localStorageUser ? (JSON.parse(localStorageUser) as User) : null,
    expiresAt: localStorageExpiresAt
      ? parseInt(localStorageExpiresAt, 10)
      : null,
    loading: false,
    error: null,
    message: null,
    setLoading: () => null,
    register: () => null,
    confirmAccount: () => null,
    login: () => null,
    logout: () => null,
    editDetails: () => null,
    updatePassword: () => null,
    isAuthenticated: () => false,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set loading
  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    });
  };

  // Register user
  const register = async (formData: RegisterFormData) => {
    setLoading();

    try {
      const res = await axiosJson.post('/api/v1/auth/register', formData);
      setAlert({ msg: res.data.message, type: 'success' });

      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: { message: res.data.message },
      });
    } catch (err) {
      setAlert({ msg: err.response.data.error, type: 'error' });

      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Confirm account
  const confirmAccount = async (confirmationCode: string) => {
    try {
      const res = await axiosJson.get(
        `/api/v1/auth/confirm/${confirmationCode}`,
      );
      setAlert({ msg: res.data.message, type: 'success' });

      dispatch({
        type: 'CONFIRMATION_SUCCESS',
        payload: { message: res.data.message },
      });
    } catch (err) {
      setAlert({ msg: err.response.data.error, type: 'error' });

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
      setAlert({ msg: res.data.message, type: 'success' });

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          message: res.data.message,
          data: {
            user: res.data.data.user,
            expiresAt: res.data.data.expiresAt,
          },
        },
      });
    } catch (err) {
      setAlert({ msg: err.response.data.error, type: 'error' });

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
      setAlert({ msg: res.data.message, type: 'success' });

      dispatch({
        type: 'UPDATE_PASSWORD_SUCCESS',
        payload: { expiresAt: res.data.expiresAt, message: res.data.message },
      });
    } catch (err) {
      setAlert({ msg: err.response.data.error, type: 'error' });

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
      setAlert({ msg: res.data.message, type: 'success' });

      dispatch({
        type: 'EDIT_SUCCESS',
        payload: { user: res.data.data, message: res.data.message },
      });
    } catch (err) {
      setAlert({ msg: err.response.data.error, type: 'error' });

      dispatch({
        type: 'EDIT_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Check if the user is authenticated
  const isAuthenticated = () => {
    if (!state.expiresAt) {
      return false;
    }
    return new Date().getTime() / 1000 < state.expiresAt;
  };

  const { user, expiresAt, loading, error, message } = state;

  return (
    <AuthContext.Provider
      value={{
        user,
        expiresAt,
        loading,
        error,
        message,
        setLoading,
        login,
        logout,
        register,
        confirmAccount,
        editDetails,
        updatePassword,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
