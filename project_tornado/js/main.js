"use strict";

const CART_BTN = document.getElementById("cart");
const LOGIN_BTN = document.getElementById("btn-login");
const LOGOUT_BTN = document.getElementById("btn-logout");


CART_BTN.onclick = () => cartUI.openCart();
LOGIN_BTN.onclick = () => logRegUI.createLoginWindow();
window.onload = logRegUI.initiateUser();
window.onload = logRegUI.restoreLogin();
window.onload = cartUI.restoreCart();


