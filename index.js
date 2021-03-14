import images from './gallery-items.js';
const imgArr = []; 
let currentURL;
const refs = {
    galleryList: document.querySelector('.js-gallery'),
    modalWindow: document.querySelector('.js-lightbox'),
    imgInModalWindow: document.querySelector('.lightbox__image'),
    closingButton: document.querySelector('.lightbox__button'),
    overlayConteiner: document.querySelector('.lightbox__overlay'),
};

const creatingItemMarkup = picture => {
    const pictureItemRef = document.createElement('li');
    pictureItemRef.classList.add('gallery__item');

    const linkRef = document.createElement('a');
    linkRef.classList.add('gallery__link');
    linkRef.setAttribute('href', `${picture.original}`);

    const imageRef = document.createElement('img');
    imageRef.classList.add('gallery__image');
    imageRef.setAttribute('src', `${picture.preview}`);
    imageRef.setAttribute('data-source', `${picture.original}`);
    imageRef.setAttribute('alt', `${picture.description}`);
    imgArr.push(`${picture.original}`);

    linkRef.appendChild(imageRef);
    pictureItemRef.appendChild(linkRef);

    return pictureItemRef;
}
 
const creatingListMarkup = images.map(image => creatingItemMarkup(image));

refs.galleryList.append(...creatingListMarkup);
refs.galleryList.addEventListener('click', onGalaryClick);



function onGalaryClick(event) { 
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return
    }
    refs.modalWindow.classList.add('is-open');
    const imageRef = event.target;
    const largeImageURL = imageRef.dataset.source;
        
    refs.imgInModalWindow.setAttribute("src", `${largeImageURL}`);
    refs.closingButton.addEventListener('click', closingLightbox);
    refs.overlayConteiner.addEventListener('click', closingLightbox);
    document.addEventListener("keydown", pressEscape);
    document.addEventListener("keydown", pressArrowRight);
    document.addEventListener("keydown", pressArrowLeft);
    
    currentURL = `${largeImageURL}`;

};

function closingLightbox(event) {
    refs.imgInModalWindow.setAttribute("src", "");
    refs.imgInModalWindow.setAttribute("alt", "");
    refs.modalWindow.classList.remove('is-open');
    refs.closingButton.removeEventListener('click', closingLightbox);
    refs.overlayConteiner.removeEventListener('click', closingLightbox);
    document.removeEventListener("keydown", pressEscape);
    document.removeEventListener("keydown", pressArrowRight);
    document.removeEventListener("keydown", pressArrowLeft);
}
    
function pressEscape (event) {
    const key = event.key;
        if (key === "Escape") {
        closingLightbox();
    }
};



 function pressArrowRight(event) {
     const key = event.key;
     if (key === "ArrowRight") {
         const currentIndex = imgArr.indexOf(`${currentURL}`);
        //  console.log(currentIndex);
         let nextIndex;
         const maxNumOfIndex = imgArr.length - 1;
         if (currentIndex === maxNumOfIndex) { nextIndex = maxNumOfIndex }
         else {nextIndex = currentIndex + 1};
        refs.imgInModalWindow.setAttribute("src", `${imgArr[nextIndex]}`);
        currentURL = `${imgArr[nextIndex]}`;
       
    }
}
     
function pressArrowLeft(event) {
     const key = event.key;
     if (key === "ArrowLeft") {
         const currentIndex = imgArr.indexOf(`${currentURL}`);
        //  console.log(currentIndex);
         let nextIndex;
         const minNumOfIndex = 0;
         if (currentIndex === minNumOfIndex) { nextIndex = minNumOfIndex }
         else {nextIndex = currentIndex - 1};
        refs.imgInModalWindow.setAttribute("src", `${imgArr[nextIndex]}`);
        currentURL = `${imgArr[nextIndex]}`;
       
    }
}
        
   