import { createElement } from '../utils/createElement';
export const ImgCard = imgData => {
  const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = imgData;

  const imgInfoDownloadsTextElem = createElement(
    'b',
  {
      
    },
    'Downloads'
  );

  const imgInfoDownloadsElem = createElement(
    'p',
    {
      class: 'info-item',
    },
    [imgInfoDownloadsTextElem, downloads],
  );

  const imgInfoCommentsTextElem = createElement(
    'b',
  {
      
    },
    'Comments'
  );


  const imgInfoCommentsElem = createElement(
    'p',
    {
      class: 'info-item',
    },
    [imgInfoCommentsTextElem, comments],
  );
  
  const imgInfoViewsTextElem = createElement(
    'b',
  {
      
    },
    'Views'
  );

  const imgInfoViewsElem = createElement(
    'p',
    {
      class: 'info-item',
    },
    [imgInfoViewsTextElem, views],
  );

const imgInfoLikesTextElem = createElement(
    'b',
  {
      
    },
    'Likes'
  );

  const imgInfoLikesElem = createElement(
    'p',
    {
      class: 'info-item',
    },
    [imgInfoLikesTextElem, likes],
  );

  const imgInfoElement = createElement(
    'div',
    {
      class: 'info',
    },
    [imgInfoLikesElem, imgInfoViewsElem, imgInfoCommentsElem, imgInfoDownloadsElem],
  );

  const imgPreviewElement = createElement(
    'img',
    {
    src: webformatURL,
    alt: tags,
    loading: "lazy"
    });
  
  const imgCardElement = createElement(
    'div',
    {
      class: 'photo-card',
    },
    [imgPreviewElement, imgInfoElement],
  );

    const imgCardWrapperElement = createElement(
    'a',
    {
      href: largeImageURL,
    },
    imgCardElement,
  );

  return imgCardWrapperElement;
};

