import { describe, test, expect } from '@jest/globals';
import store from '../store';
import { selectUser, selectIsAuthChecked } from './slice';

const mockedUserData = {
  email: 'test@mail.ru',
  name: 'Test Test'
};

describe('проверка работы authSlice', () => {
  test('проверка асинхронного экшена регистрации - success', () => {
    store.dispatch({
      type: 'auth/register/fulfilled',
      payload: mockedUserData
    });

    expect(selectUser(store.getState())).toEqual(mockedUserData);
    expect(selectIsAuthChecked(store.getState())).toBe(true);
  });

  test('проверка асинхронного экшена регистрации - failed', () => {
    store.dispatch({
      type: 'auth/register/rejected',
      error: { message: 'Email, password and name are required fields' }
    });

    expect(store.getState().auth.errorText).toEqual(
      'Email, password and name are required fields'
    );
  });

  test('проверка асинхронного экшена логина - success', () => {
    store.dispatch({
      type: 'auth/login/fulfilled',
      payload: mockedUserData
    });

    expect(selectUser(store.getState())).toEqual(mockedUserData);
    expect(selectIsAuthChecked(store.getState())).toBe(true);
  });

  test('проверка асинхронного экшена логина - failed', () => {
    store.dispatch({
      type: 'auth/login/rejected',
      error: { message: 'email or password are incorrect' }
    });

    expect(store.getState().auth.errorText).toEqual(
      'email or password are incorrect'
    );
  });

  test('проверка асинхронного экшена логаута - success', () => {
    store.dispatch({
      type: 'auth/logout/fulfilled'
    });

    expect(selectUser(store.getState())).toEqual(null);
  });

  test('проверка асинхронного экшена изменения данных пользователя - success', () => {
    store.dispatch({
      type: 'auth/updateUser/fulfilled',
      payload: mockedUserData
    });

    expect(selectUser(store.getState())).toEqual(mockedUserData);
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});
