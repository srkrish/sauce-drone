// cypress/e2e/ProductList/page/productList.page.ts

// Define the interface for the product
interface Product {
    name: string;
    desc: string;
    price: number;
}

export const ProductListPage = {
    getProducts() {
        return cy.get(".inventory_item");
    },
    getCart() {
        return cy.get("shopping_cart_container");
    },
    validateProductList(items: Product[]) {
        cy.log("**validate product list**");
        ProductListPage.getProducts().should("have.length", 6);
        items.forEach((item) => {
            cy.log(`**validate product: ${item.name}**`);
            cy.contains(".inventory_item", item.name).within(() => {
                cy.contains(".inventory_item_name", item.name);
                cy.contains(".inventory_item_desc", item.desc);
                cy.contains(".inventory_item_price", item.price);
            });
        });
    }
};
