import '../sass/main.scss';
import galleryCards from '../templates/item-template.hbs';
import { refs } from './refs';
import PixabyApiService from './apiService';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error, defaultModules } from '@pnotify/core';

const pixabyApiService = new PixabyApiService();

refs.searchForm.addEventListener('sabmit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  pixabyApiService.query = e.currentTarget.elements.query.value;
  pixabyApiService.resetPage();
  pixabyApiService.fetchArticles().then(data => {
    errorResult(data);
    clearArticlesContainer();
    //appArticlesMarkup(articles); appendCardsMarkup
  });
}

function errorResult(data) {
  if (data.length === 0) {
    error({
      text: 'Изображение не найдено.',
      delay: 2000,
    });
  }
  pixabyApiService.fetchArticles().then(appArticlesMarkup);
  return;
}

function onLoadMore() {
  pixabyApiService.fetchArticles().then(appArticlesMarkup);
}

function scrollList() {
  refs.loadMoreBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function appArticlesMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeennd', galleryCards(hits));
  scrollList();
}

function clearArticlesContainer() {
  refs.galleryContainer.innerHTML = '';
}
