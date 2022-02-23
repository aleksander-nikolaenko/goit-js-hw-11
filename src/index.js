import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import pixabayApiService from './js/api/pixabayApi';

Notify.init({
  width: '320px',
  fontSize: '16px',
  position: 'right-top',
});

const lightbox = new SimpleLightbox('.gallery a', { 
  captions: true,
  captionSelector: 'img',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

const pixabayApi = new pixabayApiService();

const searchForm = document.querySelector('#search-form');

