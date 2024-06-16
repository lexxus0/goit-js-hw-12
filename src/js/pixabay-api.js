import axios from 'axios';

const API_KEY = '44377249-dc3d438c16ab3b76144728d61';

export async function fetchImages(query, page, perPage) {
  const url = 'https://pixabay.com/api';
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: perPage,
    page: page,
  });

  const response = await axios.get(url, { params });

  return response.data;
}
