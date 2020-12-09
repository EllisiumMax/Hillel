"use strict";

async function loadCategories(url) {
    const CATEGORIES_FIRST_COLUMN = document.getElementById("categories-first");
    const CATEGORIES_SECOND_COLUMN = document.getElementById("categories-second");
    let response = await fetch(url);
    let allCategories = await response.json();
    let numberOfCategories = allCategories.length;
    let itemsInColumn = Math.round(numberOfCategories/2);
    let categoryFillStep = 0;
    for (let item of allCategories) {
        const categoryElement = document.createElement("li");
        const categoryName = document.createElement("a");
        categoryName.textContent = item.name;
        categoryName.id = item.id;
        if (categoryFillStep != itemsInColumn) {
        categoryFillStep++;
        CATEGORIES_FIRST_COLUMN.append(categoryElement);
        categoryElement.append(categoryName);
        } else {
        CATEGORIES_SECOND_COLUMN.append(categoryElement);
        categoryElement.append(categoryName);
        }
    }
    

    console.log(allCategories);







        return allCategories;

}