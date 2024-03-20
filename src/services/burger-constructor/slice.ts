import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';

type TConstructorItems = {
  bun: {
    price: number;
  };
  ingredients: TIngredient[];
};

type TBurgerConstructorStateProps = {
  constructorItems: TConstructorItems | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TBurgerConstructorStateProps = {
  constructorItems: null,
  orderRequest: false,
  orderModalData: null
};

const burgerConstructorSlice = createSlice({
  name: 'burger-constructor',
  initialState,
  reducers: {
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    setConstructorItems: (state, action: PayloadAction<TConstructorItems>) => {
      state.constructorItems = action.payload;
    }
  },
  selectors: {
    selectConstructorItems: (state) => state.constructorItems,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData
  }
});

export const {} = burgerConstructorSlice.actions;

export const reducer = burgerConstructorSlice.reducer;

export const {
  selectConstructorItems,
  selectOrderRequest,
  selectOrderModalData
} = burgerConstructorSlice.selectors;
