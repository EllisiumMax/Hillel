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
    productDescription: document.getElementById("product-description"),
    specsTable: document.getElementById("specs-table"),
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
                    `Ошибка: На складе осталось ${this.productInfo.stock} ед. товара.`,
                    1800)
            };
            if(this.productQtty.value > 100) {
                this.productQtty.value = 1;
                infoWindowUI.show(
                    "Ошибка: запрещено добавлять больше 100 ед. товара за один раз",
                    1800);
            }
        }
        this.productQtty.onpaste = (e) => {
            e.preventDefault();
        }
        this.addToCart.onclick = () => {
            cartUI.addProduct(this.productInfo.id, this.productInfo.images[0], this
                .productInfo
                .brand, this.productInfo.model, this.productInfo.price, this.productQtty
                .value);
        }

    },
    renderOverview() {
        const findBoldText = /(\*\*)([^*][\p{P}\p{L}\p{N}]+?)(\*\*)/gmiu;
        const findItalicText = /(__)([^*][\p{P}\p{L}\p{N}]+?)(__)/gmiu;
        const findLink =
            /\b(?<protocol>https?:\/\/)(?<domain>\w{1,63}\.[^\s/.:,]{1,63}(\.[^\s/.:,]{2,63})?(\.[^\s/.:,]{2,63})?)(?<port>\:\d{1,5})?(?<path>\/[\w\/]+(\.(\w{1,8}))?)?\b/mig;

        this.productDescription.innerHTML = this.productInfo.description.replace(findBoldText,
                "<i>$2</i>")
            .replace(findLink, '<a href="$&" class="user-link">$&</a>')
            .replace(findItalicText, "<b>$2</b>");
    },
    renderSpecifications() {
        for(let spec of this.productInfo.specifications) {
            const tableRow = document.createElement("tr");
            const specName = document.createElement("td");
            const specValue = document.createElement("td");
            specName.textContent = spec.name;
            specValue.textContent = spec.value;
            this.specsTable.append(tableRow);
            tableRow.append(specName, specValue);
            if(spec.hint) {
                const hintContainer = document.createElement("td");
                const hintIcon = document.createElement("img");
                const hintText = document.createElement("span");

                hintContainer.className = "hint-container";
                hintIcon.className = "hint-icon";
                hintText.className = "hint-text";
                hintIcon.src = "images/info-button.svg";
                hintText.innerHTML = spec.hint;
                tableRow.append(hintContainer);
                hintContainer.append(hintIcon, hintText);
            }
        }
    },
    async renderPage() {
        await this.loadProduct();
        this.renderHeader();
        this.renderInfo();
        this.renderOverview();
        this.renderSpecifications();
    }
}

productPage.renderPage();
