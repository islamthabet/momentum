import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const initialState = {
  loading: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    isLoading: (state) => {
      state.loading = true;
    },
    finLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { isLoading, finLoading } = loaderSlice.actions;

// selector
export const selectLoader = (state: RootState) => state.loader.loading;

export default loaderSlice.reducer;
