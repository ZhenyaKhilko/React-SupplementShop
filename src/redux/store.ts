import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import filter from './filter/slice';
import cart from './cart/slice';
import supplements from './supplements/slice';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    supplements,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
