// cypress/e2e/cart/page/cart.page.ts

import { ProductDetailsPage } from "../../productDetails/page/productDetails.page";

export class CartPage extends ProductDetailsPage {

    public visit(){
        return cy.visit('/cart.html');
    }
    
    public getContinueShopping(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.contains('.btn_secondary', 'Continue Shopping');
    }

    public getCheckout(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.contains('.btn_action.checkout_button', 'CHECKOUT');
    }

    public clickCheckout(){
        this.getCheckout().click();
    }

    public clickContinueShopping(){
        this.getContinueShopping().click();
    }

    public clickCart(){
        this.getCart().click();
    }
    
};
