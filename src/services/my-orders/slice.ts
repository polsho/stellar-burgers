import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getMyOrders } from './action';

type TOrderState = {
  orders: TOrder[];
};

const initialState: TOrderState = {
  orders: []
};

const ordersSlice = createSlice({
  name: 'myOrders',
  initialState,
  reducers: {},
  selectors: {
    selectMyOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder.addCase(getMyOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});

export const reducer = ordersSlice.reducer;

export const { selectMyOrders } = ordersSlice.selectors;
