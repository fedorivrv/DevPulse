import axios from 'axios';
import { errorApiFeedback, errorApiIzT, successFeedback } from './izitoast-functions';


const feedbackCloseBtnEl = document.querySelector('.feedback-close-btn');
const backdropFeedbackModal = document.querySelector('.backdrop-feedback-modal');
const feedbackIsOpen = document.querySelector('.feedback-is-open');
const feedbackFormEl = document.querySelector('.feedback-modal-form');
const feedBackInputEl = document.querySelector('.feedback-modal-input');
const feedBackTextarea = document.querySelector('.feedback-modal-textarea');
const feedbackRating = document.querySelector('.feedback-modal-list');
const feedbackModalRatingElems = document.querySelectorAll('.feedback-modal-rating');

const feedBack = {
  name: '',
  descr: '',
  rating: 0,
};

export function openFedbackModal() {
  document.body.classList.add('no-scroll');

  feedBackInputEl.addEventListener('input', e => {
    if (e.target.value.length < 2 || e.target.value.length > 16) {
      feedBackInputEl.classList.add('is-error');
    } else {
      feedBackInputEl.classList.remove('is-error');
    }
  });

  feedBackTextarea.addEventListener('input', e => {
    if (e.target.value.length < 10 || e.target.value.length > 512) {
      feedBackTextarea.classList.add('is-error');
    } else {
      feedBackTextarea.classList.remove('is-error');
    }
  });
  feedbackRating.addEventListener('mouseover', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    for (let index = feedBack.rating; index < btn.dataset.value; index++) {
      feedbackModalRatingElems[index].children[0].classList.add('is-click');
    }
  });
 feedbackRating.addEventListener('mouseout', e => {
   const btn = e.target.closest('button');
   if (!btn) return;
   for (
     let index = feedBack.rating;
     index < feedbackModalRatingElems.length;
     index++
   ) {
     feedbackModalRatingElems[index].children[0].classList.remove('is-click');
   }
 });
  feedbackRating.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    feedBack.rating = Number(btn.dataset.value);
    for (let index = 0; index < feedbackModalRatingElems.length; index++) {
      feedbackModalRatingElems[index].children[0].classList.remove('is-click');
    }
    for (let index = 0; index < feedBack.rating; index++) {
      feedbackModalRatingElems[index].children[0].classList.add('is-click');
    }
  });

  feedbackFormEl.addEventListener('submit',handleSubmitForm);

  feedbackCloseBtnEl.addEventListener('click', closeModal);

  backdropFeedbackModal.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  });

  window.addEventListener('keydown', closeFeddbackMoodal);
}

function closeFeddbackMoodal(e) {
  if (e.key === 'Escape') {
    closeModal();
    window.removeEventListener('keydown', closeFeddbackMoodal);
  }
}
async function handleSubmitForm(e) {
  e.preventDefault();
    feedBack.name = e.target.elements['user-name'].value.trim();
    feedBack.descr = e.target.elements['user-message'].value.trim();

    if (
      feedBack.name.length >= 2 &&
      feedBack.name.length <= 16 &&
      feedBack.descr.length >= 10 &&
      feedBack.descr.length <= 512 &&
      feedBack.rating>0
    ) {
      try {
        const response = await axios.post(
          'https://sound-wave.b.goit.study/api/feedbacks',
          feedBack
        );
        e.target.reset();
        feedBack.rating = 0;

        feedbackModalRatingElems.forEach(starBtn => {
          starBtn.children[0].classList.remove('is-click');
        });
        backdropFeedbackModal.classList.remove('feedback-is-open');
        document.body.classList.remove('no-scroll');
        successFeedback();
      } catch (err) {
        errorApiFeedback(err);
      }
    } else {
      errorApiFeedback('Please fill all fields and select a rating!');
    } }


function resetFeedbackForm() {
  feedbackFormEl.reset();
  feedBack.rating = 0;

  feedbackModalRatingElems.forEach(starBtn => {
    starBtn.children[0].classList.remove('is-click');
  });

  feedBackInputEl.classList.remove('is-error');
  feedBackTextarea.classList.remove('is-error');
}

function closeModal() {
  backdropFeedbackModal.classList.remove('feedback-is-open');
  feedbackFormEl.removeEventListener("submit", handleSubmitForm)
  document.body.classList.remove('no-scroll');
  resetFeedbackForm();
}
