import * as basicLightbox from 'basiclightbox';
import { getTrailer } from './js/get-trailer';
import '../node_modules/basiclightbox/dist/basiclightbox.min.css';

const id = 1841;
const modal = document.querySelector('.modal');
let instance;

export default async function onTrailerButtonClick() {
  const trailerId = id;
  modal.classList.remove('modal--visible');
  try {
    const videoSrc = await getTrailer(trailerId);
    instance = basicLightbox.create(`
      <iframe width="560" height="315" src="${videoSrc}" frameborder="0"></iframe>
    `, {
      onClose: onLightboxClose,
    });
    document.addEventListener('keydown', onLightboxKeyPress);
    instance.show();
  } catch (error) {
    trailerButton.classList.add('is-hidden');
  }
}

function onLightboxClose() {
  modal.classList.add('modal--visible');
  document.removeEventListener('keydown', onLightboxKeyPress);
}

function onLightboxKeyPress(event) {
  if (event.code === 'Escape') {
    instance.close();
  }
}

const trailerButton = document.querySelector('[data-trailer-url]');
trailerButton.addEventListener('click', onTrailerButtonClick);
