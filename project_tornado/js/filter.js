"use strict";

const productsFilter = {
    productsDB: [],
    constMin: "",
    constMax: "",
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
        await loadImmitation("#filter-checkbox")
        this.productsDB = await RESPONSE.json();
        this.productsDB.products.forEach(product => this.brands.add(product.brand));
    },

    async loadBrandsAndPrices() {
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
        this.productsDB.products.sort((a, b) => (a.price > b.price) ? 1 : -
        1);
        this.priceFromElement.value = this.productsDB.products[0].price;
        this.priceMin = this.productsDB.products[0].price;
        this.constMin = this.productsDB.products[0].price;
        this.priceToElement.value = this.productsDB.products[this.productsDB.products.length-1].price;
        this.priceMax =  this.productsDB.products[this.productsDB.products.length-1].price;
        this.constMax = this.productsDB.products[this.productsDB.products.length-1].price;
    },
    controllMinPriceInput() {
        if(this.priceFromElement.value < 0 || this.priceFromElement.value > this.constMax) this.priceFromElement.value = this.constMin;
    },
    conrollMaxPriceInput() {
        if(this.priceToElement.value < 0 || this.priceToElement.value > this.constMax) this.priceToElement.value = this.constMax; 
    },
    getFormData() {
        const FORM = new FormData(filters);
        this.sortBy = FORM.get("sort-by");
        this.selectedBrands = FORM.getAll("brand");
        if (FORM.get("price-min") < this.constMin || FORM.get("price-min") > this.constMax) this.priceFromElement.value = this.priceMin;
        else this.priceMin = FORM.get("price-min");
        if (FORM.get("price-max") > this.constMax || FORM.get("price-max") < this.constMin) this.priceToElement.value = this.priceMax;
        else this.priceMax = FORM.get("price-max");
        
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

productsFilter.loadBrandsAndPrices();
productsFilter.priceFromElement.oninput = () => productsFilter.controllMinPriceInput();
productsFilter.priceToElement.oninput = () => productsFilter.conrollMaxPriceInput();
productsFilter.applySortBtn.onclick = (e) => {
    e.preventDefault();
    productsFilter.applyFilter();
}