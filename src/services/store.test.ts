import { describe, test, expect } from '@jest/globals';
import { rootReducer } from './store';
import { initialState as ingredientsState } from './ingredients/slice';
import { initialState as authState } from './auth/slice';
import { initialState as burgerConstructorState } from './burger-constructor/slice';
import { initialState as feedState } from './feed/slice';
import { initialState as myOrdersState } from './my-orders/slice';

const mockInitialStates = {
  ingredients: ingredientsState,
  burgerConstructor: burgerConstructorState,
  auth: authState,
  feed: feedState,
  myOrders: myOrdersState
};

describe('проверка rootReducer', () => {
  const action = { type: 'UNKNOWN_ACTION' };
  const state = rootReducer(undefined, action);

  test('проверка вызова rootReducer с неизвестными состоянием и экшеном', () => {
    expect(state).toEqual(mockInitialStates);
  });
});
