// cypress/e2e/login/page/login.page.ts

export const LoginPage = {
    getUsername() {
        return cy.get('[data-test="username"]');
    },
    getPassword() {
        return cy.get('[data-test="password"]');
    },
    getError() {
        return cy.get("[data-test=error]");
    },
    getLogin() {
        return cy.get("#login-button");
    },
    noErrors() {
        cy.log("**there are no errors**");
        LoginPage.getError().should("not.exist");
        LoginPage.getUsername().should("not.have.class", "error");
        LoginPage.getPassword().should("not.have.class", "error");
    },
    showsError(text: string) {
        cy.contains("[data-test=error]", text).should("be.visible");
    },
    login(username: string, password: string) {
        // https://on.cypress.io/session
        cy.session(`user ${username} login`, () => {
            cy.log("**log in**");
            cy.visit("/");
            LoginPage.getUsername().type(username);
            // hide the password from the Console Log
            LoginPage.getPassword().type(password, { log: false });
            LoginPage.getLogin().click();
            cy.location("pathname").should("include", "/inventory.html");
        });
    },
    validateLogin(username: string, password: string) {
        cy.log("**validate login**");
        LoginPage.getUsername().type(username);
        // hide the password from the Console Log
        LoginPage.getPassword().type(password, { log: false });
        LoginPage.getLogin().click();
        if (username === "locked_out_user") {
            LoginPage.showsError(
                "Epic sadface: Sorry, this user has been locked out."
            );
        } else {
            cy.location("pathname").should("include", "/inventory.html");
        }
    }
};
