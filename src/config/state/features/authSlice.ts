import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

export interface AuthState {
  isLogin: boolean;
  user: any;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  isLogin: true,
  user: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.isLogin = false;

      state.user = null;
      state.loading = false;
      state.error = null;
    },
    error: (state, action) => {
      state.isLogin = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {login, logout, error} = authSlice.actions;

// selector
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
