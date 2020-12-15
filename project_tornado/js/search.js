"use strict";


const SEARCH_BTN = document.getElementById("btn-search");



const SEARCH_PRODUCT = {
    searchField: document.getElementById("search-field"),
    searchWord: "",
    proposeWindow: document.createElement("div"),
    productsDB: [],
    foundProducts: [],
    async loadDB() {
        let response = await fetch("./api/categories.json");
        let result = await response.json();
        for(let item of result) {
            let response = await fetch(`./api/categories/${item.id}.json`);
            let result = await response.json();
            for(let item of result.products) {
                this.productsDB.push(item);
            }
        }
    },
    async searchDB() {
        this.searchWord = this.searchField.value.trim().toLowerCase();
        this.foundProducts = [];
        await this.loadDB();
        if(this.searchWord) {
        for(let item of this.productsDB) {
            let fullName = `${item.brand.toLowerCase()} ${item.model.toLowerCase()}`;
            if(fullName.includes(this.searchWord)) {
                this.foundProducts.push(item);
            }
        }
        this.productsDB = [];
    }
    },
   async autocomplete() {
    this.proposeWindow.innerHTML = "";
        await this.searchDB();
        const PANEL = document.getElementById("products-panel");
        const REGEXP = new RegExp(this.searchWord, "ig");
        this.proposeWindow.id = "search-autocomplete-window";
        if(this.searchWord.length >= 2) {
        PANEL.append(this.proposeWindow);
        
        for(let i = 0; i < this.foundProducts.length; i++) {
            let element = document.createElement("a");
            element.href = `item_info.html?id=${this.foundProducts[i].id}`;
            let highLightText = `${this.foundProducts[i].brand} ${this.foundProducts[i].model}`.replace(REGEXP, `<b>$&</b>`);
            element.innerHTML = highLightText;
            this.proposeWindow.append(element);
        }
    }
        if(!this.searchWord || this.proposeWindow.innerHTML == "") this.proposeWindow.remove();

    },
    async renderResults() {
        await this.searchDB();
        await loadProductsList(this.foundProducts);
        this.proposeWindow.remove();
        this.searchField.value = "";
    },
}


SEARCH_BTN.onclick = (e) => {
    e.preventDefault();
    SEARCH_PRODUCT.renderResults();
};

SEARCH_PRODUCT.searchField.oninput = () => {
    SEARCH_PRODUCT.autocomplete();
}
