// cypress/e2e/productDetails/page/productDetails.page.ts

import { ProductListPage } from "../../ProductList/page/productList.page";
import { Product } from "../../ProductList/page/productList.page";

export class ProductDetailsPage {
    getProductName(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(".inventory_details_name");
    }

    getProductDescription(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(".inventory_details_desc");
    }

    getProductPrice(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(".inventory_details_price");
    }

    getAddToCartButton(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.contains(".btn_primary.btn_inventory", "ADD TO CART");
    }

    getRemoveFromCart(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.contains(".btn_secondary.btn_inventory", "REMOVE");
    }

    getBackButton(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(".inventory_details_back_button");
    }

    getCart(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get("#shopping_cart_container");
    }

    validateProductDetails(items: Product[]) {
        items.forEach((item) => {
            cy.log(`**validate product details for ${item.name}**`);
            ProductListPage.clickProduct(item.name);
            this.getProductName().should("have.text", item.name);
            this.getProductDescription().should("have.text", item.desc);
            this.getProductPrice().should("have.text", `$${item.price}`);
            this.getAddToCartButton().should("be.visible");
            this.getBackButton().click();
        });
    }

    validateAddToCart(productName: string) {
        cy.log("**validate add to cart**");
        ProductListPage.clickProduct(productName);
        this.getAddToCartButton().click();
        this.getAddToCartButton().should("not.exist");
        this.getRemoveFromCart().should("be.visible");
    }
}
