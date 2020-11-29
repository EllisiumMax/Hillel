"use strict";
const imgArray = [
    "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
    "https://cdn-7.nikon-cdn.com/Images/Learn-Explore/Photography-Techniques/2019/CA-Chris-Ogonek-Picture-Controls/Media/Chris-Ogonek-Picture-Controls-Vivid.jpg",
    "https://media.inquirer.com/storage/inquirer/projects/year-in-pictures-2019/photos/POY2019_RedC.JPG",
    "https://imagevars.gulfnews.com/2020/03/16/Reader-picture_170e36e3df6_original-ratio.jpg",
    "https://blog.photofeeler.com/wp-content/uploads/2017/09/tinder-photo-size-tinder-picture-size-tinder-aspect-ratio-image-dimensions-crop.jpg",
    "https://www.popsci.com/resizer/1yuf4TkV6KomEsx8zBedjTNxBo0=/760x504/filters:focal(2565x1702:2566x1703)/arc-anglerfish-arc2-prod-bonnier.s3.amazonaws.com/public/Y47SYZUU5NHQF5K3ES6EVQHL2I.jpg"

];

function slider(imgLinksArray) {
    const SLIDER_ELEMENTS = document.querySelectorAll(`[class$="-slider"]`);

    SLIDER_ELEMENTS.forEach(element => {
        const SLIDER_FLEX_CONTAINER = document.createElement("div");
        const SLIDER_BTN_PREV = document.createElement("button");
        const SLIDER_BTN_NEXT = document.createElement("button");
        const SLIDER_VIEW_AREA = document.createElement("img");
        const SLIDER_BULLETS_AREA = document.createElement("div");
        
        SLIDER_FLEX_CONTAINER.className = "slider-flex-container";
        SLIDER_BTN_NEXT.className = "slider-btn";
        SLIDER_BTN_PREV.className = "slider-btn";
        SLIDER_BULLETS_AREA.className = "slider-bullets-area";

        SLIDER_BTN_PREV.textContent ="<<<";
        SLIDER_BTN_NEXT.textContent =">>>";
        SLIDER_VIEW_AREA.src = imgLinksArray[1];

        element.append(SLIDER_FLEX_CONTAINER, SLIDER_BULLETS_AREA);
        SLIDER_FLEX_CONTAINER.append(SLIDER_BTN_PREV, SLIDER_VIEW_AREA, SLIDER_BTN_NEXT);
        for(let i = 0; i < imgLinksArray.length; i++) {
            const SLIDER_BULLET = document.createElement("img");
            SLIDER_BULLET.className = "slider-bullet";
            SLIDER_BULLET.src = imgLinksArray[i];
            SLIDER_BULLETS_AREA.append(SLIDER_BULLET);
            SLIDER_BULLET.addEventListener("click", () => SLIDER_VIEW_AREA.src = imgLinksArray[i]);
        }
    });
}


slider(imgArray);
