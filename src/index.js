import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import pixabayApiService from './js/api/pixabayApi';
import { createListImg } from './js/components/imgCardListCreate';
import { clearListImg } from './js/components/imgCardListClear';

Notify.init({
  width: '320px',
  fontSize: '20px',
  timeout: 1500,
  clickToClose: true,
  position: "center-center"
});

Loading.init({messageFontSize: '50px',
  messageColor: 'rgb(255,255,255)',
  svgColor: 'rgb(0,0,255)',
  backgroundColor: 'rgb(200,200,200,0.8)',
  svgSize: '100px',})

const lightbox = new SimpleLightbox('.gallery a', { 
  captions: true,
  captionSelector: 'img',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

const pixabayApi = new pixabayApiService();

const searchFormRef = document.querySelector('#search-form');
const loadMoreBtnRef = document.querySelector('.load-more'); 
const galleryRef = document.querySelector('.gallery')

searchFormRef.addEventListener('submit', onSearchHandler);
galleryRef.addEventListener('click', onGalleryCardClickHandler);
loadMoreBtnRef.addEventListener('click', onLoadMoreBtnClickHandler);


const optionsObserver = {
    rootMargin: '200px',
};
const observerGalery = new IntersectionObserver(onIntersectHandler, optionsObserver);
observerGalery.observe(loadMoreBtnRef);


function onIntersectHandler(entries) {
  entries.forEach( (entry) => {
    if (entry.isIntersecting) { 
      onLoadMoreBtnClickHandler();
    }
  });
}

async function onSearchHandler(event) {
  event.preventDefault();
  pixabayApi.query = event.currentTarget.elements.searchQuery.value.trim();
  pixabayApi.resetPage();
  loadMoreBtnRemove();
  clearListImg(galleryRef);  
  try {
    Loading.standard('Loading...');
    const dataObj = await pixabayApi.fetchPictures();
    const dataImg = dataObj.data.hits;
    Loading.remove();
    if (dataImg.length === 0) {
        return Notify.failure('Sorry, there are no images matching your search query. Please try again.');  
    };
    Notify.success(`Hooray! We found ${dataObj.data.totalHits} images.`);
    const imgList = createListImg(dataImg);
    galleryRef.append(...imgList);
    lightbox.refresh(); 
    if (dataObj.data.totalHits > pixabayApi.searchParams.per_page) {
      loadMoreBtnAdd();
      pixabayApi.lastPage = false;
    }      
  } catch (error) {
        errorCatch(error);
    }
}

async function onLoadMoreBtnClickHandler(event) {
  try {
    loadMoreBtnRemove();
    if (pixabayApi.lastPage) {
      return Notify.failure('We are sorry, but you have reached the end of search results.'); 
    }
    Loading.standard('Loading...');
    pixabayApi.incrementPage();
    const dataObj = await pixabayApi.fetchPictures();
    const dataImg = dataObj.data.hits;
    const imgList = createListImg(dataImg);
    galleryRef.append(...imgList);
    smoothScroll();
    Loading.remove();
    lightbox.refresh();
    if (pixabayApi.page > (dataObj.data.totalHits / pixabayApi.searchParams.per_page)) {
      pixabayApi.lastPage = true;       
    }
    loadMoreBtnAdd();
    } catch (error) {
        errorCatch(error);
    }
}

function onGalleryCardClickHandler(event) {
  event.preventDefault();
    if(!event.currentTarget.classList.contains('photo-card')) {
        return;
    }
    lightbox.open();
}

function smoothScroll() {
  const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();
  window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
    });
}

function loadMoreBtnRemove() {
  if (!loadMoreBtnRef.classList.contains('is-hidden')) {
    loadMoreBtnRef.classList.add('is-hidden');
    loadMoreBtnRef.setAttribute('disabled', true);
    }
    return;
}

function loadMoreBtnAdd() {
    if (loadMoreBtnRef.classList.contains('is-hidden')) {
      loadMoreBtnRef.classList.remove('is-hidden');
      loadMoreBtnRef.removeAttribute('disabled');
    }
    return;
}
 function errorCatch(error) {
    console.log('❌ Worning!', error);
    Notify.failure('❌ Worning! ERROR!');
    Loading.remove();
}