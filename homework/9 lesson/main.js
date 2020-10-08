"use strict";

let currentIndex = 0;
const imgDatabase = [
  "img_1",
  "img_2",
  "img_3",
  "img_4",
  "img_5",
  "img_6",
  "img_7",
  "img_8",
  "img_9",
  "img_10",
  "img_11",
  "img_12",
  "img_13",
  "img_14",
  "img_15",
  "img_16",
  "img_17",
  "img_18",
  "img_19",
  "img_20",
  "img_21",
  "img_22",
];

const miniImgDatabase = [
  "img_1",
  "img_2",
  "img_3",
  "img_4",
  "img_5",
  "img_6",
  "img_7",
  "img_8",
  "img_9",
  "img_10",
  "img_11",
  "img_12",
  "img_13",
  "img_14",
  "img_15",
  "img_16",
  "img_17",
  "img_18",
  "img_19",
  "img_20",
  "img_21",
  "img_22",
];

const btnPrevious = document.querySelector("#prev");
const btnNext = document.querySelector("#next");
const mainImg = document.querySelector("#img-main");
const smallImgsArea = document.querySelector("#img-collection");

function setImgSRC() {
  let opacity = 0;
  setInterval(() => {
    if (opacity < 1) {
      opacity += 0.1;
      mainImg.style.opacity = opacity;
    }
  }, 15);
  mainImg.src = `img/${imgDatabase[currentIndex]}.jpg`;
}

function nextImg() {
  if (currentIndex < imgDatabase.length - 1) ++currentIndex;
  else currentIndex = 0;
  setImgSRC();
}

function prevImg() {
  if (currentIndex !== 0) --currentIndex;
  else if (currentIndex === imgDatabase.length - 1) --currentIndex;
  else if (currentIndex == 0) currentIndex = imgDatabase.length - 1;
  setImgSRC();
}

function openImgFullScreen() {
  const modalWindow = document.createElement("div");
  const largeImg = document.createElement("img");
  const closeIco = document.createElement("p");

  modalWindow.className = "modal";
  document.body.append(modalWindow);
  largeImg.className = "img-large";
  largeImg.src = mainImg.src;
  document.body.append(largeImg);
  closeIco.className = "btn-close";
  closeIco.textContent = "X";
  modalWindow.append(closeIco);
  modalWindow.addEventListener("click", () => {
    modalWindow.remove();
    largeImg.remove();
  });
}

function addSmallImgs(imagesArray) {
  for (let image of imagesArray) {
    const img = document.createElement("img");
    img.className = "img-small";
    img.src = `img/img_small/${image}.jpg`;
    smallImgsArea.append(img);
  }
}

function replaceMainImg(event) {
  const targetHtml = event.target.outerHTML;
  const targetIndex = targetHtml.slice(46, targetHtml.length - 6) - 1;
  mainImg.src = `img/${imgDatabase[targetIndex]}.jpg`;
  currentIndex = targetIndex;
}

btnNext.onclick = nextImg;
btnPrevious.onclick = prevImg;
mainImg.onclick = openImgFullScreen;
addSmallImgs(miniImgDatabase);

smallImgsArea.addEventListener("click", (event) => {
  if (event.target.classList.contains("img-small")) replaceMainImg(event);
});
