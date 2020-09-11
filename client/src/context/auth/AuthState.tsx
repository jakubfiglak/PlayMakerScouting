import React, { useReducer } from 'react';
import { axiosJson, setAuthToken } from '../../config/axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  State,
  LoginFormData,
  FormattedRegisterFormData,
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
    setLoading: () => null,
    loadUser: () => null,
    login: () => null,
    register: () => null,
    logout: () => null,
    editDetails: () => null,
    updatePassword: () => null,
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
  const register = async (formData: FormattedRegisterFormData) => {
    setLoading();

    try {
      const res = await axiosJson.post('/api/v1/auth/register', formData);

      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data.token,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAIL',
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
        payload: res.data.token,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAIL',
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
        payload: res.data.token,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: 'UPDATE_PASSWORD_FAIL',
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
      await axiosJson.put('/api/v1/auth/updatedetails', formData);

      dispatch({
        type: 'EDIT_SUCCESS',
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: 'EDIT_FAIL',
        payload: err.response.data.error,
      });
    }
  };

  // Clear errors

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        setLoading,
        loadUser,
        login,
        logout,
        register,
        editDetails,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
