import { describe, test, expect } from '@jest/globals';
import {
  reducer,
  addItemToConstructor,
  deleteConstructorItem,
  moveConstructorItemUp,
  initialState
} from './slice';

const mockedIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0
  }
];

const mockedConstructorItems = {
  bun: {
    ...mockedIngredients[0],
    id: 'testBun1'
  },
  ingredients: [
    {
      ...mockedIngredients[1],
      id: 'testMain1'
    }
  ]
};

describe('проверка работы burgerConstructorSlice', () => {
  test('проверка экшена добавления булки', () => {
    const { constructorItems } = reducer(initialState, {
      type: addItemToConstructor.type,
      payload: { ...mockedIngredients[0], id: 'testBun1' }
    });

    expect(constructorItems.bun).toEqual(mockedConstructorItems.bun);
  });

  test('проверка экшена добавления начинки', () => {
    const { constructorItems } = reducer(initialState, {
      type: addItemToConstructor.type,
      payload: { ...mockedIngredients[1], id: 'testMain1' }
    });

    expect(constructorItems.ingredients).toEqual(
      mockedConstructorItems.ingredients
    );
  });

  test('проверка экшена удаления начинки', () => {
    const { constructorItems } = reducer(initialState, {
      type: deleteConstructorItem.type,
      payload: { ...mockedIngredients[1], id: 'testMain1' }
    });

    expect(constructorItems.ingredients).toEqual([]);
  });

  test('проверка экшена перемещения начинки вверх', () => {
    const { constructorItems } = reducer(
      {
        constructorItems: {
          ...mockedConstructorItems,
          ingredients: [
            { ...mockedIngredients[0], id: 'testMain1' },
            { ...mockedIngredients[1], id: 'testMain2' }
          ]
        },
        orderRequest: false,
        orderModalData: null
      },
      moveConstructorItemUp(1)
    );

    expect(constructorItems.ingredients).toEqual([
      { ...mockedIngredients[1], id: 'testMain2' },
      { ...mockedIngredients[0], id: 'testMain1' }
    ]);
  });
});
