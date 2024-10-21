import { LoginPage } from "../../login/page/login.page";
import { ProductDetailsPage } from "../page/productDetails.page";
import items from "../../../fixtures/inventory.json";

describe("Product details", () => {
    const standardUser = Cypress.env("users").standard;
    const productDetailsPage = new ProductDetailsPage(); // Create an instance of ProductDetailsPage

    beforeEach(() => {
        cy.visit("/");
        LoginPage.login(standardUser.username, standardUser.password);
    });

    it("displays and validates the product details", () => {
        // go to the inventory page
        cy.visit("/inventory.html");
        // validate the product list with the items from the fixture
        productDetailsPage.validateProductDetails(items); // Use the instance
    });

    it("validates add product to the cart", () => {
        // go to the inventory page
        cy.visit("/inventory.html");
        // validate adding the first product to the cart
        productDetailsPage.validateAddToCart(items[0].name); // Use the instance
        productDetailsPage.getCart()
            .find(".shopping_cart_badge")
            .scrollIntoView()
            .should("have.text", "1");
    });

    it("validates remove product from the cart", () => {
        // go to the inventory page
        cy.visit("/inventory.html");
        // validate adding and removing the first product from the cart
        productDetailsPage.validateAddToCart(items[0].name); // Use the instance
        productDetailsPage.getCart()
            .find(".shopping_cart_badge")
            .scrollIntoView()
            .should("have.text", "1");
        productDetailsPage.getRemoveFromCart().click();
        productDetailsPage.getCart()
            .find(".shopping_cart_badge")
            .should("not.exist");
    });
});
