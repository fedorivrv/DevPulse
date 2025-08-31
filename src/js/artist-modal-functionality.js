import { getArtist, getArtistAlbums } from './sound-wave-api.js';
import { noDataIzT, errorApiIzT } from './izitoast-functions.js';

const backdrop = document.getElementById('artist-modal-backdrop');
const modal = document.getElementById('artist-modal');
const closeBtn = document.getElementById('artist-close-btn');
const loader = document.getElementById('artist-loader');
const content = document.getElementById('artist-content');

let escListener = null;
let outsideClickListener = null;

/**
 * Відкрити модальне вікно артиста
 */
export async function openArtistModal(artistId) {
  if (!backdrop.classList.contains('hidden')) return; // не відкривати, якщо вже відкрито

  backdrop.classList.remove('hidden');
  loader.classList.remove('hidden');
  content.classList.add('hidden');
  document.body.style.overflow = 'hidden';

  try {
    const artist = await getArtist(artistId);
    if (!artist) {
      noDataIzT('artist');
      closeArtistModal();
      return;
    }

    const albums = await getArtistAlbums(artistId) || [];
    renderArtist(artist, albums);

  } catch (err) {
    console.error(err);
    content.innerHTML = `<p>Error loading artist.</p>`;
    errorApiIzT(err);
  } finally {
    loader.classList.add('hidden');
    content.classList.remove('hidden');
  }

  addEventListeners();
}

/**
 * Закрити модальне вікно артиста
 */
export function closeArtistModal() {
  backdrop.classList.add('hidden');
  document.body.style.overflow = '';

  removeEventListeners();
}

/**
 * Додати слухачі подій
 */
function addEventListeners() {
  if (!escListener) {
    escListener = (e) => {
      if (e.key === 'Escape') closeArtistModal();
    };
    document.addEventListener('keydown', escListener);
  }

  if (!outsideClickListener) {
    outsideClickListener = (e) => {
      if (e.target === backdrop) closeArtistModal();
    };
    backdrop.addEventListener('click', outsideClickListener);
  }
}

/**
 * Видалити слухачі подій
 */
function removeEventListeners() {
  if (escListener) {
    document.removeEventListener('keydown', escListener);
    escListener = null;
  }
  if (outsideClickListener) {
    backdrop.removeEventListener('click', outsideClickListener);
    outsideClickListener = null;
  }
}

// Закриття модалки по кнопці
closeBtn.addEventListener('click', closeArtistModal);

/**
 * Рендер даних артиста
 */
function renderArtist(artist, albums) {
  const yearsActive = artist.startYear
    ? artist.endYear
      ? `${artist.startYear} - ${artist.endYear}`
      : `${artist.startYear} - present`
    : 'information missing';

  content.innerHTML = `
    <div class="artist-header">
      <h2>${artist.name}</h2>
      <img src="${artist.image || ''}" alt="${artist.name}">
      <p><b>Years active:</b> ${yearsActive}</p>
      ${artist.sex ? `<p><b>Sex:</b> ${artist.sex}</p>` : ''}
      ${artist.members ? `<p><b>Members:</b> ${artist.members}</p>` : ''}
      ${artist.country ? `<p><b>Country:</b> ${artist.country}</p>` : ''}
      <p><b>Biography:</b> ${artist.biography || '—'}</p>
      <p><b>Genres:</b> ${(artist.genres || []).join(', ')}</p>
    </div>
    <div class="albums">
      <h3>Albums</h3>
      ${albums.map(album => `
        <div class="album">
          <div class="album-title">${album.name} (${album.year || '—'})</div>
          <table>
            <thead>
              <tr><th>Title</th><th>Duration</th><th>Link</th></tr>
            </thead>
            <tbody>
              ${(album.tracks || []).map(track => `
                <tr>
                  <td>${track.name}</td>
                  <td>${track.duration || '-'}</td>
                  <td>
                    ${track.youtube ? `<a href="${track.youtube}" target="_blank" class="yt-link">▶</a>` : ''}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `).join('')}
    </div>
  `;
}