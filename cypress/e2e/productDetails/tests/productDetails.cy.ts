import { LoginPage } from "../../login/page/login.page";
import { ProductDetailsPage } from "../page/productDetails.page";
import items from "../../../fixtures/inventory.json";

describe("Product details", () => {
    // define the standard and locked out users
    const standardUser = Cypress.env("users").standard;
    beforeEach(() => {
        cy.visit("/");
        LoginPage.login(standardUser.username, standardUser.password);
    });

    it("displays and validates the product details", () => {
        // go to the inventory page
        cy.visit("/inventory.html");
        // validate the product list with the items from the fixture
        ProductDetailsPage.validateProductDetails(items);
    });

    it("validates add product to the cart", () => {
        // go to the inventory page
        cy.visit("/inventory.html");
        // validate the product list with the items from the fixture
        ProductDetailsPage.validateAddToCart(items[0].name);
        ProductDetailsPage.getCart()
            .find(".shopping_cart_badge")
            .scrollIntoView()
            .should("have.text", "1");
    });

    it("validates remove product from the cart", () => {
        // go to the inventory page
        cy.visit("/inventory.html");
        // validate the product list with the items from the fixture
        ProductDetailsPage.validateAddToCart(items[0].name);
        ProductDetailsPage.getCart()
            .find(".shopping_cart_badge")
            .scrollIntoView()
            .should("have.text", "1");
        ProductDetailsPage.getRemoveFromCart().click();
        ProductDetailsPage.getCart()
            .find(".shopping_cart_badge")
            .should("not.exist");
    });
});
