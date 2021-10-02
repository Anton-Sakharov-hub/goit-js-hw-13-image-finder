import galleryTpl from "../templates/gallery-tpl.hbs";
import refs from "./refs";


export default function (images) {
  const markup = galleryTpl(images);
  refs.galleryList.insertAdjacentHTML('beforeend', markup);
};