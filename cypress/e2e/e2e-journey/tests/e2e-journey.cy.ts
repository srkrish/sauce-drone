import { LoginPage } from "../../login/page/login.page";
import { ProductDetailsPage } from "../../productDetails/page/productDetails.page";
import { CartPage } from "../../cart/page/cart.page";
import { CheckoutPage } from "../../checkout/page/checkout.page";
import items from "../../../fixtures/inventory.json";
import user from "../../../fixtures/user.json";

describe("E2E journey", () => {
    const standardUser = Cypress.env("users").standard;
    const productDetailsPage = new ProductDetailsPage();
    const cartPage = new CartPage();
    const checkoutPage = new CheckoutPage();

    beforeEach(() => {
        cy.visit("/");
        LoginPage.login(standardUser.username, standardUser.password);
        
    });

    it("completes the E2E journey", function () {
        cy.log("**complete the E2E journey**");
        productDetailsPage.validateAddToCart(items[0].name);
        productDetailsPage.getCart()
            .find(".shopping_cart_badge")
            .scrollIntoView()
            .should("have.text", "1");
        productDetailsPage.getCart().click();
        cartPage.getCheckout().click();
        checkoutPage.completeCheckout(user.firstName, user.lastName, user.postalCode);
        checkoutPage.getCheckoutCompleteHeader().should("have.text", "THANK YOU FOR YOUR ORDER");
        checkoutPage.getCheckoutCompleteText().should("include.text", "Your order has been dispatched, and will arrive just as fast as the pony can get");
    });
});