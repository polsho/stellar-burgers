import { getOrdersApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getMyOrders = createAsyncThunk('orders/getMyOrders', async () => {
  const res = await getOrdersApi();
  return res;
});
