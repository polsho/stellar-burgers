import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeed = createAsyncThunk('feed/getAll', async () => {
  const res = await getFeedsApi();
  return res;
});

export const getOrderById = createAsyncThunk(
  'feed/getOrderById',
  async (id: number) => {
    const res = await getOrderByNumberApi(id);
    return res.orders;
  }
);
