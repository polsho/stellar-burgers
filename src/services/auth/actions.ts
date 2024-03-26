import { getUserApi, loginUserApi, logoutApi, TLoginData } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuthChecked, setUser } from './slice';

export const login = createAsyncThunk(
  'auth/login',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const checkUserAuth = createAsyncThunk(
  'auth/checkUser',
  async (_, { dispatch }) => {
    if (localStorage.getItem('accessToken')) {
      getUserApi()
        .then((res) => dispatch(setUser(res.user)))
        .catch(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await logoutApi();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
)
