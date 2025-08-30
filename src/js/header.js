const burgerBtnElem = document.querySelector('.burger-btn');
const burgerMenuElem = document.querySelector('.burger-menu');

burgerBtnElem.addEventListener("click", () => {
  burgerBtnElem.classList.toggle("is-open");
  burgerMenuElem.classList.toggle('is-open');
})

burgerMenuElem.addEventListener("click", e => {
  if (e.target.nodeName!=="A") {
    return;
  }
  burgerBtnElem.classList.toggle('is-open');
  burgerMenuElem.classList.toggle('is-open');
})