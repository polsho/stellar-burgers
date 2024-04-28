import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuthChecked, setUser } from './slice';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

export const login = createAsyncThunk(
  'auth/login',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const checkUserAuth = createAsyncThunk(
  'auth/checkUser',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((res) => dispatch(setUser(res.user)))
        .catch(() => {
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (user: TRegisterData) => {
    const res = await updateUserApi(user);
    return res.user;
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const register = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);
