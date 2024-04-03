import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeed, getOrderById } from './action';

type TFeedState = {
  orders: TOrder[];
  order: TOrder | null;
  total: number;
  totalToday: number;
};

const initialState: TFeedState = {
  orders: [],
  order: null,
  total: 0,
  totalToday: 0
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<TOrder[]>) => {
      state.orders = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setTotalToday: (state, action: PayloadAction<number>) => {
      state.totalToday = action.payload;
    }
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectOrder: (state) => state.order,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders.filter(
          (order) => order._id != null
        );
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.order = action.payload[0];
      })
      .addCase(getOrderById.rejected, (state) => {
        state.order = null;
      });
  }
});

export const { setOrders, setTotal, setTotalToday } = feedSlice.actions;

export const reducer = feedSlice.reducer;

export const { selectOrders, selectOrder, selectTotal, selectTotalToday } =
  feedSlice.selectors;
