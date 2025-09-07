const headerElem = document.querySelector('.header-container');

export function scroll(id) {
  const elem = document.querySelector(id);
  let rectElem = elem.getBoundingClientRect();
  let rectheader = headerElem.getBoundingClientRect();
  let res = rectElem.bottom - rectElem.height - rectheader.height;
  window.scrollBy({
    top: res,
    behavior: 'smooth',
  });
}