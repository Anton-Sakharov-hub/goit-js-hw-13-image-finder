import main from "./sass/gallery.scss";

import { success, error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import setMessage from "./js/setMessage";
import ApiService from "./js/apiService";
import Button from './js/btnLoadMore';
import makesGalleryMarkup from "./js/makesGalleryMarkup";
import appendGalleryMarkup from "./js/appendGalleryMarkup";
import refs from "./js/refs";
import ArrowUp from "./js/arrowUp";

const apiService = new ApiService();
const loadMoreBtn = new Button({ selector: '[data-btn="load-more"]', hidden: true });
const arrowUp = new ArrowUp({ selector: '[data-arrowUp]', hidden: true })


function getInputQuery(event) {
  apiService.query = event.target.elements.query.value.trim();
};

function scrollToNewImages () { 
  refs.galleryContainer.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
};

function checksImgsOnServer(images) {
    if (images.hits.length === 0) {
      setMessage(error, 'Больше нет картинок', 2000);
      loadMoreBtn.hide();
    };
};

function catchRequest(event) {
  event.preventDefault()

  getInputQuery(event);
  if (apiService.query === '') return;

  apiService.resetPages();

  setMessage(success, 'Загрузка...', 500);
  apiService.fetchImg()
    .then((images) => {
      makesGalleryMarkup(images);
      loadMoreBtn.show();
      arrowUp.show();

    }).catch(err => {
      setMessage(error, 'По запросу ничего не найдено', 1000)
      console.log(err)
    });
};

function onLoad(event) {
  event.preventDefault();
  loadMoreBtn.disable();

  apiService.fetchImg()
    .then((images) => {
      appendGalleryMarkup(images);
      scrollToNewImages();
      checksImgsOnServer(images);
      loadMoreBtn.enable();

    }).catch(err => {
      setMessage(error, 'Что-то пошло не так, попробуй позже', 1000)
      console.log(err)
    });
}

function onArrowUpClick() {
  refs.searchForm.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

loadMoreBtn.refs.button.addEventListener('click', onLoad);
refs.searchForm.addEventListener('submit', catchRequest);
arrowUp.refs.arrowUp.addEventListener('click', onArrowUpClick);



















// сделать кнопку LOAD MORE, которая будет догружать картин ? // ? деактивироваться при загрузке и показывать спиннер загрузки(дополнительное)

// сделать проскролливание до новых страниц. Создать объект со свойством page,
// которая будет записываться в data - page атрибут новых страниц через интерполяцию
// создать метод объекта, который будет обновлять refs для scrollIntoView


// ДОПОЛНИТЕЛЬНО:
// Можно добавить плагин нотификаций, например pnotify, и показывать нотификации на результат HTTP-запросов
// Можно добавить функционал отображения большой версии изображения через плагин модального окна, например basicLightbox, при клике на изображение галереи
// Вместо кнопки Load more можно сделать бесконечную загрузку при скроле используя Intersection Observer.


