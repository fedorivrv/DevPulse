import { getArtists, getArtist, getArtistAlbums,getAlbumTracks } from './sound-wave-api.js';
import { noDataIzT, errorApiIzT } from './izitoast-functions.js';

const listArtists = document.querySelector('.list-artists');
const backdrop = document.getElementById('artist-modal-backdrop');
const modal = document.getElementById('artist-modal');
const closeBtn = document.getElementById('artist-close-btn');
const loader = document.getElementById('artist-loader');
const content = document.getElementById('artist-content');


let escListener = null;
let outsideClickListener = null;


// --- Підвантаження списку артистів ---
async function renderArtists() {
  try {
    const artists = await getArtists({ page: 1 }) || [];

    if (!artists.length) {
      noDataIzT('artists');
      return;
    }

    listArtists.innerHTML = artists.map(artist => `
      <li data-id="${artist._id}">${artist.strArtist}</li>
    `).join('');

  } catch (err) {
    console.error('Error fetching artists:', err);
    noDataIzT('artists');
  }
}
renderArtists();

// --- Відкриття модалки по кліку на артиста ---
listArtists.addEventListener('click', e => {
  const li = e.target.closest('li');
  if (!li) return;

  const artistId = li.dataset.id;
  if (!artistId) return console.error('Artist ID is missing!');

  openArtistModal(artistId);
});

// --- Відкрити модалку артиста ---
export async function openArtistModal(artistId) {
  if (!artistId) {
    console.error('Artist ID is missing!');
    return;
  }

  if (!backdrop.classList.contains('hidden')) return;

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

    let albums = await getArtistAlbums(artistId) || [];

    // Підвантажуємо треки для кожного альбому
    albums = await Promise.all(
      albums.map(async album => {
        const tracks = await getAlbumTracks(album._id);
        return { ...album, tracks };
      })
    );

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

// --- Закрити модалку ---
export function closeArtistModal() {
  backdrop.classList.add('hidden');
  document.body.style.overflow = '';
  removeEventListeners();
}

// --- Слухачі ---
function addEventListeners() {
  if (!escListener) {
    escListener = (e) => { if (e.key === 'Escape') closeArtistModal(); };
    document.addEventListener('keydown', escListener);
  }

  if (!outsideClickListener) {
    outsideClickListener = (e) => { if (e.target === backdrop) closeArtistModal(); };
    backdrop.addEventListener('click', outsideClickListener);
  }
}

function removeEventListeners() {
  if (escListener) { document.removeEventListener('keydown', escListener); escListener = null; }
  if (outsideClickListener) { backdrop.removeEventListener('click', outsideClickListener); outsideClickListener = null; }
}

// --- Кнопка закриття ---
closeBtn.addEventListener('click', closeArtistModal);

// --- Рендер артиста ---





function msToMinSec(ms) {
  if (!ms) return '-';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function renderArtist(artist, albums) {
  const yearsActive = artist.intFormedYear
    ? artist.intDiedYear && artist.intDiedYear !== "null"
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
      ${artist.strLabel ? `<p><b>Label:</b> ${artist.strLabel}</p>` : ''}
      ${artist.strBiographyEN ? `<p><b>Biography:</b> ${artist.strBiographyEN}</p>` : ''}
      ${(artist.genres && artist.genres.length) ? `<p><b>Genres:</b> ${artist.genres.join(', ')}</p>` : ''}
    </div>

    <div class="albums">
      <h3>Albums</h3>
      ${albums.length ? albums.map(album => `
        <div class="album">
          <div class="album-title">${album.strAlbum || '—'} (${album.intYearReleased || '—'})</div>
          ${album.tracks && album.tracks.length ? `
            <table>
              <thead>
                <tr><th>Track</th><th>Time</th><th>Link</th></tr>
              </thead>
              <tbody>
                ${album.tracks.map(track => `
                  <tr>
                    <td>${track.strTrack || '—'}</td>
                    <td>${msToMinSec(track.intDuration)}</td>
                    <td>${track.movie && track.movie !== 'null' ? `<a href="${track.movie}" target="_blank">▶</a>` : '-'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          ` : '<p>No tracks available</p>'}
        </div>
      `).join('') : '<p>No albums available.</p>'}
    </div>
  `;
}