import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeed } from './action';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: TFeedState = {
  orders: [],
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
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder.addCase(getFeed.fulfilled, (state, action) => {
      state.orders = action.payload.orders.filter((order) => order._id != null);
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});

export const { setOrders, setTotal, setTotalToday } = feedSlice.actions;

export const reducer = feedSlice.reducer;

export const { selectOrders, selectTotal, selectTotalToday } =
  feedSlice.selectors;
