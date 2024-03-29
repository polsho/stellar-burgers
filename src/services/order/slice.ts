import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  order: TOrder;
};

const initialState: TOrderState = {
  order: {
    createdAt: '',
    ingredients: [],
    _id: '',
    status: '',
    name: '',
    updatedAt: 'string',
    number: 0
  }
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {}
});
