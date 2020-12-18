"use strict";

const productSlider = {

    createSlider(divId, imgArray, transitionTime = 550) {
        if (divId) {
        let counter = 0;
        const SLIDER_ELEMENT = document.getElementById(divId);
        const SLIDER_FLEX_CONTAINER = document.createElement("div");
        const SLIDER_BTN_PREV = document.createElement("button");
        const SLIDER_BTN_NEXT = document.createElement("button");
        const CURRENT_SLIDE = document.createElement("img");
        const SLIDER_BULLETS_AREA = document.createElement("div");
        const NEXT_SLIDE = document.createElement("img");
        const PREVIOUS_SLIDE = document.createElement("img");

        SLIDER_FLEX_CONTAINER.className =
            "slider-flex-container";
        SLIDER_BTN_NEXT.className = "slider-btn right";
        SLIDER_BTN_PREV.className = "slider-btn left";
        SLIDER_BULLETS_AREA.className = "slider-bullets-area";
        NEXT_SLIDE.id = "next";
        PREVIOUS_SLIDE.id = "previous";

        SLIDER_BTN_PREV.innerHTML = "&lsaquo;";
        SLIDER_BTN_NEXT.innerHTML = "&rsaquo;";

        PREVIOUS_SLIDE.src = imgArray[imgArray.length - 1];
        CURRENT_SLIDE.src = imgArray[0];
        NEXT_SLIDE.src = imgArray[1];

        SLIDER_ELEMENT.append(SLIDER_BULLETS_AREA, SLIDER_FLEX_CONTAINER,);
       
        SLIDER_FLEX_CONTAINER.append(
            SLIDER_BTN_PREV,
            NEXT_SLIDE,
            CURRENT_SLIDE,
            PREVIOUS_SLIDE,
            SLIDER_BTN_NEXT
        );
       
        for(let i = 0; i < imgArray.length; i++) {
            const SLIDER_BULLET = document.createElement("img");
            SLIDER_BULLET.className = "slider-bullet";
            SLIDER_BULLET.src = imgArray[i];
            SLIDER_BULLETS_AREA.append(SLIDER_BULLET);
            SLIDER_BULLET.onclick = () => {
                if (SLIDER_BULLET.src != CURRENT_SLIDE.src) {
                SLIDER_BTN_PREV.style.opacity = 0;
                SLIDER_BTN_NEXT.style.opacity = 0;
                CURRENT_SLIDE.style.filter = "blur(10px)";
                CURRENT_SLIDE.style.transition = "all 0.4s";
                setTimeout(() => {
                    CURRENT_SLIDE.src = imgArray[i];
                    CURRENT_SLIDE.style.filter = "blur(0)";
                    SLIDER_BTN_PREV.style.opacity = 1;
                    SLIDER_BTN_NEXT.style.opacity = 1;
                }, transitionTime);
                const allBullets = SLIDER_BULLETS_AREA.querySelectorAll(
                    ".slider-bullet");
                allBullets.forEach(bullet => bullet.style.boxShadow = "");

                if(imgArray[i - 1]) PREVIOUS_SLIDE.src = imgArray[i - 1];
                else PREVIOUS_SLIDE.src = imgArray[imgArray.length - 1];

                if(imgArray[i + 1]) NEXT_SLIDE.src = imgArray[i + 1];
                else NEXT_SLIDE.src = imgArray[0];

                SLIDER_BULLET.style.boxShadow = "0 0 10px 1px rgb(111, 0, 255)";
                counter = i;
            }
        }
        }
        const allBullets = SLIDER_BULLETS_AREA.querySelectorAll(
            ".slider-bullet");

        allBullets[0].style.boxShadow = "0 0 10px 1px rgb(111, 0, 255)";

        SLIDER_BTN_PREV.onclick = previous;
        SLIDER_BTN_NEXT.onclick = next;

        function next() {
            SLIDER_BTN_NEXT.onclick = null;
            SLIDER_BTN_PREV.style.opacity = 0;
            SLIDER_BTN_NEXT.style.opacity = 0;
            allBullets[counter].style.boxShadow = "";
            counter++;
            NEXT_SLIDE.style.transition = `all ${transitionTime}ms linear`;

            if(counter > imgArray.length - 1) counter = 0;

            NEXT_SLIDE.style.left = "-3em";
            NEXT_SLIDE.style.left = "31.1em";
            setTimeout(() => {
                NEXT_SLIDE.style.transition = "none"
                NEXT_SLIDE.style.left = "-3em";
                CURRENT_SLIDE.src = imgArray[counter];
                SLIDER_BTN_PREV.style.opacity = 1;
                SLIDER_BTN_NEXT.style.opacity = 1;

                if(imgArray[counter + 1]) {
                    NEXT_SLIDE.src = imgArray[counter + 1];
                    PREVIOUS_SLIDE.src = imgArray[imgArray.length - 1];
                    if(imgArray[counter - 1]) PREVIOUS_SLIDE.src = imgArray[
                        counter - 1];
                } else {
                    NEXT_SLIDE.src = imgArray[0];
                    PREVIOUS_SLIDE.src = imgArray[counter - 1];
                }

                allBullets[counter].style.boxShadow = "0 0 10px 1px rgb(111, 0, 255)";
                SLIDER_BTN_NEXT.onclick = next;
            }, transitionTime);
        }

        function previous() {
            SLIDER_BTN_PREV.onclick = null;
            SLIDER_BTN_PREV.style.opacity = 0;
            SLIDER_BTN_NEXT.style.opacity = 0;
            allBullets[counter].style.boxShadow = "";
            counter--;
            PREVIOUS_SLIDE.style.transition = `all ${transitionTime}ms linear`;

            if(counter < 0) {
                counter = imgArray.length - 1;
                NEXT_SLIDE.src = imgArray[0];
            }

            PREVIOUS_SLIDE.style.left = "3em";
            PREVIOUS_SLIDE.style.left = "-31.1em";
            setTimeout(() => {
                PREVIOUS_SLIDE.style.transition = "none"
                PREVIOUS_SLIDE.style.left = "3em";
                CURRENT_SLIDE.src = imgArray[counter];
                SLIDER_BTN_PREV.style.opacity = 1;
                SLIDER_BTN_NEXT.style.opacity = 1;

                if(imgArray[counter - 1]) {
                    PREVIOUS_SLIDE.src = imgArray[counter - 1];
                    if(imgArray[counter + 1]) NEXT_SLIDE.src = imgArray[counter +
                        1];
                    else NEXT_SLIDE.src = imgArray[0];
                } else {
                    PREVIOUS_SLIDE.src = imgArray[imgArray.length - 1];
                    NEXT_SLIDE.src = imgArray[counter + 1];
                }

                allBullets[counter].style.boxShadow = "0 0 10px 1px rgb(111, 0, 255)";
                SLIDER_BTN_PREV.onclick = previous;
            }, transitionTime);
        }
    }
}
};