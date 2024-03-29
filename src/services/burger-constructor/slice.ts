import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { orderBurger } from './action';

type TConstructorItems = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

type TBurgerConstructorState = {
  constructorItems: TConstructorItems;
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TBurgerConstructorState = {
  constructorItems: { bun: null, ingredients: [] },
  orderRequest: false,
  orderModalData: null
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    setOrderModalData: (state, action: PayloadAction<TOrder | null>) => {
      state.orderModalData = action.payload;
    },
    setConstructorItems: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.constructorItems.bun = ingredient;
      } else {
        state.constructorItems?.ingredients?.push(ingredient);
      }
    },
    deleteConstructorItem: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredient = action.payload;
      state.constructorItems.ingredients =
        state.constructorItems?.ingredients?.filter(
          (item) => item.id !== ingredient.id
        );
    },
    clearConstructor: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
    }
  },
  selectors: {
    selectConstructorItems: (state) => state.constructorItems,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
      });
  }
});

export const {
  setOrderRequest,
  setOrderModalData,
  setConstructorItems,
  deleteConstructorItem,
  clearConstructor
} = burgerConstructorSlice.actions;

export const reducer = burgerConstructorSlice.reducer;

export const {
  selectConstructorItems,
  selectOrderRequest,
  selectOrderModalData
} = burgerConstructorSlice.selectors;
