// === Імпорт залежностей ===
import { getRandomPageFeedbacks } from './sound-wave-api.js';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import 'css-star-rating/css/star-rating.css';
const data = await getRandomPageFeedbacks();

// === Завантаження відгуків через sound-wave-api.js ===
getRandomPageFeedbacks()
  .then(reviews => {
    if (Array.isArray(reviews) && reviews.length) {
      loadReviews(
        reviews.map(r => ({
          name: r.author || r.name || 'Anonymous',
          text: r.descr || r.text || r.feedback || '',
          rating: r.rating || 5,
        }))
      );
    }
  })
  .catch(() => {});

// === Генерація слайдів з відгуками ===
function loadReviews(reviews) {
  const container = document.getElementById('reviews-container');

  reviews.forEach(r => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    slide.innerHTML = `
    <div class="rating ${getRatingClass(r.rating)}">
    <div class="star-container">
      <div class="star">
        <svg class="star-empty">
          <use xlink:href="../img/star-empty.svg"></use>
        </svg>
        
        <svg class="star-filled">
          <use xlink:href="../img/star-filled.svg"></use>
        </svg>
      </div>
      <div class="star">
        <svg class="star-empty">
          <use xlink:href="../img/star-empty.svg"></use>
        </svg>
        
        <svg class="star-filled">
          <use xlink:href="../img/star-filled.svg"></use>
        </svg>
      </div>
      <div class="star">
        <svg class="star-empty">
          <use xlink:href="../img/star-empty.svg"></use>
        </svg>
        
        <svg class="star-filled">
          <use xlink:href="../img/star-filled.svg"></use>
        </svg>
      </div>
      <div class="star">
        <svg class="star-empty">
          <use xlink:href="../img/star-empty.svg"></use>
        </svg>
        
        <svg class="star-filled">
          <use xlink:href="../img/star-filled.svg"></use>
        </svg>
      </div>
      <div class="star">
        <svg class="star-empty">
          <use
            xlink:href="../img/star-empty.svg"
          ></use>
        </svg>
        
        <svg class="star-filled">
          <use
            xlink:href="../img/star-filled.svg"
          ></use>
        </svg>
      </div>
    </div>
  </div>
          <div class="review-card">


            <p class="feedback-text">${r.text}</p>
            <h3 class="feedback-author">${r.name}</h3>
          </div>
        `;
    container.appendChild(slide);
  });

  // === Ініціалізація слайдера Swiper ===
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
      renderCustom: function (swiper, current, total) {
        let dots = '';
        const slides = swiper.slides.length;
        let activeDot = 2;
        if (swiper.realIndex === 0) activeDot = 1;
        else if (swiper.realIndex === slides - 1) activeDot = 3;
        for (let i = 1; i <= 3; i++) {
          dots += `<span class="swiper-pagination-bullet${i === activeDot ? ' swiper-pagination-bullet-active' : ''}" data-index="${i}"></span>`;
        }
        return dots;
      },
    },

    spaceBetween: 5,
  });

  // === Обробка кліків по кастомній пагінації ===
  const pag = document.querySelector('.swiper-pagination');
  pag.addEventListener('click', function (e) {
    if (e.target.classList.contains('swiper-pagination-bullet')) {
      const index = Number(e.target.getAttribute('data-index'));
      const slides = swiper.slides.length - (swiper.loop ? 2 : 0);
      let slideTo = 0;
      if (index === 1) {
        slideTo = 0;
      } else if (index === 3) {
        slideTo = slides - 1;
      } else {
        slideTo = Math.floor((slides - 1) / 2);
      }
      swiper.slideToLoop(slideTo);
    }
  });
}

// === Функція для отримання CSS-класу рейтингу  ===
function getRatingClass(rating) {
  const intPart = Math.floor(rating);
  return `value-${intPart}`;
}
