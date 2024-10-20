import { LoginPage } from "../page/login.page";

describe("Login form", () => {
    // define the standard and locked out users
    const standardUser = Cypress.env("users").standard;
    const lockedOutUser = Cypress.env("users").lockedOut;

    // visit the login page before each test
    beforeEach(() => {
        cy.visit("/");
    });

    it("shows an error for empty username field", () => {
        // click on the login button without
        // entering any of the information
        LoginPage.getLogin().click();
        // the login page should show the error
        // with text "Epic sadface: Username is required"
        LoginPage.showsError("Epic sadface: Username is required");
    });

    it("shows an error for empty password field", () => {
        // enter username "name" into the input field
        // and click the login button
        // without entering the password
        LoginPage.getUsername().type(standardUser.username);
        LoginPage.getLogin().click();
        // the login page should show the error
        // with text "Epic sadface: Password is required"
        LoginPage.showsError("Epic sadface: Password is required");
    });

    it.only("shows an error for locked out user", () => {
        // enter the locked out user's username and password
        LoginPage.validateLogin(lockedOutUser.username, lockedOutUser.password);
    });

    it("routes to inventory page for a standard user", () => {
        // enter the standard user's username and password
        LoginPage.login(standardUser.username, standardUser.password);
    });
});
