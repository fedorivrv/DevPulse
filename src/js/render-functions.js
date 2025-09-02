import { MAX_PAGE_ARTIST } from './sound-wave-api';
const btnLdMrEl = document.querySelector('.load-more');

function templateImage(artist) {
  const { _id, genres, strArtist, strBiographyEN, strArtistThumb } = artist;
  let genresMarkup;
  if (Array.isArray(genres) || genres.length !== 0) {
    genresMarkup = genres
      .map(genre => {
        return `<li class="genre-artist">${genre}</li>`;
      })
      .join('\n');
  }

  return `<li class="item-artists">
        <img class="img-artist" src="${strArtistThumb}" alt="${strArtist}" />
        <div class="info-artist">
          <ul class="genres-artist">
            ${genresMarkup}
          </ul>
          <h3 class="name-artist">${strArtist}</h3>
          <p class="desc-artist">${strBiographyEN}</p>
        </div>
       <button class="learn-more-artist" data-id="${_id}">
          Learn More
          <img class="icon-learn-more" src="img/icon-right-arrow.png" width="8" height="14" alt="icon right arrow"></img>
        </button>
      </li>
`;
}

function templatesArtist(artists) {
  return artists.map(templateImage).join('\n');
}

export function createArtists(artists) {
  const ulElem = document.querySelector('.list-artists');
  const markup = templatesArtist(artists);
  ulElem.insertAdjacentHTML('afterbegin', markup);
}

export function updateArtists(artists) {
  const ulElem = document.querySelector('.list-artists');
  const markup = templatesArtist(artists);
  ulElem.insertAdjacentHTML('beforeEnd', markup);
}

export function checkVisibleLoadBtn(page) {
  if (page === MAX_PAGE_ARTIST) {
    hideLoadMoreButton();
  } else {
    showLoadMoreButton();
  }
}

export function hideLoadMoreButton() {
  btnLdMrEl.classList.add('is-display-none');
}

function showLoadMoreButton() {
  btnLdMrEl.classList.remove('is-display-none');
}
