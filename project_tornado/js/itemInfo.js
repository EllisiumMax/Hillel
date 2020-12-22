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
    findLink: /\b(?<protocol>https?:\/\/)(?<domain>\w{1,63}\.[^\s/.:,]{1,63}(\.[^\s/.:,]{2,63})?(\.[^\s/.:,]{2,63})?)(?<port>\:\d{1,5})?(?<path>\/[\w\/]+(\.(\w{1,8}))?)?\b/mig,
    findBoldText: /(\*\*)([^*][\p{P}\p{L}\p{N}]+?)(\*\*)/gmiu,
    findItalicText: /(__)([^*][\p{P}\p{L}\p{N}]+?)(__)/gmiu,
    async loadProduct() {
        const RESPONSE = await fetch(`./api/products/${this.productId}.json`);
        if(RESPONSE.status != 200) window.location.assign("404.html");
        else this.productInfo = await RESPONSE.json();
        await loadImmitation("#product-info-page", true);
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
        this.productDescription.innerHTML = this.productInfo.overview.replace(this
                .findBoldText,
                "<b>$2</b>")
            .replace(this.findLink, '<a href="$&" class="user-link">$&</a>')
            .replace(this.findItalicText, "<i>$2</i>");
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
                hintIcon.className = "hint-ico";
                hintText.className = "hint-text";
                hintIcon.src = "images/info-ico.svg";
                hintText.innerHTML = spec.hint;
                tableRow.append(hintContainer);
                hintContainer.append(hintIcon, hintText);
            }
        }
    },
    renderComments() {
        const commentsArea = document.getElementById("comments-render-area");
        const date = new Date();
        for(let record of this.productInfo.reviews) {
            const commentContainer = document.createElement("div");
            const titleContainer = document.createElement("div");
            const userName = document.createElement("h4");
            const dateIcon = document.createElement("img");
            const date = document.createElement("p");
            const commentBody = document.createElement("p");
            const rating = document.createElement("p");
            const passedHours = ((Date.now() - Date.parse(record.date)) / 3600000);

            titleContainer.className = "comments-title-container"
            dateIcon.src = "images/time-passed.svg"
            userName.textContent = record.user;
            commentBody.innerHTML = record.comment
                .replace(this.findBoldText, "<b>$2</b>")
                .replace(this.findItalicText, "<i>$2</i>")
                .replace(this.findLink, "[MOD: ссылка]");
            rating.textContent = `Оценка: ${record.rating}`;
            commentsArea.append(commentContainer);
            commentContainer.append(titleContainer, commentBody, rating);
            titleContainer.append(userName, dateIcon, date);
            if(passedHours >= 1 && passedHours < 24) date.textContent =
                `${Math.round(passedHours)} ч. назад`;
            if(passedHours < 1) date.textContent = `${Math.round(passedHours * 60)} м. назад`;
            if(passedHours > 24) {
                let convertToDays = passedHours / 24;
                let spreadNumbers = convertToDays.toString().split(".");
                let days = spreadNumbers[0];
                let hours = "0." + spreadNumbers[1];
                date.textContent = `${days} д. ${Math.round(hours *24)} ч. назад`;
            }
        }


    },
    async renderPage() {
        await this.loadProduct();
        this.renderHeader();
        this.renderInfo();
        this.renderOverview();
        this.renderSpecifications();
        this.renderComments();
    }
}

productPage.renderPage();
