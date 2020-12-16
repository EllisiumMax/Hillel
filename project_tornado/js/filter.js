"use strict";

const productsFilter = {
    productsDB: [],
    brands: new Set(),
    sortBy: "",
    selectedBrands: [],
    priceMin: "",
    priceMax: "",
    filteredProducts: [],
    sortSelector: document.getElementById("sort"),
    checkBoxArea: document.getElementById("filter-checkbox"),
    applySortBtn: document.getElementById("apply-sort"),
    priceFromElement: document.getElementById("price-min"),
    priceToElement: document.getElementById("price-max"),

    async loadDB() {
        const CATEGORY_ID = window.location.search.slice(4);
        const RESPONSE = await fetch(`./api/categories/${CATEGORY_ID}.json`);
        this.productsDB = await RESPONSE.json();
        this.productsDB.products.forEach(product => this.brands.add(product.brand));
    },

    async loadBrands() {
        await this.loadDB();
        this.brands.forEach(brand => {
            const container = document.createElement("div");
            container.className = "filter-brand-container";
            const checkBox = document.createElement("input");
            const checkBoxText = document.createElement("p");
            checkBox.type = "checkbox";
            checkBox.checked = "true";
            checkBox.value = brand.toLowerCase();
            checkBox.name = "brand";
            checkBoxText.textContent = brand;
            this.checkBoxArea.append(container);
            container.append(checkBox, checkBoxText);
        });
    },
    getFormData() {
        const FORM = new FormData(filters);
        this.sortBy = FORM.get("sort-by");
        this.selectedBrands = FORM.getAll("brand");
        this.priceMin = FORM.get("price-min");
        this.priceMax = FORM.get("price-max") ? FORM.get("price-max") : 9999999999;
    },
    sortDB() {
        this.getFormData();
        this.filteredProducts = this.productsDB.products.filter((product) => {
                for(let brand of this.selectedBrands) {
                    if(product.brand.toLowerCase() == brand && product.price >= (this
                            .priceMin) && product.price <= (this.priceMax)) return true;
                }
            });
        switch (this.sortBy) {
        case "rating":
            this.filteredProducts.sort((a, b) => (a.rating < b.rating) ? 1 : -1);
            break;
        case "price-min-max":
            this.filteredProducts.sort((a, b) => (a.price > b.price) ? 1 : -
                1);
            break;
        case "price-max-min":
            this.filteredProducts.sort((a, b) => (a.price < b.price) ? 1 : -
                1);
            break;
        case "brand-a-z":
            this.filteredProducts.sort((a, b) => (a.brand > b.brand) ? 1 : -
                1);
            break;
        case "brand-z-a":
            this.filteredProducts.sort((a, b) => (a.brand < b.brand) ? 1 : -
                1);
            break;
        case "new":
            this.filteredProducts.sort((a, b) => (Date.parse(b.added) - Date.parse(a.added)));
            break;
        }

        console.log(this.filteredProducts);
    },
    applyFilter() {
        this.sortDB();
        loadProductsList(this.filteredProducts);
    }
}

productsFilter.loadBrands();


productsFilter.applySortBtn.onclick = (e) => {
    e.preventDefault();
    productsFilter.applyFilter();
}




// function minToMax(a, b) {
//     if(a < b) return -1;
//     if(a > b) return 1;
//     if(a = b) return 0;
// }

// function maxToMin(a,b) {
//     if(a < b) return 1;
//     if(a > b) return -1;
//     if(a = b) return 0;
// }

// let arr = [101, 10, 14, 20, 1, 0, 4, 45, -1];
// let arr2 = [101, 10, 14, 20, 1, 0, 4, 45, -1];

// let minTomax = arr.sort(minToMax);
// let maxtomin = arr2.sort(maxToMin);
// console.log(minTomax);
// console.log(maxtomin);
