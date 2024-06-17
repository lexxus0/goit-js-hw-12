import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';

const input = document.getElementById('photos_input');
const submitBtn = document.getElementById('submit_button');
const content = document.querySelector('.results');
const loading = document.querySelector('.loading-img');
const loadBtn = document.getElementById('load-btn');

let curPage = 1;
let curQuery = '';
const perPage = 15;
let totalHits = 0;
let showedHits = 0;

loading.classList.add('hidden');

submitBtn.addEventListener('click', async () => {
  const value = input.value.trim();
  if (!value) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please fill the search field first.',
      position: 'topRight',
    });
    return;
  }

  curQuery = value;
  curPage = 1;
  showedHits = 0;

  content.innerHTML = '';
  loading.classList.remove('hidden');
  loadBtn.classList.add('hidden');

  try {
    const data = await fetchImages(curQuery, curPage, perPage);
    loading.classList.add('hidden');

    if (!data.hits || data.hits.length === 0) {
      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        maxWidth: '400px',
        color: '#b90e0a',
        messageColor: '#fff',
        messageLineHeight: '150%',
        messageSize: '16px',
      });
      input.value = '';
      return;
    }

    totalHits = data.totalHits;
    showedHits = data.hits.length;

    renderImages(content, data.hits);
    if (showedHits < totalHits) {
      loadBtn.classList.remove('hidden');
    }
  } catch (error) {
    loading.classList.add('hidden');
    console.log(error);
  }
});

loadBtn.addEventListener('click', async () => {
  curPage++;
  loadBtn.classList.add('hidden');
  loading.classList.remove('hidden');

  try {
    const data = await fetchImages(curQuery, curPage, perPage);
    loading.classList.add('hidden');

    if (data.hits && data.hits.length > 0) {
      showedHits += data.hits.length;
      renderImages(content, data.hits);
      if (showedHits >= totalHits) {
        loadBtn.classList.add('hidden');
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
          maxWidth: '400px',
          color: '#b90e0a',
          messageColor: '#fff',
          messageLineHeight: '150%',
          messageSize: '16px',
          backgroundColor: 'aqua',
        });
      } else {
        loadBtn.classList.remove('hidden');
      }
      smoothScroll();
    }
  } catch (error) {
    loading.classList.add('hidden');
    loadBtn.classList.add('hidden');
    console.log(error);
  }
});

input.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    submitBtn.click();
  }
});

function smoothScroll() {
  const firstCard = document.querySelector('.img-card');
  if (firstCard) {
    const cardHeight = firstCard.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
