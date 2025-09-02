import { openArtistModal } from './js/artist-modal-functionality.js';
import {
  checkVisibleLoadBtn,
  createArtists,
  hideLoadMoreButton,
  updateArtists,
} from './js/render-functions.js';
import { getArtists } from './js/sound-wave-api.js';
import { errorApiIzT } from './js/izitoast-functions.js';
import { showLoader, hideLoader } from './js/loader.js';
import { scroll } from './js/header.js';
import { initFeedbacks } from './js/feedback.js'; // тепер викликаємо функцію, а не модуль одразу
import { openFedbackModal } from './js/feedback-modal';

const btnLdMrEl = document.querySelector('.load-more');
const listArtistsEl = document.querySelector('.list-artists');
let page = 1;

// === Завантаження артистів при старті ===
document.addEventListener('DOMContentLoaded', async () => {
  showLoader();
  try {
    hideLoadMoreButton();
    const artists = await getArtists({});
    if (artists?.length > 0) {
      createArtists(artists);
    }
  } catch (error) {
    errorApiIzT(error);
  } finally {
    hideLoader();
    checkVisibleLoadBtn(page);
  }

  // === Ініціалізація відгуків після завантаження артистів ===
  initFeedbacks();
});

// === Кнопка "Load More" ===
btnLdMrEl.addEventListener('click', async () => {
  page += 1;
  showLoader();
  try {
    hideLoadMoreButton();
    const artists = await getArtists({ page });
    if (artists?.length > 0) {
      updateArtists(artists);
    }
  } catch (error) {
    errorApiIzT(error);
  } finally {
    hideLoader();
    checkVisibleLoadBtn(page);
  }
});

// === Відкриття модалки артиста ===
listArtistsEl.addEventListener('click', e => {
  const btn = e.target.closest('.learn-more-artist');
  if (!btn) return;
  const artistId = btn.dataset.id;
  if (!artistId) return;
  openArtistModal(artistId);
});

// === Бургер-меню ===
const burgerBtnElem = document.querySelector('.burger-btn');
const burgerMenuElem = document.querySelector('.burger-menu');
const navListElem = document.querySelector('.nav-list');

burgerBtnElem.addEventListener('click', () => {
  burgerBtnElem.classList.toggle('is-open');
  burgerMenuElem.classList.toggle('is-open');
  document.body.classList.toggle('no-scroll');
});

burgerMenuElem.addEventListener('click', e => {
  if (e.target.nodeName !== 'A') return;
  e.preventDefault();
  burgerBtnElem.classList.remove('is-open');
  burgerMenuElem.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  scroll(e.target.getAttribute('href'));
});

navListElem.addEventListener('click', e => {
  if (e.target.nodeName !== 'A') return;
  e.preventDefault();
  scroll(e.target.getAttribute('href'));
});


const leaveFeedbackEl = document.querySelector('.leave-feedback');
leaveFeedbackEl.addEventListener("click", () => {
  openFedbackModal();
})