import { getRandomPageFeedbacks } from './sound-wave-api.js';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

// === Ініціалізація відгуків ===
export async function initFeedbacks() {
  try {
    const reviews = await getRandomPageFeedbacks();

    if (!Array.isArray(reviews) || reviews.length === 0) {
      console.warn('No feedbacks available.');
      const container = document.getElementById('reviews-container');
      if (container)
        container.innerHTML =
          '<p class="feedback-no-data">No feedbacks available.</p>';
      return;
    }

    const formattedReviews = reviews.map(r => ({
      name: r.author || r.name || 'Anonymous',
      text: r.descr || r.text || r.feedback || '',
      rating: r.rating || 5,
    }));

    renderReviews(formattedReviews);
  } catch (err) {
    console.error('Error loading feedbacks', err);
  }
}

// === Рендер відгуків та Swiper ===
function renderReviews(reviews) {
  const container = document.getElementById('reviews-container');
  if (!container) return;

  container.innerHTML = ''; // очищаємо контейнер

  const fragment = document.createDocumentFragment();

  reviews.forEach(r => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide review-card';
    slide.innerHTML = `
      <div class="rating ${getRatingClass(r.rating)}">
        ${generateStars(r.rating)}
      </div>
      <p class="feedback-text">${r.text}</p>
      <h3 class="feedback-author">${r.name}</h3>
    `;
    fragment.appendChild(slide);
  });

  container.appendChild(fragment);

  // === Ініціалізація Swiper ===
  const swiper = new Swiper('.swiper', {
    loop: false,
    slidesPerView: 1,
    autoHeight: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'custom',
      renderCustom: (swiper, current, total) => {
        const slides = swiper.slides.length;
        let activeDot = 2;
        if (swiper.realIndex === 0) activeDot = 1;
        else if (swiper.realIndex === slides - 1) activeDot = 3;

        return [1, 2, 3]
          .map(
            i =>
              `<span class="swiper-pagination-bullet${i === activeDot ? ' swiper-pagination-bullet-active' : ''}" data-index="${i}"></span>`
          )
          .join('');
      },
    },
    spaceBetween: 5,
  });

  // === Кастомна пагінація кліками ===
  const pag = document.querySelector('.swiper-pagination');
  pag?.addEventListener('click', e => {
    if (!e.target.classList.contains('swiper-pagination-bullet')) return;
    const index = Number(e.target.dataset.index);
    const slides = swiper.slides.length - (swiper.loop ? 2 : 0);
    let slideTo =
      index === 1 ? 0 : index === 3 ? slides - 1 : Math.floor((slides - 1) / 2);
    swiper.slideToLoop(slideTo);
  });
}

// === Генерація зірок ===
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const totalStars = 5;
  let html = '';
  for (let i = 1; i <= totalStars; i++) {
    html += `<div class="star">
      <svg class="${i <= fullStars ? 'star-filled' : 'star-empty'}" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
        <path fill="${i <= fullStars ? '#764191' : '#fff'}" d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 
        1.402 8.173L12 18.897l-7.336 3.86 
        1.402-8.173L.132 9.21l8.2-1.192z"></path>
      </svg>
    </div>`;
  }
  return `<div class="star-container">${html}</div>`;
}

// === CSS-клас рейтингу ===
function getRatingClass(rating) {
  const intPart = Math.floor(rating);
  return `value-${intPart}`;
}
