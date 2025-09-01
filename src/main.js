import { openArtistModal } from './js/artist-modal-functionality';
import {
  checkVisibleLoadBtn,
  createArtists,
  hideLoadMoreButton,
  updateArtists,
} from './js/render-functions';
import { getArtists } from './js/sound-wave-api';
import { errorApiIzT } from './js/izitoast-functions';
const btnLdMrEl = document.querySelector('.load-more');
let page = 1;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // функція включення лоудера
    hideLoadMoreButton();
    const artists = await getArtists({});
    if (artists.length > 0) {
      createArtists(artists);
    }
  } catch (error) {
    errorApiIzT(error);
  } finally {
    //функція виключення лоудера
    checkVisibleLoadBtn(page);
  }
});

btnLdMrEl.addEventListener('click', async e => {
  page += 1;
  try {
    // функція включення лоудера
    hideLoadMoreButton();
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
