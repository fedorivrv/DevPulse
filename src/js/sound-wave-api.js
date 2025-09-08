
import axios from 'axios';
import {
  errorApiIzT,
  noDataIzT,
  successDataIzT,
} from './izitoast-functions.js';
axios.defaults.baseURL = 'https://sound-wave.b.goit.study/api/';
let DATA_PASS;
export let MAX_PAGE_ARTIST = 1;

export async function getGenres() {
  try {
    DATA_PASS = 'genres';
    const res = await axios.get(DATA_PASS, {});

    const genres = res.data;
    if (genres && Array.isArray(genres) && genres.length > 0) {
      return genres;
    } else {
      return noDataIzT('genres');
    }
  } catch (error) {
    errorApiIzT(error);
  }
}

export async function getArtists({ name, page, sortName, genre } = {}) {
  DATA_PASS = 'artists';
  const params = {
    limit: 8,
    page: page,
    name,
    sortName,
    genre,
  };
  try {
    const res = await axios.get(DATA_PASS, { params });

    const artists = res.data.artists;
    MAX_PAGE_ARTIST = Math.ceil(res.data.totalArtists / params.limit);
    if (artists && Array.isArray(artists) && artists.length > 0) {
      return artists;
    } else {
      return noDataIzT('artists');
    }
  } catch (error) {
    errorApiIzT(error);
  }
}

export async function getArtistAlbums(id) {
  try {
    const res = await axios.get(`artists/${id}/albums`);
    console.log('RAW albums response:', res.data);
    return res.data.albumsList || [];
  } catch (error) {
    errorApiIzT(error);
  }
}

export async function getArtist(id) {
  try {
    DATA_PASS = `artists/${id}`;
    const res = await axios.get(DATA_PASS, {});

    const artist = res.data;
    if (artist) {
      return artist;
    } else {
      return noDataIzT('artist');
    }
  } catch (error) {
    errorApiIzT(error);
  }
  
}

export async function getAlbumTracks(albumId) {
  try {
    const res = await axios.get(`albums/${albumId}/tracks`);
    console.log('RAW tracks response:', res.data);
    return res.data.tracks || [];
  } catch (error) {
    errorApiIzT(error);
    return [];
  }
}


export async function getRandomPageFeedbacks() {
  try {
    DATA_PASS = 'feedbacks';
    const fullFeedbacks = await axios.get(DATA_PASS, {});
    const MAX_PAGE_FEEDBACKS = Math.ceil(fullFeedbacks.data.data.length / 10);
    const page = getRandomInt(MAX_PAGE_FEEDBACKS);
    const params = {
      limit: 10,
      page: page,
    };
    const res = await axios.get(DATA_PASS, { params });

    const feedbacks = res.data.data;
    if (feedbacks && Array.isArray(feedbacks) && feedbacks.length > 0) {
      return feedbacks;
    } else {
      return noDataIzT('feedbacks');
    }
  } catch (error) {
    errorApiIzT(error);
  }
}

export async function postFeedback(nameArtist, ratingArtist, descArtist) {
  const newFeedback = {
    name: nameArtist,
    rating: ratingArtist,
    descr: descArtist,
  };

  DATA_PASS = 'feedbacks';

  await axios
    .post(DATA_PASS, newFeedback)
    .then(response => {
      successDataIzT(response);
    })
    .catch(error => {
      errorApiIzT(error);
    });
}

function getRandomInt(n) {
  return Math.floor(Math.random() * n) + 1;
}
