import { accessToken, refreshToken } from '../../fixtures/user.json';
import { data as mockIngredients } from '../../fixtures/ingredients.json';

beforeEach(() => {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  cy.setCookie('accessToken', accessToken);
  window.localStorage.setItem('refreshToken', refreshToken);

  cy.intercept('GET', `api/auth/user`, { fixture: 'user.json' });

  cy.visit('/');

  cy.get("[data-cy='burger-constructor']").as('constructor');
  cy.get('#modals').as('modal');

  cy.fixture('orderInfo.json').as('orderInfo');

  cy.fixture('ingredients.json').as('ingredients');
  cy.get('@ingredients').then((ingredients) => {
    cy.get(`[data-ingredient-cy=${ingredients.data[0]._id}]`).as('bun');
    cy.get(`[data-ingredient-cy=${ingredients.data[1]._id}]`).as('main');
  });
});

describe('тест на добавление ингредиентов', () => {
  it('булка добавляется в конструктор', () => {
    const addButton = cy.get('@bun').contains('button', 'Добавить');
    addButton.click();

    cy.get('@constructor').contains('Краторная булка N-200i');
  });
  it('начинка добавляется в конструктор', () => {
    const addButton = cy.get('@main').contains('button', 'Добавить');
    addButton.click();

    cy.get('@constructor').contains('Биокотлета из марсианской Магнолии');
  });
});

describe('тест на работу модального окна ингредиента', () => {
  it('модальное окно ингредиента открыватся', () => {
      cy.get('@bun').click();
  
      cy.url().should('contain', `${mockIngredients[0]._id}`);
  
      cy.get('@modal').contains('Детали ингредиента');
  });
  it('модальное окно закрывается по клику на крестик', () => {
      cy.get('@bun').click();
  
      const closeButton = cy.get('@modal').find('button');
      closeButton.click();
  
      cy.url().should('not.contain', `${mockIngredients[0]._id}`);
  });
});

describe('тест на создание заказа', () => {
  it('принимаются моковые токены авторизации', () => {
    cy.visit('/');

    cy.getCookie('accessToken').should('have.property', 'value', accessToken);
  });

  it('создается заказ по клику на кнопку "Оформить заказ"', () => {
    cy.get('@orderInfo').then((orderInfo) => {
      cy.intercept('POST', `api/orders`, orderInfo);
      cy.get('button')
        .filter(':contains("Добавить")')
        .each((el) => {
          cy.wrap(el).click();
        });
  
      cy.get(`[data-cy='price']`).contains(orderInfo.order.price);
  
      const orderButton = cy.get(`[data-cy='order']`);
      orderButton.click();
  
      cy.get('@modal').contains(orderInfo.order.number);
  
      const closeButton = cy.get('@modal').find('button').last();
      closeButton.click();
  
      cy.get('@constructor').contains('Выберите булки');
      cy.get('@constructor').find('li').should('have.length', 0);
    })
  });
});

afterEach(() => {
  cy.clearCookie('accessToken');
  window.localStorage.removeItem('refreshToken');
});
