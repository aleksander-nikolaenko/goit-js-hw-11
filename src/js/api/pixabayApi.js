import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

export default class PixabayApiService {
  constructor() {
    this.lastPage = false;
    this.searchQuery = '';
    this.page = 1; 
    this.searchParams = {
      key: '25843803-c1ee694240c298b472c6158f7',
      q: this.searchQuery,
      image_type: 'photo',
      per_page: 40,
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
    };
  }

  async fetchPictures() {
    try {
      this.searchParams.q = this.searchQuery;
      this.searchParams.page = this.page;
      const searchParams = new URLSearchParams(this.searchParams);
      const url = `${BASE_URL}?${searchParams}`;
      const response = await axios.get(url);
      return response;
    } catch (error) {
      return error;
    }
  }
    
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}