"use strict";

const infoWindowUI = {
    windowWrapper: document.createElement("div"),
    window: document.createElement("div"),
    text: document.createElement("p"),
    show(message, ms = 800) {
        this.windowWrapper.style.opacity = 1;
        this.windowWrapper.className = "info-window-wrapper";
        this.window.className = "info-window";
        document.body.append(this.windowWrapper);
        this.windowWrapper.append(this.window);
        this.window.append(this.text);
        this.text.textContent = message;
        this.hide(ms);

    },
    hide(ms) {
        setTimeout( () => this.windowWrapper.style.opacity = 0, ms);
        setTimeout( () => this.windowWrapper.remove(), ms + 200);
    }
}
