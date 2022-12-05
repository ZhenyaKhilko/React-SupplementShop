import { CartItem, CartSliceState } from './types';
import { getCartFromLocalStorage } from '../../utils/getCartDataFromLocalStorage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const cartData = getCartFromLocalStorage();

const initialState: CartSliceState = {
  totalPrice: cartData.totalPrice,
  items: cartData.items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const foundItem = state.items.find((item) => item.id === action.payload.id);
      if (foundItem) {
        foundItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice += action.payload.price;
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = state.items.reduce(
        (sum: number, item) => sum + item.price * item.count,
        0,
      );
    },
    plusItem(state, action: PayloadAction<number>) {
      const foundItem = state.items.find((item) => item.id === action.payload);
      if (foundItem) {
        foundItem.count++;
        state.totalPrice += foundItem.price;
      }
    },
    minusItem(state, action: PayloadAction<number>) {
      const foundItem = state.items.find((item) => item.id === action.payload);
      if (foundItem) {
        foundItem.count--;
        state.totalPrice -= foundItem.price;
        if (!foundItem.count) {
          state.items = state.items.filter((item) => item.id !== action.payload);
        }
        if (!state.items.length) state.totalPrice = 0;
      }
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, plusItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
