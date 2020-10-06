"use strict";
let currentIndex = 1;
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

const btnPrevious = document.querySelector("#prev");
const btnNext = document.querySelector("#next");
const mainImg = document.querySelector("#img-main");

function setImgSRC() {
  mainImg.src = `img/${imgDatabase[currentIndex]}.jpg`;
}

function nextImg() {
  if (currentIndex < imgDatabase.length - 1) ++currentIndex;
  else currentIndex = 0;
  setImgSRC();
  console.log(currentIndex);
}

function prevImg() {
  if (currentIndex !== 0) --currentIndex;
  if (currentIndex === imgDatabase.length - 1) --currentIndex;
  if (currentIndex === 0) currentIndex = imgDatabase.length - 1;
  setImgSRC();
  console.log(currentIndex);
}

function openImgFullScreen() {
  const modalWindow = document.createElement("div");
  const largeImg = document.createElement("img");

  modalWindow.className = "modal";
  document.body.append(modalWindow);
  largeImg.className = "img-large";
  largeImg.src = mainImg.src;
  document.body.append(largeImg);
  modalWindow.addEventListener("click", () => {
    modalWindow.remove();
    largeImg.remove();
  });
}

btnNext.onclick = nextImg;
btnPrevious.onclick = prevImg;
mainImg.onclick = openImgFullScreen;
