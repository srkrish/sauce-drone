// cypress/e2e/checkout/page/checkout.page.ts

export class CheckoutPage {
    public visit(){
        return cy.visit('/checkout-step-one.html');
    }

    public getFirstName(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#first-name');
    }

    public getLastName(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#last-name');
    }

    public getPostalCode(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#postal-code');
    }

    public getContinue(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.contains('.btn_primary', 'CONTINUE');
    }

    public clickContinue(){
        this.getContinue().click();
    }

    public getErrorMessage(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('[data-test="error"]');
    }

    public getCancelButton(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.contains('.cart_cancel_link', 'CANCEL');
    }

    public clickFinishButton(){
        this.getFinishButton().click();
    }

    public clickCancelButton(){
        this.getCancelButton().click();
    }

    public getFinishButton(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.contains('.btn_action.cart_button', 'FINISH');
    }

    public getCheckoutCompleteHeader(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('.complete-header');
    }

    public getCheckoutCompleteText(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('.complete-text');
    }

    public completeCheckout(firstName: string, lastName: string, postalCode: string){
        this.getFirstName().type(firstName);
        this.getLastName().type(lastName);
        this.getPostalCode().type(postalCode);
        this.clickContinue();
        this.clickFinishButton();
    }
}