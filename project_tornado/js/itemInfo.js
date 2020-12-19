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
    renderHeader() {
        this.contentHeader.textContent = this.contentHeader.textContent.replace(
            "{{brand model}}", `${this.productInfo.brand} ${this.productInfo.model}`);
    },

    renderInfo() {
        productSlider.createSlider("product-slider", this.productInfo.images, 600);
        this.productBrand.innerHTML = this.productBrand.innerHTML.replace("{{brand}}", this
            .productInfo.brand);
        this.productModel.innerHTML = this.productModel.innerHTML.replace("{{model}}", this
            .productInfo.model);
        this.productPrice.innerHTML = this.productPrice.innerHTML.replace("{{price}}",
            `${this.productInfo.price} ${this.currencySymbol}`);
        if(this.productInfo.available) this.productAvailable.innerHTML = this.productAvailable
            .innerHTML.replace("{{available}}", "Есть в наличии");
        else this.productAvailable.innerHTML = this.productAvailable.innerHTML.replace(
            "{{available}}", "Нет в наличии");
        this.productRating.value = this.productInfo.rating;

        this.productQtty.oninput = () => {
            if(!this.productQtty.value) this.productQtty.value = 1;
            if(this.productQtty.value > this.productInfo.stock) {
                this.productQtty.value = this.productInfo.stock;
                infoWindowUI.show(
                    `Ошибка: На складе осталось ${this.productInfo.stock} едениц товара.`,
                    1800)
            };
        }
        this.productQtty.onpaste = (e) => {
            e.preventDefault();
        }
        this.addToCart.onclick = () => {
            cartUI.addProduct(this.productInfo.id, this.productInfo.images[0], this.productInfo
                .brand, this.productInfo.model, this.productInfo.price, this.productQtty.value);
        }
    },
    async renderPage() {
        await this.loadProduct();
        this.renderHeader();
        this.renderInfo();
    }
}

productPage.renderPage();
