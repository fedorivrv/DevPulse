import { openArtistModal } from './js/artist-modal-functionality';
import { checkVisibleLoadBtn, createArtists, updateArtists } from './js/render-functions';
import { getArtists } from './js/sound-wave-api';
import { errorApiIzT } from './js/izitoast-functions';
import { showLoader, hideLoader } from './js/loader';

const btnLdMrEl = document.querySelector('.load-more');
let page = 1;

document.addEventListener('DOMContentLoaded', async () => {
  showLoader(); // Включаємо лоадер перед запитом
  try {
    const artists = await getArtists({});
    if (artists.length > 0) {
      createArtists(artists);
    }
  } catch (error) {
    errorApiIzT(error);
  } finally {
    hideLoader(); // Вимикаємо лоадер після завершення
  }
});

btnLdMrEl.addEventListener('click', async () => {
  page += 1;
  showLoader(); // Включаємо лоадер при натисканні
  try {
    const artists = await getArtists({ page });
    if (artists.length > 0) {
      updateArtists(artists);
    }
  } catch (error) {
    errorApiIzT(error);
  } finally {
    hideLoader(); // Вимикаємо лоадер
    checkVisibleLoadBtn(page); // Оновлюємо видимість кнопки
  }
});

const listArtistsEl = document.querySelector('.list-artists');

listArtistsEl.addEventListener('click', (e) => {
  const btn = e.target.closest('.learn-more-artist');
  if (!btn) return;

  const artistId = btn.getAttribute('data-id');
  if (!artistId) return;

  openArtistModal(artistId);
});