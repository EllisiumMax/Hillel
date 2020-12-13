"use strict";

const cartUI = {
    cartContents: {
        allItemsPrice: 0,
        totalQtty: 0,
    },
    wrapper: document.createElement("div"),
    cartWindow: document.createElement("div"),
    userNameLabel: document.createElement("h3"),
    productsArea: document.createElement("div"),
    confirmOrderBtn: document.createElement("button"),
    cleanCartBtn: document.createElement("button"),
    closeWindowMark: document.createElement("p"),
    cartTotalPriceLabel: document.createElement("p"),
    emptyCart: document.createElement("img"),
    numberOfProductsInCart: document.getElementById("cart-text"),
    currencySymbol: "₴",
    openCart() {
        this.calcProductsTotalPrice();
        this.wrapper.className = "window-wrapper";
        this.cartWindow.id = "cart-window";
        this.productsArea.id = "products-area";
        this.closeWindowMark.id = "mark-close";
        this.closeWindowMark.innerHTML = "&#10006;";
        this.userNameLabel.id = "cart-user-name";
        this.userNameLabel.textContent =
            `Корзина пользователя - ${logRegUI.loggedUserName || "Гость"}`;
        this.cartTotalPriceLabel.textContent = "Общая сумма: " + this.cartContents
            .allItemsPrice +
            this.currencySymbol;
        this.cartTotalPriceLabel.id = "cart-total-price";
        this.confirmOrderBtn.textContent = "Купить";
        this.confirmOrderBtn.className = "confirm-order button";
        this.cleanCartBtn.id = "btn-clean-cart";
        this.cleanCartBtn.textContent = "Очистить корзину";
        document.body.append(this.wrapper);
        this.wrapper.append(this.cartWindow);



        if(this.productsArea.children.length == 0) {
            this.cartWindow.append(this.closeWindowMark);
            this.cartWindow.append(this.userNameLabel);
            this.emptyCart.id = "empty-cart-img";
            this.emptyCart.src = "images/empty-cart.png";
            this.cartWindow.append(this.emptyCart);
        }
        this.closeWindowMark.onclick = () => {
                this.wrapper.remove();
            },
            this.cartWindow.onclick = (e) => {
                e.stopPropagation();
            }
        this.confirmOrderBtn.onclick = (e) => {
            e.preventDefault();
        }
        this.wrapper.onclick = () => {
            this.wrapper.remove();
        }
        this.confirmOrderBtn.onclick = () => {
            this.cleanCart();
            this.wrapper.remove();
            infoWindowUI.show("Спасибо за покупку", 60);
        }
        this.cleanCartBtn.onclick = () => {
            this.cleanCart();
        }
    },
    addProduct(id, img, brand, model, price, qtty = 1) {
        if(this.emptyCart) {
            this.closeWindowMark.remove();
            this.userNameLabel.remove();
            this.emptyCart.remove();
            this.cartWindow.append(this.closeWindowMark);
            this.cartWindow.append(this.userNameLabel);
            this.cartWindow.append(this.productsArea);
            this.cartWindow.append(this.cartTotalPriceLabel);
            this.cartWindow.append(this.confirmOrderBtn);
            this.cartWindow.append(this.cleanCartBtn);
        }

        if(!this.cartContents[id]) {
            this.cartContents[id] = {
                brand: brand,
                model: model,
                price: price,
                quantity: qtty,
                img: img,
            };

            this.cartContents.allItemsPrice += +price;
            this.totalQuantity();
            this.numberOfProductsInCart.textContent = this.cartContents.totalQtty;
            this.cartTotalPriceLabel.textContent = "Общая сумма: " + this.cartContents
                .allItemsPrice +
                this.currencySymbol;
            this.saveCart();
            const productWrapper = document.createElement("div");
            productWrapper.id = "cart-product-wrapper";
            const itemPhoto = document.createElement("img");
            const itemBrand = document.createElement("p");
            const itemModel = document.createElement("p");
            const qttyContainer = document.createElement("div");
            let itemQtty = document.createElement("input");
            const btnPlus = document.createElement("button");
            const btnMinus = document.createElement("button");
            const itemPrice = document.createElement("p");
            const btnDeleteItem = document.createElement("button");
            itemPhoto.className = "cart-item-photo";
            itemBrand.className = "cart-item-brand";
            itemModel.className = "cart-item-model";
            qttyContainer.className = "cart-qtty-container";
            itemQtty.className = "cart-item-qtty";
            btnPlus.className = "cart-item plus";
            btnMinus.className = "cart-item minus";
            itemPrice.className = "cart-item-price";
            btnDeleteItem.className = "cart-item-delete";
            btnPlus.innerHTML = "&plus;";
            btnMinus.innerHTML = "&minus;";
            itemPhoto.src = img;
            itemBrand.textContent = brand;
            itemModel.textContent = model;
            itemQtty.value = qtty;
            itemPrice.textContent = price + this.currencySymbol;
            btnDeleteItem.textContent = "УДАЛИТЬ";
            this.productsArea.append(productWrapper);
            productWrapper.append(itemPhoto);
            productWrapper.append(itemBrand);
            productWrapper.append(itemModel);
            productWrapper.append(qttyContainer);
            qttyContainer.append(btnMinus);
            qttyContainer.append(itemQtty);
            qttyContainer.append(btnPlus);
            productWrapper.append(itemPrice);
            productWrapper.append(btnDeleteItem);


            btnPlus.onclick = () => {
                itemQtty.value++;
                this.totalQuantity();
                itemPrice.textContent = +price * itemQtty.value + this
                    .currencySymbol;
                this.cartContents.allItemsPrice += price;
                this.cartTotalPriceLabel.textContent = "Общая сумма: " + this
                    .cartContents.allItemsPrice + this.currencySymbol;
                this.numberOfProductsInCart.textContent++;
                this.cartContents[id].quantity++;
                this.saveCart();
            }


            btnMinus.onclick = () => {

                if(itemQtty.value > 1) {
                    itemQtty.value--;
                    this.cartContents[id].quantity--;
                    this.cartContents.allItemsPrice -= price;
                    this.numberOfProductsInCart.textContent--;
                    this.totalQuantity();
                    itemPrice.textContent = +price * itemQtty.value + this.currencySymbol;
                    this.cartTotalPriceLabel.textContent = "Общая сумма: " + this
                        .cartContents
                        .allItemsPrice + this.currencySymbol;
                    this.saveCart();
                }

            }
            itemQtty.onchange = () => {

                if(itemQtty.value < 0 || isNaN(itemQtty.value)) itemQtty.value = 1;

                itemQtty.value = Math.round(itemQtty.value);
                this.cartContents[id].quantity = itemQtty.value;
                itemPrice.textContent = this.cartContents[id].price * itemQtty.value + this
                    .currencySymbol;
                this.totalQuantity();
                this.calcProductsTotalPrice();
                this.numberOfProductsInCart.textContent = this.cartContents.totalQtty;
                this.cartTotalPriceLabel.textContent = "Общая сумма: " + this.cartContents
                    .allItemsPrice + this.currencySymbol;
                this.saveCart();
            }

            btnDeleteItem.onclick = (e) => {
                delete this.cartContents[id];
                this.totalQuantity();
                this.calcProductsTotalPrice();
                this.cartTotalPriceLabel.textContent = "Общая сумма: " + this.cartContents
                    .allItemsPrice + this
                    .currencySymbol;
                this.numberOfProductsInCart.textContent = this.cartContents.totalQtty;
                e.target.parentElement.remove();
                if(this.productsArea.children.length == 0) {
                    this.cleanCart();
                }
                this.saveCart();
            }
        } else this.openCart();
    },
    totalQuantity() {
        this.cartContents.totalQtty = 0;
        for(let product in this.cartContents) {
            if(product.startsWith("product_")) {
                this.cartContents.totalQtty += +this.cartContents[product].quantity;
            }

        }
    },
    cleanCart() {
        this.cartContents = {
            allItemsPrice: 0,
            totalQtty: 0,
        };
        this.cartWindow.append(this.emptyCart);
        this.productsArea.innerHTML = "";
        this.productsArea.remove();
        this.cartTotalPriceLabel.remove();
        this.confirmOrderBtn.remove();
        this.cleanCartBtn.remove();
        this.numberOfProductsInCart.textContent = 0;
        this.wrapper.remove();
        this.saveCart();
    },
    calcProductsTotalPrice() {
        this.cartContents.allItemsPrice = 0;
        for(let item in this.cartContents) {
            if(this.cartContents[item].price) {
                this.cartContents.allItemsPrice += (+this.cartContents[item].price * +this
                    .cartContents[item].quantity);
            }
        }
    },
    saveCart() {
        localStorage.setItem(logRegUI.loggedUserName, JSON.stringify(this.cartContents));
    },
    restoreCart() {
        const USER_CART = localStorage.getItem(logRegUI.loggedUserName);
        this.cleanCart();
        if(USER_CART) {
            const RESULTS = JSON.parse(USER_CART);
            for(let product in RESULTS) {
                if(product.startsWith("product_")) {
                    this.addProduct(product, RESULTS[product].img, RESULTS[product].brand,
                        RESULTS[
                            product].model, RESULTS[product].price, RESULTS[product]
                        .quantity);
                }
            }
            this.cartContents = RESULTS;
        } 
    }

}
