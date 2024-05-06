import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User } from '@/routes/_home/goal/-components/interface/Goal.interface';

export interface AuthState {
  isLogin: boolean;
  user: User | null;
}

export const initialState: AuthState = {
  isLogin: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.isLogin = true;
      state.user = action.payload.user;
    },
    logout: () => initialState,
  },
});

export const { login, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
