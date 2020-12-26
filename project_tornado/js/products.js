"use strict";



async function loadProductsList(objArray = null) {

    let productsDB;
    const CURRENCY = "₴";
    const CATEGORY_NAME = document.getElementById("category-name");
    const PRODUCTS_AREA = document.getElementById("products-render-area");
    PRODUCTS_AREA.innerHTML = "";
   
    
    if(!objArray) {
        const CATEGORY_ID = window.location.search.slice(4);
        const RESPONSE = await fetch(`./api/categories/${CATEGORY_ID}.json`);
        await loadImmitation("#products-render-area");
        if(RESPONSE.status != 200) window.location.assign("404.html");
        else productsDB = await RESPONSE.json();
        
    } else {
        if(objArray.length == 0) {
            const random = Math.random()*10; 
            const NOTHING_FOUND = document.createElement("img");
            NOTHING_FOUND.src = `./images/not-found.gif?v=${random}`;
            NOTHING_FOUND.id = "not-found-panda";
            NOTHING_FOUND.remove();
            PRODUCTS_AREA.append(NOTHING_FOUND);
        }
        const DATA = {
            products: []
        };
        DATA.products = objArray;
        productsDB = DATA;

    };

    CATEGORY_NAME.textContent = productsDB.name || "Вот, что мы нашли..";

    productsDB.products.forEach(product => {
        const PRODUCT_CONTAINER = document.createElement("div");
        PRODUCT_CONTAINER.id = product.id;
        PRODUCT_CONTAINER.className = "product-container";



        const IMG_LINK = document.createElement("a");
        IMG_LINK.href = `item_info.html?id=${product.id}`;

        const PRODUCT_IMG = document.createElement("img");
        PRODUCT_IMG.src = product.image;

        const BRAND_LINK = document.createElement("a");
        BRAND_LINK.href = `item_info.html?id=${product.id}`;

        const PRODUCT_BRAND = document.createElement("h3");
        PRODUCT_BRAND.innerHTML = product.brand + "<br>" + product.model;

        const PRODUCT_DESCRIPTION = document.createElement("p");
        PRODUCT_DESCRIPTION.className = "product-description";
        PRODUCT_DESCRIPTION.innerHTML = product.description;

        const PRODUCT_PRICE = document.createElement("em");
        PRODUCT_PRICE.textContent = `Цена: ${product.price} ${CURRENCY}`;

        const BTN_ADD_TO_CART = document.createElement("button");
        BTN_ADD_TO_CART.textContent = `Добавить в корзину`;

        PRODUCTS_AREA.append(PRODUCT_CONTAINER);
        PRODUCT_CONTAINER.append(IMG_LINK, BRAND_LINK, PRODUCT_DESCRIPTION,
            PRODUCT_PRICE, BTN_ADD_TO_CART);
        IMG_LINK.append(PRODUCT_IMG);
        BRAND_LINK.append(PRODUCT_BRAND);

        BTN_ADD_TO_CART.onclick = () => cartUI.addProduct(product.id, product.image,
            product.brand, product.model, product.price);
    });
}


loadProductsList();
