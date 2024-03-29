import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const orderBurger = createAsyncThunk(
  'burgerConstructor/order',
  async (data: string[]) => {
    const res = await orderBurgerApi(data);
    return res;
  }
);
