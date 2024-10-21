// cypress/e2e/productDetails/page/productDetails.page.ts

import { ProductListPage } from "../../ProductList/page/productList.page";
import { Product } from "../../ProductList/page/productList.page";

export const ProductDetailsPage = {
    getProductName() {
        return cy.get(".inventory_details_name");
    },
    getProductDescription() {
        return cy.get(".inventory_details_desc");
    },
    getProductPrice() {
        return cy.get(".inventory_details_price");
    },
    getAddToCartButton() {
        return cy.contains(".btn_primary.btn_inventory", "ADD TO CART");
    },
    getRemoveFromCart() {
        return cy.contains(".btn_secondary.btn_inventory", "REMOVE");
    },
    getBackButton() {
        return cy.get(".inventory_details_back_button");
    },
    getCart() {
        return cy.get("#shopping_cart_container");
    },
    validateProductDetails(items: Product[]) {
        items.forEach((item) => {
            cy.log(`**validate product details for ${item.name}**`);
            ProductListPage.clickProduct(item.name);
            ProductDetailsPage.getProductName().should("have.text", item.name);
            ProductDetailsPage.getProductDescription().should(
                "have.text",
                item.desc
            );
            ProductDetailsPage.getProductPrice().should(
                "have.text",
                `$${item.price}`
            );
            ProductDetailsPage.getAddToCartButton().should("be.visible");
            ProductDetailsPage.getBackButton().click();
        });
    },
    validateAddToCart(productName: string) {
        cy.log("**validate add to cart**");
        ProductListPage.clickProduct(productName);
        ProductDetailsPage.getAddToCartButton().click();
        ProductDetailsPage.getAddToCartButton().should("not.exist");
        ProductDetailsPage.getRemoveFromCart().should("be.visible");
    },
};
