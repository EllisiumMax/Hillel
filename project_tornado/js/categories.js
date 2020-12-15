"use strict";

async function loadCategories(url) {
    const CATEGORIES_FIRST_COLUMN = document.getElementById("categories-first");
    const CATEGORIES_SECOND_COLUMN = document.getElementById("categories-second");
    const RESPONSE = await fetch(url);
    const ALL_CATEGORIES = await RESPONSE.json();
    const NUMBER_OF_CATEGORIES = ALL_CATEGORIES.length;
    const ITEM_IN_COLUMN = Math.round(NUMBER_OF_CATEGORIES/2);
    let categoryFillStep = 0;
    for (let item of ALL_CATEGORIES) {
        const LINK_CONTAINER = document.createElement("a");
        const categoryIcon = document.createElement("img");
        const categoryElement = document.createElement("li");
        const categoryName = document.createElement("p");
        LINK_CONTAINER.href = `products.html?id=${item.id}`;
        categoryIcon.src = item.icon;
        categoryName.textContent = item.name;
        categoryElement.id = item.id;
        categoryName.href = `products.html?id=${item.id}`
        if (categoryFillStep != ITEM_IN_COLUMN) {
        categoryFillStep++;
        CATEGORIES_FIRST_COLUMN.append(categoryElement);
        categoryElement.append(LINK_CONTAINER);
        LINK_CONTAINER.append(categoryIcon, categoryName);
        } else {
        CATEGORIES_SECOND_COLUMN.append(categoryElement);
        categoryElement.append(LINK_CONTAINER);
        LINK_CONTAINER.append(categoryIcon, categoryName);
        }
    }
}

loadCategories("./api/categories.json");