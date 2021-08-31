export default class PixabyApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    const API_KEY = '23099671-1cb277c9789ccde92b141c6e3';
    const BASE_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&per_page=12&page=${this.page}&key=${API_KEY}`;

    return fetch(BASE_URL)
      .then(r => r.json())
      .then(data => {
        this.incrementPage();

        return data.hits;
      })
      .catch(console.log('Error'));
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
