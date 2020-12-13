"use strict";

const sliderUI = {
    async request(url) {
        let response = await fetch(url);
        let result = await response.json();
        return result;
    },
    async createSlider(divId, url, transitionTime = 550) {
        if (divId) {
        const RESULT = await this.request(url);
        let counter = 0;
        let autoChangeSlide = setInterval(next, 10000);
        const SLIDER_ELEMENT = document.querySelector(divId);
        const SLIDER_FLEX_CONTAINER = document.createElement("div");
        const SLIDER_BTN_PREV = document.createElement("button");
        const SLIDER_BTN_NEXT = document.createElement("button");
        const CURRENT_SLIDE = document.createElement("img");
        const SLIDER_BULLETS_AREA = document.createElement("div");
        const NEXT_SLIDE = document.createElement("img");
        const PREVIOUS_SLIDE = document.createElement("img");
        const PROMOTION_WRAPPER = document.createElement("div");
        const PROMOTION_TITLE = document.createElement("h2");
        const PROMOTION_DESCRIPTION = document.createElement("p");
        const PROMOTION_DISCOUNT = document.createElement("p");
        const PROMOTION_START = document.createElement("p");
        const PROMOTION_END = document.createElement("p");


        SLIDER_FLEX_CONTAINER.className =
            "slider-flex-container";
        SLIDER_BTN_NEXT.className = "slider-btn right";
        SLIDER_BTN_PREV.className = "slider-btn left";
        SLIDER_BULLETS_AREA.className = "slider-bullets-area";
        NEXT_SLIDE.id = "next";
        PREVIOUS_SLIDE.id = "previous";
        PROMOTION_WRAPPER.className = "promotions-wrapper";
        PROMOTION_TITLE.className = "promotions-title";
        PROMOTION_DESCRIPTION.className = "promotions-description";
        PROMOTION_DISCOUNT.className = "promotions-discount";
        PROMOTION_START.className = "promotions-start";
        PROMOTION_END.className = "promotions-end";

        PROMOTION_TITLE.textContent = RESULT[0].title;
        PROMOTION_DESCRIPTION.textContent = RESULT[0].description;
        PROMOTION_DISCOUNT.textContent = RESULT[0].sale;
        PROMOTION_START.textContent = `Начало: ${RESULT[0].start_date}`;
        PROMOTION_END.textContent = `Конец: ${RESULT[0].end_date}`;

        SLIDER_BTN_PREV.innerHTML = "&lsaquo;";
        SLIDER_BTN_NEXT.innerHTML = "&rsaquo;";

        PREVIOUS_SLIDE.src = RESULT[RESULT.length - 1].image;
        CURRENT_SLIDE.src = RESULT[0].image;
        NEXT_SLIDE.src = RESULT[1].image;

        SLIDER_ELEMENT.append(SLIDER_FLEX_CONTAINER, PROMOTION_WRAPPER,
            SLIDER_BULLETS_AREA);
        PROMOTION_WRAPPER.append(
            PROMOTION_TITLE, PROMOTION_DISCOUNT, PROMOTION_DESCRIPTION, PROMOTION_START,
            PROMOTION_END
        );
        SLIDER_FLEX_CONTAINER.append(
            SLIDER_BTN_PREV,
            NEXT_SLIDE,
            CURRENT_SLIDE,
            PREVIOUS_SLIDE,
            SLIDER_BTN_NEXT
        );
       
        for(let i = 0; i < RESULT.length; i++) {
            const SLIDER_BULLET = document.createElement("img");
            SLIDER_BULLET.className = "slider-bullet";
            SLIDER_BULLET.src = RESULT[i].image;
            SLIDER_BULLETS_AREA.append(SLIDER_BULLET);
            SLIDER_BULLET.onclick = () => {
                PROMOTION_WRAPPER.style.opacity = 0;
                SLIDER_BTN_PREV.style.opacity = 0;
                SLIDER_BTN_NEXT.style.opacity = 0;
                CURRENT_SLIDE.style.filter = "blur(10px)";
                CURRENT_SLIDE.style.transition = "all 0.4s";
                setTimeout(() => {
                    CURRENT_SLIDE.src = RESULT[i].image;
                    CURRENT_SLIDE.style.filter = "blur(0)";
                    PROMOTION_TITLE.textContent = RESULT[counter].title;
                    PROMOTION_DESCRIPTION.textContent = RESULT[counter]
                        .description;
                    PROMOTION_DISCOUNT.textContent = RESULT[counter].sale;
                    PROMOTION_START.textContent =
                        `Начало: ${RESULT[counter].start_date}`;
                    PROMOTION_END.textContent =
                        `Конец: ${RESULT[counter].end_date}`;
                    PROMOTION_WRAPPER.style.opacity = 1;
                    SLIDER_BTN_PREV.style.opacity = 1;
                    SLIDER_BTN_NEXT.style.opacity = 1;
                    clearInterval(autoChangeSlide);
                    autoChangeSlide = setInterval(next, 10000);
                }, transitionTime);
                const allBullets = SLIDER_BULLETS_AREA.querySelectorAll(
                    ".slider-bullet");
                allBullets.forEach(bullet => bullet.style.border = "");

                if(RESULT[i - 1]) PREVIOUS_SLIDE.src = RESULT[i - 1].image;
                else PREVIOUS_SLIDE.src = RESULT[RESULT.length - 1].image;

                if(RESULT[i + 1]) NEXT_SLIDE.src = RESULT[i + 1].image;
                else NEXT_SLIDE.src = RESULT[0].image;

                SLIDER_BULLET.style.border = "3px solid white";
                counter = i;
            }

        }
        const allBullets = SLIDER_BULLETS_AREA.querySelectorAll(
            ".slider-bullet");

        allBullets[0].style.border = "3px solid white";

        SLIDER_BTN_PREV.onclick = previous;
        SLIDER_BTN_NEXT.onclick = next;

        function next() {
            SLIDER_BTN_NEXT.onclick = null;
            PROMOTION_WRAPPER.style.opacity = 0;
            SLIDER_BTN_PREV.style.opacity = 0;
            SLIDER_BTN_NEXT.style.opacity = 0;
            allBullets[counter].style.border = "";
            counter++;
            NEXT_SLIDE.style.transition = `all ${transitionTime}ms linear`;

            if(counter > RESULT.length - 1) counter = 0;

            NEXT_SLIDE.style.left = "-3em";
            NEXT_SLIDE.style.left = "53em";
            setTimeout(() => {
                NEXT_SLIDE.style.transition = "none"
                NEXT_SLIDE.style.left = "-3em";
                CURRENT_SLIDE.src = RESULT[counter].image;
                PROMOTION_TITLE.textContent = RESULT[counter].title;
                PROMOTION_DESCRIPTION.textContent = RESULT[counter].description;
                PROMOTION_DISCOUNT.textContent = RESULT[counter].sale;
                PROMOTION_START.textContent =
                    `Начало: ${RESULT[counter].start_date}`;
                PROMOTION_END.textContent = `Конец: ${RESULT[counter].end_date}`;
                PROMOTION_WRAPPER.style.opacity = 1;
                SLIDER_BTN_PREV.style.opacity = 1;
                SLIDER_BTN_NEXT.style.opacity = 1;

                if(RESULT[counter + 1]) {
                    NEXT_SLIDE.src = RESULT[counter + 1].image;
                    PREVIOUS_SLIDE.src = RESULT[RESULT.length - 1].image;
                    if(RESULT[counter - 1]) PREVIOUS_SLIDE.src = RESULT[
                        counter - 1].image;
                } else {
                    NEXT_SLIDE.src = RESULT[0].image;
                    PREVIOUS_SLIDE.src = RESULT[counter - 1].image;
                }

                allBullets[counter].style.border = "3px solid white";
                SLIDER_BTN_NEXT.onclick = next;
                clearInterval(autoChangeSlide);
                autoChangeSlide = setInterval(next, 10000);
            }, transitionTime);
        }

        function previous() {
            SLIDER_BTN_PREV.onclick = null;
            PROMOTION_WRAPPER.style.opacity = 0;
            SLIDER_BTN_PREV.style.opacity = 0;
            SLIDER_BTN_NEXT.style.opacity = 0;
            allBullets[counter].style.border = "";
            counter--;
            PREVIOUS_SLIDE.style.transition = `all ${transitionTime}ms linear`;

            if(counter < 0) {
                counter = RESULT.length - 1;
                NEXT_SLIDE.src = RESULT[0].image;
            }

            PREVIOUS_SLIDE.style.left = "3em";
            PREVIOUS_SLIDE.style.left = "-53.5em";
            setTimeout(() => {
                PREVIOUS_SLIDE.style.transition = "none"
                PREVIOUS_SLIDE.style.left = "3em";
                CURRENT_SLIDE.src = RESULT[counter].image;
                PROMOTION_TITLE.textContent = RESULT[counter].title;
                PROMOTION_DESCRIPTION.textContent = RESULT[counter].description;
                PROMOTION_DISCOUNT.textContent = RESULT[counter].sale;
                PROMOTION_START.textContent =
                    `Начало: ${RESULT[counter].start_date}`;
                PROMOTION_END.textContent = `Конец: ${RESULT[counter].end_date}`;
                PROMOTION_WRAPPER.style.opacity = 1;
                SLIDER_BTN_PREV.style.opacity = 1;
                SLIDER_BTN_NEXT.style.opacity = 1;

                if(RESULT[counter - 1]) {
                    PREVIOUS_SLIDE.src = RESULT[counter - 1].image;
                    if(RESULT[counter + 1]) NEXT_SLIDE.src = RESULT[counter +
                        1].image;
                    else NEXT_SLIDE.src = RESULT[0].image;
                } else {
                    PREVIOUS_SLIDE.src = RESULT[RESULT.length - 1].image;
                    NEXT_SLIDE.src = RESULT[counter + 1].image;
                }

                allBullets[counter].style.border = "3px solid white";
                SLIDER_BTN_PREV.onclick = previous;
                clearInterval(autoChangeSlide);
                autoChangeSlide = setInterval(next, 10000);
            }, transitionTime);
        }
    }
}
};


sliderUI.createSlider("#sales-slider", "./api/promotions.json", 300);