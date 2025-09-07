import { getArtists, getArtist } from './sound-wave-api.js';
import { noDataIzT, errorApiIzT } from './izitoast-functions.js';
import { showLoader, hideLoader } from './loader.js';

const listArtists = document.querySelector('.list-artists');
const backdrop = document.getElementById('artist-modal-backdrop');
const modal = document.getElementById('artist-modal');
const closeBtn = document.getElementById('artist-close-btn');
const content = document.getElementById('artist-content');

let escListener = null;
let outsideClickListener = null;

// --- Відкриття модалки по кліку на кнопку ---
listArtists.addEventListener('click', e => {
  const btn = e.target.closest('.learn-more-artist');
  if (!btn) return;

  const artistId = btn.dataset.id;
  if (!artistId) return console.error('Artist ID is missing!');

  openArtistModal(artistId);
});

// --- Відкрити модалку артиста ---
export async function openArtistModal(artistId) {
  if (!artistId) return console.error('Artist ID is missing!');
  if (!backdrop.classList.contains('hidden')) return;

  backdrop.classList.remove('hidden');
  showLoader();
  content.classList.add('hidden');
  document.body.style.overflow = 'hidden';

  try {
    const artist = await getArtist(artistId);
    if (!artist) {
      noDataIzT('artist');
      closeArtistModal();
      return;
    }

    const tracks = artist.tracksList || [];

    // --- Групуємо треки за альбомами ---
    const albumsMap = {};
    tracks.forEach(track => {
      const albumName = track.strAlbum || 'Unknown Album';
      if (!albumsMap[albumName]) albumsMap[albumName] = [];
      albumsMap[albumName].push(track);
    });

    const albums = Object.entries(albumsMap).map(([albumName, tracks]) => ({
      strAlbum: albumName,
      tracks,
    }));

    renderArtist(artist, albums);
  } catch (err) {
    console.error(err);
    content.innerHTML = `<p>Error loading artist.</p>`;
    errorApiIzT(err);
  } finally {
    hideLoader();
    content.classList.remove('hidden');

    // --- Скидаємо скрол ---
    resetModalScroll();
  }

  addEventListeners();
}

// --- Хелпер для скидання скролу ---
function resetModalScroll() {
  if (content) content.scrollTop = 0;
  if (modal) modal.scrollTop = 0;
  if (backdrop) backdrop.scrollTop = 0;

  // гарантія після відмалювання DOM
  requestAnimationFrame(() => {
    if (content) {
      const prev = content.style.scrollBehavior;
      content.style.scrollBehavior = 'auto';
      content.scrollTo(0, 0);
      content.style.scrollBehavior = prev;
    }
    if (modal) modal.scrollTo(0, 0);
    if (backdrop) backdrop.scrollTo(0, 0);
  });
}


// --- Закрити модалку ---
export function closeArtistModal() {
  backdrop.classList.add('hidden');
  document.body.style.overflow = '';
  removeEventListeners();
}

// --- Слухачі ---
function addEventListeners() {
  if (!escListener) {
    escListener = e => {
      if (e.key === 'Escape') closeArtistModal();
    };
    document.addEventListener('keydown', escListener);
  }

  if (!outsideClickListener) {
    outsideClickListener = e => {
      if (e.target === backdrop) closeArtistModal();
    };
    backdrop.addEventListener('click', outsideClickListener);
  }
}

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

// --- Рендер артиста та альбомів ---
function renderArtist(artist, albums) {
  const yearsActive = artist.intFormedYear
    ? artist.intDiedYear && artist.intDiedYear !== 'null'
      ? `${artist.intFormedYear} - ${artist.intDiedYear}`
      : `${artist.intFormedYear} - present`
    : 'information missing';

  content.innerHTML = `
    <div class="artist-header">
      <h2>${artist.strArtist}</h2>
      <img src="${artist.strArtistThumb || ''}" alt="${artist.strArtist}">
      ${yearsActive ? `<p><b>Years active:</b> ${yearsActive}</p>` : ''}
      ${artist.strGender ? `<p><b>Sex:</b> ${artist.strGender}</p>` : ''}
      ${artist.intMembers ? `<p><b>Members:</b> ${artist.intMembers}</p>` : ''}
      ${artist.strCountry ? `<p><b>Country:</b> ${artist.strCountry}</p>` : ''}
      ${artist.strLabel && artist.strLabel !== 'null' && artist.strLabel.trim()
  ? `<p><b>Label:</b> ${artist.strLabel.trim()}</p>`
  : ''}

      ${artist.strBiographyEN ? `<p><b>Biography:</b> ${artist.strBiographyEN}</p>` : ''}
      ${artist.genres && artist.genres.length ? `<p><b>Genres:</b> ${artist.genres.join(', ')}</p>` : ''}
    </div>

    <div class="albums">
      <h3>Albums</h3>
      <div class="albums-grid">
      ${
        albums.length
          ? albums
              .map(
                album => `
                
        <div class="album">
          <div class="album-title">${album.strAlbum || ''}</div>
          ${
            album.tracks && album.tracks.length
              ? `
            <div class="tracks">
              <div class="track track-header">
                <span>Track</span>
                <span>Time</span>
                <span>Link</span>
              </div>
              ${album.tracks
  .map(track => {
    const hasLink = track.movie && /^https?:\/\//i.test(track.movie);
    return `
      <div class="track">
        <span class="track-title">${track.strTrack || '—'}</span>
        <span class="track-time">${msToMinSec(track.intDuration)}</span>
        ${
          hasLink
            ? `<a href="${track.movie}" target="_blank" rel="noopener noreferrer"
                  class="yt-link" aria-label="Open video">▶</a>`
            : `<span class="link-spacer" aria-hidden="true"></span>`
        }
      </div>
    `;
  })
  .join('')}

            </div>
          `
              : '<p>No tracks available</p>'
          }
        </div>
      `
              )
              .join('')
          : '<p>No albums available.</p>'
      }
          </div>
    </div>
  `;
}

// --- Хелпер для конвертації мілісекунд у хв:сек ---
function msToMinSec(ms) {
  if (!ms) return '-';
  const totalSec = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// --- Кнопка закриття ---
closeBtn.addEventListener('click', closeArtistModal);
