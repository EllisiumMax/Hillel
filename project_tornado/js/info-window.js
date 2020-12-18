"use strict";

const infoWindowUI = {
    window: document.createElement("div"),
    text: document.createElement("p"),
    show(message, ms = 800) {
        this.window.style.opacity = 1;
        this.window.className = "info-window";
        document.body.append(this.window);
        this.window.append(this.text);
        this.text.textContent = message;
        this.hide(ms);

    },
    hide(ms) {
        setTimeout( () => this.window.style.opacity = 0, ms);
        setTimeout( () => this.window.remove(), ms + 200);
    }
}
