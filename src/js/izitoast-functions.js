import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function noDataIzT(message) {
  if (message) {
    iziToast.show({
      title: '❌',
      message: `Sorry, there are no ${message}.`,
      color: 'red',
      position: 'topRight',
      messageColor: 'white',
      titleColor: 'white',
      timeout: 5000,
    });
  }
}

export function errorApiIzT(error) {
  if (error.message) {
    iziToast.show({
      title: 'Error',
      color: 'red',
      position: 'topRight',
      messageColor: 'white',
      titleColor: 'white',
      message: error.message,
      timeout: 5000,
    });
  }
}
export function errorApiFeedback(err) {
  iziToast.show({
    title: 'Error',
    color: 'red',
    position: 'topRight',
    messageColor: 'white',
    titleColor: 'white',
    message: err,
    timeout: 5000,
  });
}

export function successDataIzT(response) {
  if (response.data.message) {
    iziToast.success({
      message: response.data.message,
      position: 'topRight',
      messageColor: 'white',
      titleColor: 'white',
      timeout: 5000,
    });
  }
}

export function successFeedback() {

    iziToast.success({
      message: 'Thank you for your feedback! It has been sent successfully.',
      position: 'topRight',
      messageColor: 'white',
      titleColor: 'white',
      timeout: 5000,
    });
  
}
