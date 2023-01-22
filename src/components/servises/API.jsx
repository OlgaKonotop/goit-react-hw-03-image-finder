import axios from 'axios';

export const fetchGallery = async (searchQuery, page) => {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      q: `${searchQuery}`,
      page: `${page}`,
      key: '31643149-fa666e9d7417fd7b721c14976',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  return response.data;
};
