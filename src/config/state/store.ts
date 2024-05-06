import { configureStore } from '@reduxjs/toolkit';
import auth from './features/authSlice';
import loader from './features/loaderSlice';

export const store = configureStore({
  reducer: {
    auth,
    loader,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
