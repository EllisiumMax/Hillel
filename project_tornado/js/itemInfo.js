"use strict";

const productPage = {
    productId: window.location.search.slice(4),
    productInfo: "",
    currencySymbol: "₴",
    contentRenderArea: document.getElementById("product-info-page"),
    contentHeader: document.getElementById("item-info-header"),
    productBrand: document.getElementById("product-brand"),
    productModel: document.getElementById("product-model"),
    productPrice: document.getElementById("product-price"),
    productAvailable: document.getElementById("product-availability"),
    productRating: document.getElementById("product-rating"),
    productQtty: document.getElementById("product-quantity"),
    addToCart: document.getElementById("add-to-cart"),
    async loadProduct() {
        const RESPONSE = await fetch(`./api/products/${this.productId}.json`);
        if(RESPONSE.status != 200) window.location.assign("404.html");
        else this.productInfo = await RESPONSE.json();
        

    },
    async renderHeader() {
        this.contentHeader.textContent = this.contentHeader.textContent.replace("{{brand model}}", `${this.productInfo.brand} ${this.productInfo.model}`);
    },
    async renderInfo() {
        
        this.productBrand.textContent = this.productBrand.textContent.replace("{{brand}}", this.productInfo.brand);
        this.productModel.textContent = this.productModel.textContent.replace("{{model}}", this.productInfo.model);
        this.productPrice.textContent = this.productPrice.textContent.replace("{{price}}", `${this.productInfo.price} ${this.currencySymbol}`);
        if (this.productInfo.available) this.productAvailable.textContent = this.productAvailable.textContent.replace("{{available}}", "Есть в наличии");
        else this.productAvailable.textContent = this.productAvailable.textContent.replace("{{available}}", "Нет в наличии");
        this.productRating.textContent = this.productRating.textContent.replace("{{rating}}", this.productInfo.rating);

        this.productQtty.oninput = () => {
            if(!this.productQtty.value) this.productQtty.value=1;
            if(this.productQtty.value > this.productInfo.stock) {
                this.productQtty.value = this.productInfo.stock;
                infoWindowUI.show(`Ошибка: На складе осталось ${this.productInfo.stock} едениц товара.`, 1800)};
        }
        this.productQtty.onpaste = (e) => {
            e.preventDefault();
        }
        this.addToCart.onclick = () => {
            cartUI.addProduct(this.productInfo.id, this.productInfo.image, this.productInfo.brand, this.productInfo.model, this.productInfo.price);
        }
    },
    async renderPage() {
        await this.loadProduct();
        this.renderHeader();
        this.renderInfo();
    }
}

productPage.renderPage();
