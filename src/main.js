import { openArtistModal } from './js/artist-modal-functionality';
import {
  checkVisibleLoadBtn,
  createArtists,
  updateArtists,
} from './js/render-functions';
import { getArtists } from './js/sound-wave-api';
import { errorApiIzT } from './js/izitoast-functions';
const btnLdMrEl = document.querySelector('.load-more');
let page = 1;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // функція включення лоудера
    const artists = await getArtists({});
    if (artists.length > 0) {
      createArtists(artists);
    }
  } catch (error) {
    errorApiIzT(error);
  } finally {
    //функція виключення лоудера
  }
});

btnLdMrEl.addEventListener('click', async e => {
  page += 1;
  try {
    // функція включення лоудера
    const artists = await getArtists({ page });
    if (artists.length > 0) {
      updateArtists(artists);
    }
  } catch (error) {
    errorApiIzT(error);
  } finally {
    //функція виключення лоудера
    checkVisibleLoadBtn(page);
  }
});
const listArtistsEl = document.querySelector('.list-artists');

listArtistsEl.addEventListener('click', e => {
  const btn = e.target.closest('.learn-more-artist');
  if (!btn) return;

  const artistId = btn.getAttribute('data-id');
  if (!artistId) return;

  openArtistModal(artistId);
});

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