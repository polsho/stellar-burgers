import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { checkUserAuth, login, logout, register, updateUser } from './actions';
import { deleteCookie } from '../../utils/cookie';

type TAuthState = {
  user: TUser | null;
  isAuthChecked: boolean;
  errorText: string;
};

const initialState: TAuthState = {
  user: null,
  isAuthChecked: false,
  errorText: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    }
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectErrorText: (state) => state.errorText
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.errorText = '';
      })
      .addCase(login.rejected, (state, action) => {
        state.errorText = action.error.message || '';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.errorText = '';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.errorText = '';
      })
      .addCase(register.rejected, (state, action) => {
        state.errorText = action.error.message || '';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  }
});

export const { setAuthChecked, setUser } = authSlice.actions;

export const { selectUser, selectIsAuthChecked, selectErrorText } =
  authSlice.selectors;

export const reducer = authSlice.reducer;
