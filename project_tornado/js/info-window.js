"use strict";

const infoWindowUI = {
    window: document.createElement("div"),
    text: document.createElement("p"),
    timer: 100,
    opacity: 100,
    interval: "",
    show(message) {
        this.timer = 100;
        this.opacity = 100;
        this.window.className = "info-window";
        document.body.append(this.window);
        this.window.append(this.text);
        this.text.textContent = message;
        this.hide();

    },
    hide() {
        this.window.style.opacity = this.opacity + "%";
        this.interval = setInterval(() => {
            if(this.timer > 40) {
                this.timer--;
                this.opacity--;
                this.window.style.opacity = this.opacity + "%";
                if(this.timer == 40) {
                    clearInterval(this.interval);
                    this.window.remove();
                }
            }
        }, 32);
    }
}
