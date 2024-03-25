import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

type TConstructorItems = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

type TBurgerConstructorStateProps = {
  constructorItems: TConstructorItems;
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TBurgerConstructorStateProps = {
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
      if (ingredient.type === 'bun') {
        state.constructorItems.bun = null;
      } else {
        state.constructorItems?.ingredients?.filter(
          (item) => item._id !== ingredient._id
        );
      }
    }
  },
  selectors: {
    selectConstructorItems: (state) => state.constructorItems,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData
  }
});

export const { setOrderRequest, setConstructorItems, deleteConstructorItem } =
  burgerConstructorSlice.actions;

export const reducer = burgerConstructorSlice.reducer;

export const {
  selectConstructorItems,
  selectOrderRequest,
  selectOrderModalData
} = burgerConstructorSlice.selectors;
