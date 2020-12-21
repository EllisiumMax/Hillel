"use strict";

async function loadCategories(url) {
    const CATEGORIES = document.getElementById("categories-area");
    const CATEGORIES_FIRST_COLUMN = document.createElement("ul");
    const CATEGORIES_SECOND_COLUMN = document.createElement("ul");

    CATEGORIES_FIRST_COLUMN.id = "categories-first";
    CATEGORIES_FIRST_COLUMN.className = "products-column";
    CATEGORIES_SECOND_COLUMN.id = "categories-second";
    CATEGORIES_SECOND_COLUMN.className = "products-column";

    const RESPONSE = await fetch(url);
    await loadImmitation(".categories");
    const ALL_CATEGORIES = await RESPONSE.json();
    const NUMBER_OF_CATEGORIES = ALL_CATEGORIES.length;
    const ITEM_IN_COLUMN = Math.round(NUMBER_OF_CATEGORIES/2);
    let categoryFillStep = 0;

    CATEGORIES.append(CATEGORIES_FIRST_COLUMN, CATEGORIES_SECOND_COLUMN);

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