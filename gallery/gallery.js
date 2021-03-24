import images from './gallery-items.js';

const refs = {
    galleryList: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    imgInLightbox: document.querySelector('.lightbox__image'),
    }

refs.galleryList.insertAdjacentHTML('beforeend', createMarkup(images));

refs.galleryList.addEventListener('click', appearanceOfLightbox);

function createMarkup (images) {
    const galleryMarkup = images.map(img =>   
        // console.log(img);     
        `<li class="gallery__item">
        <a class="gallery__link"
          href="${img.original}">
          <img
            class="gallery__image"
            src="${img.preview}"
            loading="lazy"
            data-source="${img.original}"
            alt="${img.description}"
          />
        </a>
      </li>`
    ).join(' ');
    return galleryMarkup;
}

let activImagesRefs = [];
let currentPicture = {};

function appearanceOfLightbox (event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return
    }
    refs.lightbox.classList.add('is-open');
    openImgInModal(event.target);   
    
    refs.lightbox.addEventListener('click', clickInOverflow);
    document.addEventListener('keydown', pressEscOrArrows);

    activImagesRefs = document.querySelectorAll('.gallery__image'); 
    currentPicture = event.target;         
}

function openImgInModal (obj){
    refs.imgInLightbox.setAttribute("src", obj.dataset.source);
    refs.imgInLightbox.setAttribute("alt", obj.alt);
}

function closureOfLightbox () {
    refs.lightbox.removeEventListener('click', clickInOverflow);
    document.removeEventListener('keydown', pressEscOrArrows);
    refs.imgInLightbox.setAttribute("src", '');
    refs.imgInLightbox.setAttribute("alt", '');    
    refs.lightbox.classList.remove('is-open');    
}

function clickInOverflow (event) {
    if (event.target.nodeName === 'IMG') {
        return nextImg (currentPicture);
    }
   closureOfLightbox();
}

function pressEscOrArrows (event) {
    if(event.key === 'Escape') {
        closureOfLightbox()
    } else if(event.key === 'ArrowRight'){
        nextImg(currentPicture);
    } else if(event.key === 'ArrowLeft'){
        previosImg(currentPicture);
    }        
}

function nextImg (objOfImg) {   
    const arr = [];
   
    activImagesRefs.forEach(img => arr.push(img.dataset.source));
    const currentIndex = arr.indexOf(objOfImg.dataset.source);
    const nextIndex = currentIndex + 1;
        if(currentIndex === arr.length - 1){
            currentPicture = activImagesRefs[0]
        } else {
            currentPicture = activImagesRefs[nextIndex]
        }
        openImgInModal(currentPicture);    
}

function previosImg(objOfImg){
    const arr = [];
   
    activImagesRefs.forEach(img => arr.push(img.dataset.source));
    const currentIndex = arr.indexOf(objOfImg.dataset.source);
    const nextIndex = currentIndex - 1;
        if(currentIndex === 0){
            currentPicture = activImagesRefs[arr.length - 1]
        } else {
            currentPicture = activImagesRefs[nextIndex]
        }
        openImgInModal(currentPicture);
    
}

