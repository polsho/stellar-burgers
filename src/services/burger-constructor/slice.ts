import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { orderBurger } from './action';
import { v4 as uuidv4 } from 'uuid';

type TConstructorItems = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

type TBurgerConstructorState = {
  constructorItems: TConstructorItems;
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

export const initialState: TBurgerConstructorState = {
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
    addItemToConstructor: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredient = action.payload;
        if (ingredient.type === 'bun') {
          state.constructorItems.bun = ingredient;
        } else {
          state.constructorItems?.ingredients?.push(ingredient);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id: string = uuidv4();
        return { payload: { ...ingredient, id } };
      }
    },
    moveConstructorItemUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const ingredients = state.constructorItems.ingredients;
      const ingredient = ingredients[index];
      ingredients.splice(index, 1);
      ingredients.splice(index - 1, 0, ingredient);
    },
    moveConstructorItemDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const ingredients = state.constructorItems.ingredients;
      const ingredient = ingredients[index];
      ingredients.splice(index, 1);
      ingredients.splice(index + 1, 0, ingredient);
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
  addItemToConstructor,
  moveConstructorItemUp,
  moveConstructorItemDown,
  deleteConstructorItem,
  clearConstructor
} = burgerConstructorSlice.actions;

export const reducer = burgerConstructorSlice.reducer;

export const {
  selectConstructorItems,
  selectOrderRequest,
  selectOrderModalData
} = burgerConstructorSlice.selectors;
