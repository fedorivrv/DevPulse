import axios from 'axios';
import iziToast from 'izitoast';
import { errorApiIzT } from './izitoast-functions.js';

let backdropEl;
let formEl;
let nameInputEl;
let messageTextareaEl;
let ratingListEl;
let ratingButtons;
let closeBtnEl;

const feedbackState = { name: '', descr: '', rating: 0 };

export function initFeedbackModal() {
  backdropEl = document.querySelector('.backdrop-feedback-modal');
  formEl = document.querySelector('.feedback-modal-form');
  nameInputEl = document.querySelector('.feedback-modal-input');
  messageTextareaEl = document.querySelector('.feedback-modal-textarea');
  ratingListEl = document.querySelector('.feedback-modal-list');
  ratingButtons = document.querySelectorAll('.feedback-modal-rating');
  closeBtnEl = document.querySelector('.feedback-close-btn');

  if (
    !backdropEl ||
    !formEl ||
    !nameInputEl ||
    !messageTextareaEl ||
    !ratingListEl ||
    ratingButtons.length === 0 ||
    !closeBtnEl
  ) {
    return;
  }

  nameInputEl.addEventListener('input', onNameInput);
  messageTextareaEl.addEventListener('input', onMessageInput);
  ratingListEl.addEventListener('click', onRatingClick);
  formEl.addEventListener('submit', onSubmit);
  closeBtnEl.addEventListener('click', closeFeedbackModal);
  backdropEl.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeFeedbackModal();
  });
  window.addEventListener('keydown', onEscKey);
}

export function openFeedbackModal() {
  if (!backdropEl) initFeedbackModal();
  if (backdropEl) backdropEl.classList.add('feedback-is-open');
}

export function closeFeedbackModal() {
  if (!backdropEl) return;
  backdropEl.classList.remove('feedback-is-open');
  window.removeEventListener('keydown', onEscKey);
}

function onEscKey(e) {
  if (e.key === 'Escape') closeFeedbackModal();
}

function onNameInput(e) {
  const val = e.target.value.trim();
  e.target.classList.toggle('is-error', val.length < 2 || val.length > 16);
}

function onMessageInput(e) {
  const val = e.target.value.trim();
  e.target.classList.toggle('is-error', val.length < 10 || val.length > 512);
}

function onRatingClick(e) {
  const btn = e.target.closest('button.feedback-modal-rating');
  if (!btn) return;
  feedbackState.rating = Number(btn.dataset.value) || 0;
  ratingButtons.forEach((b, index) => {
    const star = b.querySelector('svg');
    if (star) star.classList.toggle('is-click', index < feedbackState.rating);
  });
}

async function onSubmit(e) {
  e.preventDefault();
  feedbackState.name = formEl.elements['user-name'].value.trim();
  feedbackState.descr = formEl.elements['user-message'].value.trim();

  const valid =
    feedbackState.name.length >= 2 &&
    feedbackState.name.length <= 16 &&
    feedbackState.descr.length >= 10 &&
    feedbackState.descr.length <= 512 &&
    feedbackState.rating > 0;

  if (!valid) {
    errorApiIzT({ message: 'Please fill all fields and select a rating!' });
    return;
  }

  try {
    await axios.post('https://sound-wave.b.goit.study/api/feedbacks', feedbackState);
    formEl.reset();
    feedbackState.rating = 0;
    ratingButtons.forEach(b => {
      const star = b.querySelector('svg');
      if (star) star.classList.remove('is-click');
    });
    iziToast.success({ message: 'Thanks for your feedback!' });
    closeFeedbackModal();
  } catch (err) {
    errorApiIzT(err);
  }
}

