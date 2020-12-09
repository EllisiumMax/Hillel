"use strict";

const LOGIN_BTN = document.getElementById("btn-login");
const CART_BTN = document.getElementById("cart");

CART_BTN.onclick = () => cartUI.openCart();
LOGIN_BTN.onclick = () => logRegUI.createLoginWindow();

sliderUI.createSlider("#sales-slider", "./api/promotions.json", 300);
loadCategories("./api/categories.json");