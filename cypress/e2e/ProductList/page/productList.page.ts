// cypress/e2e/ProductList/page/productList.page.ts

// Define the interface for the product
export interface Product {
    name: string;
    desc: string;
    price: number;
}

export const ProductListPage = {
    getProducts() {
        return cy.get(".inventory_item");
    },
    getCart() {
        return cy.get("#shopping_cart_container");
    },
    getAddToCartButton() {
        return cy.contains(".btn_primary.btn_inventory", "ADD TO CART");
    },
    getRemoveFromCart() {
        return cy.contains(".btn_secondary.btn_inventory", "REMOVE");
    },
    getProduct(productName: string) {
        return cy.contains(".inventory_item", productName);
    },
    clickProduct(productName: string) {
        cy.log(`**click product: ${productName}**`);
        ProductListPage.getProduct(productName)
            .contains(".inventory_item_name", productName)
            .click();
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
    },
    selectSort(sort: string) {
        cy.log(`**select sort: ${sort}**`);
        cy.get(".product_sort_container").select(sort);
    },
    validateSort(sort: string) {
        cy.log(`**validate sort: ${sort}**`);
        ProductListPage.selectSort(sort);

        // Get all products from the page
        ProductListPage.getProducts().then((products) => {
            // Extract product details (name and price)
            const productArray: Product[] = [];
            products.each((index, productElement) => {
                const name = Cypress.$(productElement)
                    .find(".inventory_item_name")
                    .text()
                    .trim();
                const priceString = Cypress.$(productElement)
                    .find(".inventory_item_price")
                    .text()
                    .trim();
                const price = parseFloat(priceString.replace("$", "")); // Convert price to number
                productArray.push({ name, desc: "", price });
            });

            // Clone the array for sorting comparison
            let sortedArray = [...productArray];

            // Sort based on the selected option
            if (sort === "Name (A to Z)") {
                sortedArray.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sort === "Name (Z to A)") {
                sortedArray.sort((a, b) => b.name.localeCompare(a.name));
            } else if (sort === "Price (low to high)") {
                sortedArray.sort((a, b) => a.price - b.price);
            } else if (sort === "Price (high to low)") {
                sortedArray.sort((a, b) => b.price - a.price);
            }

            // Validate that the displayed products are sorted correctly
            cy.wrap(productArray).should("deep.equal", sortedArray);
        });
    },
    valildateAddToCart(items: Product[]) {
        items.forEach((item) => {
            cy.log(`**add to cart: ${item.name}**`);
            ProductListPage.getProduct(item.name).within(() => {
                ProductListPage.getAddToCartButton().click();
                ProductListPage.getAddToCartButton().should("not.exist");
                ProductListPage.getRemoveFromCart().should("be.visible");
            });
        });
    },
    validateRemoveFromCart(items: Product[]) {
        items.forEach((item) => {
            cy.log(`**remove from cart: ${item.name}**`);
            ProductListPage.getProduct(item.name).within(() => {
                ProductListPage.getRemoveFromCart().click();
                ProductListPage.getRemoveFromCart().should("not.exist");
                ProductListPage.getAddToCartButton().should("be.visible");
            });
        });
    }
};
