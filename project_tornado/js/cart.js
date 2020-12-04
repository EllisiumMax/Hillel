"use strict";

const cartUI = {
    wrapper: document.createElement("div"),
    cartWindow: document.createElement("div"),
    userNameLabel: document.createElement("h3"),
    productsArea: document.createElement("div"),
    confirmOrderBtn: document.createElement("button"),
    closeWindowMark: document.createElement("p"),
    openCart() {
        this.wrapper.className = "window-wrapper";
        this.cartWindow.id = "cart-window";
        this.closeWindowMark.id = "mark-close";
        this.closeWindowMark.innerHTML = "&#10006;";
        document.body.append(this.wrapper);
        this.wrapper.append(this.cartWindow);
        this.cartWindow.append(this.closeWindowMark);
    }
}