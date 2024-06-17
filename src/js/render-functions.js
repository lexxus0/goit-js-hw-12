import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.results a', {
  captionsData: 'title',
  captionDelay: 0,
});

export function renderImages(content, images) {
  const imgCards = images
    .map(
      hit => `
    <a href="${hit.largeImageURL}" class='img-link' data-lightbox="gallery">
      <div class="img-card">
        <img src="${hit.webformatURL}" width='358' height='152' alt="${hit.tags}" title="${hit.tags}">
        <div class="card-info">
          <p>Likes <span class='span-data'>${hit.likes}</span></p>
          <p>Views <span class='span-data'>${hit.views}</span></p>
          <p>Comments <span class='span-data'>${hit.comments}</span></p>
          <p>Downloads <span class='span-data'>${hit.downloads}</span></p>
        </div>
      </div>
    </a>`
    )
    .join('');

  content.insertAdjacentHTML('beforeend', imgCards);
  lightbox.refresh();
}
