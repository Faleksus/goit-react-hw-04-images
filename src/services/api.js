import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '31809687-1b4d5b3e9d6d327e923c506e9';

const getImagesInstance = axios.create({
  baseURL: URL,
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: '12',
  },
});

export const pixabayGetImages = async (query, page) => {
  const { data } = await getImagesInstance.get(`?q=${query}&page=${page}`);
  return data;
};
