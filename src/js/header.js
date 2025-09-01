const burgerBtnElem = document.querySelector('.burger-btn');
const burgerMenuElem = document.querySelector('.burger-menu');
const navListElem = document.querySelector('.nav-list');
const headerElem = document.querySelector('.header-container');

burgerBtnElem.addEventListener('click', () => {
  burgerBtnElem.classList.toggle('is-open');
  burgerMenuElem.classList.toggle('is-open');
  
  document.body.classList.toggle('no-scroll'); 
});
let res = 0;
burgerMenuElem.addEventListener('click', e => {
  if (e.target.nodeName !== 'A') {
    return;
  }
  e.preventDefault();
  burgerBtnElem.classList.toggle('is-open');
  burgerMenuElem.classList.toggle('is-open');
  
  document.body.classList.toggle('no-scroll'); 
  const id = e.target.getAttribute('href');
  scroll(id);
  res = 0;
});

navListElem.addEventListener('click', e => {
  if (e.target.nodeName !== 'A') {
    return;
  }
  e.preventDefault();
    const id = e.target.getAttribute('href');
    scroll(id);
    res = 0;
});

function scroll(id) {
  const elem = document.querySelector(id);
  let rectElem = elem.getBoundingClientRect();
  let rectheader = headerElem.getBoundingClientRect();
  let res = rectElem.bottom - rectElem.height - rectheader.height;
  window.scrollBy({
    top: res,
    behavior: 'smooth',
  });
}