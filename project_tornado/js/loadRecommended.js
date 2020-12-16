"use strict";



async function loadRecommended () {
    const PRODUCTS_AREA = document.getElementById("recommended-products-area");
    const RESPONSE = await fetch(`./api/recommended.json`);
    const PRODUCTS_LIST = await RESPONSE.json();
    const RANDOM_PRODUCTS = new Set();
    const CURRENCY = "₴";
    const PRODUCTS_TO_SHOW = 4;
    let currentStep = 0;

    while (RANDOM_PRODUCTS.size != 4){
        let random = Math.round(Math.random()*(PRODUCTS_LIST.length-1));
        RANDOM_PRODUCTS.add(PRODUCTS_LIST[random]);
    }

    RANDOM_PRODUCTS.forEach(product => {
        
        if (currentStep < PRODUCTS_TO_SHOW) {
            currentStep++;
        const PRODUCT_CONTAINER = document.createElement("div");
        PRODUCT_CONTAINER.id = product.id;
        PRODUCT_CONTAINER.className = "recommended product-container";

        const IMG_LINK = document.createElement("a");
        IMG_LINK.href = `item_info.html?id=${product.id}`;

        const PRODUCT_IMG = document.createElement("img");
        PRODUCT_IMG.src = product.image;

        const BRAND_LINK = document.createElement("a");
        BRAND_LINK.href = `item_info.html?id=${product.id}`;

        const PRODUCT_BRAND = document.createElement("h3");
        PRODUCT_BRAND.innerHTML = product.brand + "<br>" + product.model;

        const PRODUCT_DESCRIPTION = document.createElement("p");
        PRODUCT_DESCRIPTION.textContent = product.description;

        const PRODUCT_PRICE = document.createElement("em");
        PRODUCT_PRICE.textContent = `Цена: ${product.price} ${CURRENCY}`;

        const BTN_ADD_TO_CART = document.createElement("button");
        BTN_ADD_TO_CART.textContent = `Добавить в корзину`;

        PRODUCTS_AREA.append(PRODUCT_CONTAINER);
        PRODUCT_CONTAINER.append(IMG_LINK, BRAND_LINK, PRODUCT_DESCRIPTION, PRODUCT_PRICE, BTN_ADD_TO_CART);
        IMG_LINK.append(PRODUCT_IMG);
        BRAND_LINK.append(PRODUCT_BRAND);
        
        BTN_ADD_TO_CART.onclick = () => cartUI.addProduct(product.id, product.image, product.brand, product.model, product.price);
        }
    });
}


loadRecommended();

