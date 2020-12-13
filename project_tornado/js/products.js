"use strict";



async function loadProductsList() {
    const CATEGORY_ID = window.location.search.slice(4);
    const CURRENCY = "₴";
    const CATEGORY_NAME = document.getElementById("category-name");
    const PRODUCTS_AREA = document.getElementsByClassName("area products-list")[0];
    const RESPONSE = await fetch(`./api/categories/${CATEGORY_ID}.json`);
    const CATEGORY = await RESPONSE.json();
    CATEGORY_NAME.textContent = CATEGORY.name;

    CATEGORY.products.forEach(product => {
        const PRODUCT_CONTAINER = document.createElement("div");
        PRODUCT_CONTAINER.id = product.id;
        PRODUCT_CONTAINER.className = "product-container";

        const PRODUCT_IMG = document.createElement("img");
        PRODUCT_IMG.src = product.image;

        const PRODUCT_BRAND = document.createElement("h3");
        PRODUCT_BRAND.textContent = product.brand + " " + product.model;

        const PRODUCT_DESCRIPTION = document.createElement("p");
        PRODUCT_DESCRIPTION.textContent = product.description;

        const PRODUCT_PRICE = document.createElement("em");
        PRODUCT_PRICE.textContent = `Цена: ${product.price} ${CURRENCY}`;

        const BTN_ADD_TO_CART = document.createElement("button");
        BTN_ADD_TO_CART.textContent = `Добавить в корзину`;

        PRODUCTS_AREA.append(PRODUCT_CONTAINER);
        PRODUCT_CONTAINER.append(PRODUCT_IMG, PRODUCT_BRAND, PRODUCT_DESCRIPTION, PRODUCT_PRICE, BTN_ADD_TO_CART);
        
        BTN_ADD_TO_CART.onclick = () => cartUI.addProduct(product.id, product.image, product.brand, product.model, product.price);
    });


}


loadProductsList();