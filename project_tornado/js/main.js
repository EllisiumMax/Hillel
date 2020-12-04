"use strict";

const LOGIN_BTN = document.getElementById("btn-login");
const CART_BTN = document.getElementById("cart");

CART_BTN.onclick = () => cartUI.openCart();
LOGIN_BTN.onclick = () => logRegUI.createLoginWindow();
