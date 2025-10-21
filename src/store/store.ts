import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../slices/pokemonSlice';

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
