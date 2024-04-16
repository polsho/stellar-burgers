import mockIngreients from '../../fixtures/ingredients.json';
import { accessToken, refreshToken, user } from '../../fixtures/user.json';
import { order, name } from '../../fixtures/orderInfo.json';

beforeEach(() => {
  cy.intercept('GET', `https://norma.nomoreparties.space/api/ingredients`, {
    success: true,
    data: mockIngreients.mockIngredients
  });
  cy.setCookie('accessToken', accessToken);
  window.localStorage.setItem('refreshToken', refreshToken);

  cy.intercept('GET', `https://norma.nomoreparties.space/api/auth/user`, {
    success: true,
    user: {
      email: user.email,
      name: user.name
    }
  });

  cy.visit('http://localhost:4000/');
});

describe('тест на добавление ингредиентов', () => {
  it('булка добавляется в конструктор', () => {
    const addButton = cy
      .get(`[data-ingredient-cy=${mockIngreients.mockIngredients[0]._id}]`)
      .contains('button', 'Добавить');
    addButton.click();

    const constructor = cy.get(`[data-cy='burger-constructor']`);
    constructor.contains('Краторная булка N-200i');
  });
  it('начинка добавляется в конструктор', () => {
    const addButton = cy
      .get(`[data-ingredient-cy=${mockIngreients.mockIngredients[1]._id}]`)
      .contains('button', 'Добавить');
    addButton.click();

    const constructor = cy.get(`[data-cy='burger-constructor']`);
    constructor.contains('Биокотлета из марсианской Магнолии');
  });
});

describe('тест на работу модального окна ингредиента', () => {
  it('модальное окно ингредиента открыватся', () => {
    const ingredient = cy.get(
      `[data-ingredient-cy=${mockIngreients.mockIngredients[0]._id}]`
    );
    ingredient.click();

    cy.url().should('contain', `${mockIngreients.mockIngredients[0]._id}`);
    const modal = cy.get('#modals');
    modal.contains('Детали ингредиента');
  });
  it('модальное окно закрывается по клику на крестик', () => {
    const ingredient = cy.get(
      `[data-ingredient-cy=${mockIngreients.mockIngredients[0]._id}]`
    );
    ingredient.click();

    const closeButton = cy.get('#modals').find('button');
    closeButton.click();

    cy.url().should('not.contain', `${mockIngreients.mockIngredients[0]._id}`);
  });
});

describe('тест на создание заказа', () => {
  it('принимаются моковые токены авторизации', () => {
    cy.visit('http://localhost:4000/');

    cy.getCookie('accessToken').should('have.property', 'value', accessToken);
  });

  it('создается заказ по клику на кнопку "Оформить заказ"', () => {
    cy.intercept('POST', `https://norma.nomoreparties.space/api/orders`, {
      success: true,
      name: name,
      order: order
    });

    cy.get('button')
      .filter(':contains("Добавить")')
      .each((el) => {
        cy.wrap(el).click();
      });

    cy.get(`[data-cy='price']`).contains(order.price);

    const orderButton = cy.get(`[data-cy='order']`);
    orderButton.click();

    const modal = cy.get('#modals');
    modal.contains(order.number);

    const closeButton = cy.get('#modals').find('button').last();
    closeButton.click();

    const constructor = cy.get(`[data-cy='burger-constructor']`);
    constructor.contains('Выберите булки');
    constructor.find('li').should('have.length', 0);
  });
});

afterEach(() => {
  cy.clearCookie('accessToken');
  window.localStorage.removeItem('refreshToken');
})
