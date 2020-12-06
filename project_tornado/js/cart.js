"use strict";

const cartUI = {
    wrapper: document.createElement("div"),
    cartWindow: document.createElement("div"),
    userNameLabel: document.createElement("h3"),
    productsArea: document.createElement("div"),
    confirmOrderBtn: document.createElement("button"),
    closeWindowMark: document.createElement("p"),
    totalPrice: document.createElement("p"),
    emptyCart: document.createElement("img"),
    productsInCart: document.getElementById("cart-text"),
    priceCounter: 0,
    currencySymbol: "₴",
    openCart() {
        this.wrapper.className = "window-wrapper";
        this.cartWindow.id = "cart-window";
        this.productsArea.id = "products-area";
        this.closeWindowMark.id = "mark-close";
        this.closeWindowMark.innerHTML = "&#10006;";
        this.userNameLabel.id = "cart-user-name";
        this.userNameLabel.textContent =
            `Корзина пользователя - ${logRegUI.loggedUserName || "Гость"}`;
        this.totalPrice.textContent = "Общая сумма: " + this.priceCounter +
            this.currencySymbol;
        this.totalPrice.id = "cart-total-price";
        this.confirmOrderBtn.textContent = "Купить";
        this.confirmOrderBtn.className = "confirm-order button";
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
            this.addProduct(
                "images/test.png", "Samsung", "Galaxy S11", 7500);
        }
    },
    addProduct(img, brand, model, price) {
        if(this.emptyCart) {
            this.closeWindowMark.remove();
            this.userNameLabel.remove();
            this.emptyCart.remove();
            this.cartWindow.append(this.closeWindowMark);
            this.cartWindow.append(this.userNameLabel);
            this.cartWindow.append(this.productsArea);
            this.cartWindow.append(this.totalPrice);
            this.cartWindow.append(this.confirmOrderBtn);
        }
        this.productsInCart.textContent++;
        this.priceCounter += price;
        this.totalPrice.textContent = "Общая сумма: " + this.priceCounter +
            this.currencySymbol;
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
        itemQtty.value = 1;
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
            itemPrice.textContent = +price * itemQtty.value + this
                .currencySymbol;
            this.priceCounter += price;
            this.totalPrice.textContent = "Общая сумма: " + this
                .priceCounter + this.currencySymbol;
            this.productsInCart.textContent++;
        }
        itemQtty.onchange = () => {
            if(itemQtty.value < 0 || isNaN(itemQtty.value)) itemQtty
                .value = 1;
            itemQtty.value = Math.round(itemQtty.value);
            const allProducts = this.productsArea.querySelectorAll(
                ".cart-item-price");
            const allQtty = this.productsArea.querySelectorAll(
                ".cart-item-qtty");
            itemPrice.textContent = +price * itemQtty.value + this
                .currencySymbol;
            this.priceCounter = +price * itemQtty.value;
            let allProductsPrice = 0;
            allProducts.forEach(item => {
                allProductsPrice += +((item.innerHTML).replace(
                    /\D/g, ""));
            });
            let totalQtty = 0;
            allQtty.forEach(item => {
                totalQtty += +(item.value);
            });
            this.productsInCart.textContent = totalQtty;
            this.priceCounter = allProductsPrice;
            this.totalPrice.textContent = "Общая сумма: " + this
                .priceCounter + this.currencySymbol;

        }
        btnMinus.onclick = () => {
            if(itemQtty.value > 0) itemQtty.value--;
            itemPrice.textContent = +price * itemQtty.value + this
                .currencySymbol;
            this.priceCounter -= price;
            this.totalPrice.textContent = "Общая сумма: " + this
                .priceCounter + this.currencySymbol;
            this.productsInCart.textContent--;
        }
        btnDeleteItem.onclick = (e) => {
         
            this.priceCounter -= itemPrice.textContent.replace(/\D/g, "");
            this.totalPrice.textContent = "Общая сумма: " + this.priceCounter + this.currencySymbol;
            this.productsInCart.textContent -= itemQtty.value;
            e.target.parentElement.remove();
            if (this.productsArea.children.length == 0) {
                this.productsArea.remove();
                this.totalPrice.remove();
                this.confirmOrderBtn.remove();
                this.cartWindow.append(this.emptyCart);
                setTimeout( () => {
                    this.wrapper.remove()
                }, 3000);
            }
        }
    },
}
