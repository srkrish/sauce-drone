import { LoginPage } from "../../login/page/login.page";
import { ProductListPage } from "../page/productList.page";
import items from "../../../fixtures/inventory.json";

describe("Product list", () => {
    // define the standard and locked out users
    const standardUser = Cypress.env("users").standard;
    beforeEach(() => {
        cy.visit("/");
        LoginPage.login(standardUser.username, standardUser.password);
    });

    it("displays and validates the product list", () => {
        cy.visit("/inventory.html");
        ProductListPage.validateProductList(items);
    });
});
