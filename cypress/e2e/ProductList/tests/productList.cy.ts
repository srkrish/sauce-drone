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
        // go to the inventory page
        cy.visit("/inventory.html");
        // validate the product list with the items from the fixture
        ProductListPage.validateProductList(items);
    });

    it("sorts the product list by name ascending", () => {
        // go to the inventory page
        cy.visit("/inventory.html");
        // validate the product list with the items from the fixture
        ProductListPage.validateProductList(items);
        // sort the product list by name
        ProductListPage.validateSort("Name (A to Z)");
    });

    it("sorts the product list by name descending", () => {
        // go to the inventory page
        cy.visit("/inventory.html");
        // validate the product list with the items from the fixture
        ProductListPage.validateProductList(items);
        // sort the product list by name
        ProductListPage.validateSort("Name (Z to A)");
    });

    it("sorts the product list by Price ascending", () => {
        // go to the inventory page
        cy.visit("/inventory.html");
        // validate the product list with the items from the fixture
        ProductListPage.validateProductList(items);
        // sort the product list by name
        ProductListPage.validateSort("Price (low to high)");
    });

    it("sorts the product list by Price descending", () => {
        // go to the inventory page
        cy.visit("/inventory.html");
        // validate the product list with the items from the fixture
        ProductListPage.validateProductList(items);
        // sort the product list by name
        ProductListPage.validateSort("Price (high to low)");
    });
});
