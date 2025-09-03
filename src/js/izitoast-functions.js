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
  const message =
    typeof error === 'string'
      ? error
      : error?.message || 'Unknown error occurred';
  iziToast.show({
    title: 'Error',
    color: 'red',
    position: 'topRight',
    messageColor: 'white',
    titleColor: 'white',
    message,
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
