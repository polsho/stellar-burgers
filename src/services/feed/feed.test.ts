import { describe, test, expect } from '@jest/globals';
import store from '../store';
import {
  selectOrders,
  selectOrder,
  selectTotal,
  selectTotalToday
} from './slice';

const mockedFeedResponse = {
  success: true,
  orders: [
    {
      _id: '661ffffd97ede0001d066237',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный био-марсианский бургер',
      createdAt: '2024-04-17T16:59:41.400Z',
      updatedAt: '2024-04-17T16:59:42.005Z',
      number: 38239
    },
    {
      _id: '661ffb2897ede0001d066231',
      ingredients: [
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-04-17T16:39:04.659Z',
      updatedAt: '2024-04-17T16:39:05.214Z',
      number: 38238
    },
    {
      _id: '661fe87e97ede0001d066210',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный био-марсианский бургер',
      createdAt: '2024-04-17T15:19:26.624Z',
      updatedAt: '2024-04-17T15:19:27.174Z',
      number: 38237
    }
  ],
  total: 100,
  totalToday: 25
};

describe('проверка работы feedSlice', () => {
  test('проверка асинхронного экшена загрузки ленты заказов - success', () => {
    store.dispatch({
      type: 'feed/getAll/fulfilled',
      payload: mockedFeedResponse
    });

    expect(selectOrders(store.getState())).toEqual(mockedFeedResponse.orders);
    expect(selectTotal(store.getState())).toEqual(mockedFeedResponse.total);
    expect(selectTotalToday(store.getState())).toEqual(
      mockedFeedResponse.totalToday
    );
  });

  test('проверка асинхронного экшена загрузки деталей заказа - success', () => {
    store.dispatch({
      type: 'feed/getOrderById/fulfilled',
      payload: [mockedFeedResponse.orders[0]]
    });

    expect(selectOrder(store.getState())).toEqual(mockedFeedResponse.orders[0]);
  });

  test('проверка асинхронного экшена загрузки деталей заказа - rejected', () => {
    store.dispatch({ type: 'feed/getOrderById/rejected' });

    expect(selectOrder(store.getState())).toEqual(null);
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});
