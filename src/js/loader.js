import axios from "axios";

const loader = document.getElementById("global-loader");

function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}

axios.interceptors.request.use(config => {
  showLoader();
  return config;
}, error => {
  hideLoader();
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  hideLoader();
  return response;
}, error => {
  hideLoader();
  return Promise.reject(error);
});


export { showLoader, hideLoader };
